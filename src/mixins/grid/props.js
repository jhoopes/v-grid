export default {
  props: {
    // Specify the grid type of the component
    // Currently only 2 options: tableView, divRow
    gridType: {
      type: String,
      default: "tableView"
    },

    // the record type to use when displaying each row
    // By default the grid type is set to table-row if the grid type is also table view
    recordType: {
      type: String,
      default() {
        if (this.gridType == "tableView") {
          return "table-row";
        }

        return null;
      }
    },

    // Specify headers to display on top of the table view grid type
    headers: {
      type: Array
    },

    // Specify Data Directly
    data: {
      type: [Object, Array],
      default() {
        return {
          data: [],
          total: 0,
          per_page: 10,
          current_page: 1,
          last_page: 1
        };
      }
    },

    /** Properties around adding items to the grid TODO:  This needs updating **/

    // whether or not to enable the function at all
    allowAdd: {
      type: Boolean,
      default: false
    },
    // function around performing the addition of the record
    addAction: {
      type: Function,
      default() {
        this.records.push({
          isNew: true
        });
      }
    },
    // display options for the add button text and the positioning of the button
    addButtonText: {
      type: String,
      default: "Add"
    },
    addDisplay: {
      type: String,
      default: "bottom"
    },

    // Base Record Id for the main record if this grid is used in a sub-record context
    baseRecordId: {
      type: Number,
      default: null
    },

    // record url that a GET request will be made if this property is set
    recordUrl: {
      type: String,
      default: null
    },

    recordUrlParams: {
      type: Object,
      default() {
        return {};
      }
    },

    allowRefresh: {
      type: Boolean,
      default: false
    },

    // Refresh records function.  This is the function to refresh the records for the existing parameters
    refreshRecords: {
      type: Function
    },

    /** Whether we are loading data externally to simulate loadinging within component **/
    externalLoading: {
      type: Boolean,
      default: false
    },

    /**
     * An array of objects to define bulk actions.
     *
     * The addition of actions will add simple selection actions, however, if your row contains complex functionality
     * it is usually better use the selfSelection functionality in order allow them to select themselves, otherwise
     * vue click events may overlap each other
     */
    bulkActions: {
      type: Array,
      default() {
        return [];
      }
    },

    updateAfterBulkAction: {
      type: Boolean,
      default: true
    },

    /**
     * An array of filters
     */
    filters: {
      type: Array,
      default() {
        return [];
      }
    },

    /**
     *
     */
    sorts: {
      type: Array,
      default() {
        return [];
      }
    },

    /**
     * Instead of using the default method for clicking the entire row which will 'select' it, the rows
     * can emit an event an even for 'bulk-selected' of a boolean for true/false if selection is part of the row's
     * functionality
     */
    rowsSelfSelect: {
      type: Boolean,
      default: false
    },

    pagination: {
      type: Object,
      default() {
        return {};
      }
    },

    // Arguments that are passed into each of the individual records for grid rows
    gridArgs: {
      type: Object,
      default() {
        return {};
      }
    },

    // ability to define a custom apiClient instead of using the default fetch
    apiClient: {
      default() {
        return fetch;
      }
    },

    /**
     * Whether or not we parse the api response returned through using the api client as a JSON:API response
     */
    useJsonApi: {
      type: Boolean,
      default: false
    },

    queueRefresh: {
      type: Boolean,
      default: false
    }
  }
};
