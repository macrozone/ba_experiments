
import CreateNavItem from './create_nav_item';


export default ({ FlowRouter, i18n }) => {
  const createNavItem = CreateNavItem({ FlowRouter, i18n });
  const go = (routeName, params, queryParams) => FlowRouter.go(
    createNavItem({ routeName, params, queryParams }).href
  );
  const redirect = (routeName, params, queryParams) => FlowRouter.redirect(
    createNavItem({ routeName, params, queryParams }).href
  );
  return {
    go,
    redirect,
    createNavItem,
  };
};
