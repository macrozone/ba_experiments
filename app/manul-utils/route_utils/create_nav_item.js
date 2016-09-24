import _ from 'lodash';
// use this from context()

export default ({ FlowRouter, i18n }) => (nav) => {
  const path = (
    nav.routeName && !nav.disabled ?
    FlowRouter.path(nav.routeName, { locale: i18n.getLocale(), ...nav.params }, nav.queryParams) :
    null
  );
  const currentPath = FlowRouter.current().path;
  return {
    ...nav,
    href: path,
    active: currentPath === path,
    childActive: _.startsWith(currentPath, path),
    label: i18n.t(nav.label),
  };
};
