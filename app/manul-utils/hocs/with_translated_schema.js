import _ from 'lodash';
import { composeWithTracker } from 'mantra-core';
/**
  withTranslatedSchema is a composer that translates the given schemas using i18n.translateSchema.
  Pass a mapping-object where the keys are the properties containing these schemas
  and the values of the object are the i18n-namespaces

  e.g. withTranslatedSchema({companySchema: "companies"})
*/
export const composer = (mappingArrayOrFunction) => ({ context, ...props }, onData) => {
  const { i18n } = context();
  let mapping = mappingArrayOrFunction;
  if (_.isFunction(mappingArrayOrFunction)) {
    mapping = mappingArrayOrFunction({ context, ...props });
  }
  const translatedProps = _.mapValues(mapping, (namespace, propName) => {
    return i18n.translateSchema(props[propName], namespace);
  });
  onData(null, { ...props, ...translatedProps });
};

export default (mapping) => composeWithTracker(composer(mapping));
