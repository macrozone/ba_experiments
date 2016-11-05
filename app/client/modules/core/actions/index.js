export default {

  cases: {
    select({LocalState}, caseId) {
      LocalState.set('core.currentCaseId', caseId);
    }
  }
};
