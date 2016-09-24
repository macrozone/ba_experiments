const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import I18nService from '../i18n_service';
import {shallow} from 'enzyme';

const mockContext = () => {
  const SimpleSchema = class {
    constructor(schemes) {
      this.schemes = schemes;
    }
    messages() {

    }

  };
  const translator = stub().returns(label => label);
  const universeI18n = {
    getTranslation: stub().returns({
      regEx: [
      ]
    }),
    createReactiveTranslator: stub().returns(translator),
    createComponent: stub().returns(() => <div>Translate component</div>),
    setLocale: spy(),
    getLocale: stub().returns('de-CH')
  };
  return {SimpleSchema, universeI18n, translator};
};


describe('I18nService', () => {
  const supportedLocales = [ 'de', 'en', 'fr', 'de-CH' ];
  const defaultLocale = 'de';
  describe('getSupportedLocales', () => {
    it('exposes a list of supported locales', () => {
      const i18n = I18nService(mockContext(), {supportedLocales, defaultLocale});
      expect(i18n.getSupportedLocales()).to.equal(supportedLocales);
    });
  });
  describe('supports', () => {
    it('returns true when it supports the locale', () => {
      const i18n = I18nService(mockContext(), {supportedLocales, defaultLocale});
      expect(i18n.supports('en')).to.equal(true);
      expect(i18n.supports('jp')).to.equal(false);
      expect(i18n.supports(undefined)).to.equal(false);
    });
  });

  describe('getFallbackLocale', () => {

    it('returns default locale on unkown locale ', () => {
      const i18n = I18nService(mockContext(), {supportedLocales, defaultLocale});
      expect(i18n.getFallbackLocale('jp')).to.equal('de');
      expect(i18n.getFallbackLocale(undefined)).to.equal('de');
    });

    it('returns language without country if available', () => {
      const i18n = I18nService(mockContext(), {supportedLocales, defaultLocale});
      expect(i18n.getFallbackLocale('de-CH')).to.equal('de-CH');
      expect(i18n.getFallbackLocale('fr-CH')).to.equal('fr');
      expect(i18n.getFallbackLocale('jp-JP')).to.equal('de');
    });
    it('does only support locales in format "xx-xx"', () => {
      const i18n = I18nService(mockContext(), {supportedLocales, defaultLocale: 'en'});
      expect(i18n.getFallbackLocale('de_CH')).to.equal('en');

    });
  });

  describe('setLocale', () => {
    it('sets the locale in the universeI18n', () => {
      const {SimpleSchema, universeI18n} = mockContext();
      const i18n = I18nService({SimpleSchema, universeI18n}, {supportedLocales, defaultLocale});
      i18n.setLocale('de');
      expect(universeI18n.setLocale).to.have.been.calledWith('de');
    });

    it('falls back to default locale on unkown locale ', () => {
      const {SimpleSchema, universeI18n} = mockContext();
      const i18n = I18nService({SimpleSchema, universeI18n}, {supportedLocales, defaultLocale});
      i18n.setLocale('jp');
      expect(universeI18n.setLocale).to.have.been.calledWith('de');
      i18n.setLocale(undefined);
      expect(universeI18n.setLocale).to.have.been.calledWith('de');

    });

    it('falls back to language without country if available', () => {
      const {SimpleSchema, universeI18n} = mockContext();
      const i18n = I18nService({SimpleSchema, universeI18n}, {supportedLocales, defaultLocale});
      i18n.setLocale('de-CH');
      expect(universeI18n.setLocale).to.have.been.calledWith('de-CH');
      i18n.setLocale('fr-CH');
      expect(universeI18n.setLocale).to.have.been.calledWith('fr');
      i18n.setLocale('jp-JP');
      expect(universeI18n.setLocale).to.have.been.calledWith('de');
    });

    it('does only support locales in format "xx-xx"', () => {
      const {SimpleSchema, universeI18n} = mockContext();
      const i18n = I18nService({SimpleSchema, universeI18n},
        {supportedLocales, defaultLocale: 'en'}
      );
      i18n.setLocale('de-CH');
      expect(universeI18n.setLocale).to.have.been.calledWith('de-CH');
      i18n.setLocale('de_CH');
      expect(universeI18n.setLocale).to.have.been.calledWith('en');
    });
  });

  describe('getLocale', () => {
    it('returns the current locale from the underling service', () => {
      const {SimpleSchema, universeI18n} = mockContext();
      const i18n = I18nService({SimpleSchema, universeI18n}, {supportedLocales, defaultLocale});
      const locale = i18n.getLocale();
      expect(locale).to.equal('de-CH');
      expect(universeI18n.getLocale).to.have.been.called();

    });
  });

  describe('getLocale', () => {
    it('returns the current locale from the underling service', () => {
      const {SimpleSchema, universeI18n} = mockContext();
      const i18n = I18nService({SimpleSchema, universeI18n}, {supportedLocales, defaultLocale});
      const locale = i18n.getLocale();
      expect(locale).to.equal('de-CH');
      expect(universeI18n.getLocale).to.have.been.called();

    });
  });
  describe('T', () => {
    it('is a react component', () => {
      const {SimpleSchema, universeI18n} = mockContext();
      const i18n = I18nService({SimpleSchema, universeI18n}, {supportedLocales, defaultLocale});
      const el = shallow(<i18n.T />);
      expect(el).to.contain('Translate component');
    });
  });

  describe('translateSchema', () => {
    it('returns a translated scheme for a given namespace', () => {
      // FIXME: i am hard to test!
      const {SimpleSchema, universeI18n, translator} = mockContext();
      const objectKeys = stub();
      objectKeys.onCall(0).returns([ 'title', 'text', 'firstname', 'lastname' ])
      objectKeys.returns([])
      const schemeToTranslate = {
        getDefinition: stub().returns({label: 'test'}),
        objectKeys
      };
      const i18n = I18nService({SimpleSchema, universeI18n}, {supportedLocales, defaultLocale});

      const translated = i18n.translateSchema(schemeToTranslate, 'mynamespace');

      expect(translator).to.have.been.calledWith('mynamespace');
      expect(schemeToTranslate.getDefinition).to.have.been.calledWith('title');
      expect(schemeToTranslate.getDefinition).to.have.been.calledWith('text');
      expect(schemeToTranslate.getDefinition).to.have.been.calledWith('firstname');
      expect(schemeToTranslate.getDefinition).to.have.been.calledWith('lastname');
      expect(translated).to.have.property('schemes');
    });
  });
});
