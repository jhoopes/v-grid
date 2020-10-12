export default {
  props: {
    record: {
      required: true,
      type: Object
    },
    gridArgs: {
      type: Object
    }
  },

  computed: {
    isNewRow() {
      if (this.record.isNew) {
        return true;
      }

      return false;
    }
  }
};
