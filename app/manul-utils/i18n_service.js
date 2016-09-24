/**
available in context as i18n.

i18n.t(key, props): translate the given key (caution: only reactive in tracker-komposer)

use <i18n.T>-component to translate strings in react components. No need for a container.
T is usually injected from context

i18n.translateSchema(simpleSchema): adds translation to the simpleSchema

**/
import _ from 'lodash';


export default (context, { supportedLocales, defaultLocale = 'en' }) => {
  const { universeI18n, SimpleSchema, FlowRouter } = context;
  const supports = (locale) => supportedLocales.indexOf(locale) !== -1;
  const getFallbackLocale = (locale) => {
    if (!locale) {
      return defaultLocale;
    } else if (supports(locale)) {
      return locale;
    }
    const [lang] = locale.split('-');
    if (supports(lang)) {
      return lang;
    }
    return defaultLocale;
  };


  const setLocale = (locale) => {
    universeI18n.setLocale(getFallbackLocale(locale));
  };
  const getLocale = universeI18n.getLocale;

  const translator = universeI18n.createReactiveTranslator();
  const T = universeI18n.createComponent(translator);

  const LocaleRoutes = (baseRoutes = FlowRouter) => {
    const setLocaleByRoute = ({ params: { locale } }) => {
      if (supports(locale)) {
        setLocale(locale);
      } else {
        FlowRouter.setParams({ locale: getFallbackLocale(locale) });
      }
    };
    return baseRoutes.group({
      prefix: '/:locale?',
      triggersEnter: [setLocaleByRoute],
    });
  };

  const translateSchema = (schema, namespace) => {
    // translate all the labels
    const translations = translator(namespace);
    const translatedDef = {};
    const _addSubSchemaTranslations = (parentFieldFullName = null, parentTranslation = {}) => {
      schema.objectKeys(parentFieldFullName).forEach(field => {
        const fullFieldName = parentFieldFullName ? parentFieldFullName + '.' + field : field;
        const fieldTranslation = parentTranslation[field];
        const fieldDefinition = schema.getDefinition(fullFieldName);
        const defaultTransform = (value) => (fieldTranslation && fieldTranslation[value]) || value;
        let label = null;
        if (fieldTranslation) {
          if (_.isString(fieldTranslation)) {
            label = fieldTranslation;
          } else {
            label = fieldTranslation.label;
          }
        }
        // recursivly add subfields as well, but flat
        if (schema.objectKeys(fullFieldName).length > 0) {
          _addSubSchemaTranslations(fullFieldName, fieldTranslation);
        }
        translatedDef[fullFieldName] = {
          label: label || namespace + '.' + fullFieldName,
          uniforms: {
            transform: defaultTransform,
            ...fieldDefinition.uniforms, // can override default transform
          },
        };
      });
    };
    _addSubSchemaTranslations(null, translations);
    const translatedScheme = new SimpleSchema([schema, translatedDef]);
    const simpleSchemaMessages = evalSimpleSchemaRegexKeys(
      universeI18n.getTranslation('simpleSchema')
    );
    translatedScheme.messages(simpleSchemaMessages);

    return translatedScheme;
  };

  return {
    t: translator,
    T,
    translateSchema,
    getFallbackLocale,
    setLocale,
    getLocale,
    supports,
    LocaleRoutes,
    onChangeLocale: universeI18n.onChangeLocale,
    getSupportedLocales: () => (supportedLocales),
  };
};

// allowes to use SimpleSchema.RegEx.Email keys in the translation file, instead of the actual regex
function evalSimpleSchemaRegexKeys(messages) {
  if (messages.regEx) {
    const regEx = messages.regEx.map(({ msg, exp }) => {
      return { msg, exp: exp && exp.split('.').reduce((o, i) => o[i], global) };
    });
    return { ...messages, regEx };
  }
  return messages;
}
