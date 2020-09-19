export default {
  props: {
    records: {
      type: Array,
      required: true
    },
    recordType: {
      type: String,
      required: true
    },
    args: {
      type: Object,
      default() {
        return {};
      }
    },
    selectedRecords: {
      type: Array,
      default() {
        return [];
      }
    },
    recordsAreSelectable: {
      type: Boolean,
      default: false
    }
  }
};
