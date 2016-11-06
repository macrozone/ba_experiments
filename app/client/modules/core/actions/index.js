export default {

  cases: {
    select({FlowRouter}, caseId) {
      FlowRouter.setParams({caseId});
    }
  }
};
