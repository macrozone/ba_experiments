export default {

  cases: {
    select({ FlowRouter }, caseId) {
      FlowRouter.setParams({ caseId });
    },
  },
  labels: {
    setCurrent({ LocalState }, labelId) {
      LocalState.set('labels.currentLabelId', labelId);
    },
  },
};
