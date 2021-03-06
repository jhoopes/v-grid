import Parser from "../classes/jsonapi_parser";

export default {
  watch: {
    recordUrlParams: {
      handler: function() {
        if (typeof this.recordUrl !== "undefined" && this.recordUrl !== null) {
          this.getRecordsFromAPI();
        }
      },
      deep: true
    }
  },

  methods: {
    getRecordsFromAPI(page) {
      if (page == null) {
        page = 1;
      }

      let params = {
        page
      };

      if (this.sortBy && this.sortBy.by) {
        params.sortBy = this.sortBy.by;

        if (this.sortBy.dir) {
          params.sortDir = this.sortBy.dir;
        }
      }

      if (this.currentFilter && this.currentFilter.params) {
        Object.assign(params, this.currentFilter.params);
      }

      for(var key in this.recordUrlParams) {
        if(Object.hasOwnProperty.call(this.recordUrlParams, key) && this.recordUrlParams[key]) {
          console.log(this.recordUrlParams[key])
          params[key] = this.recordUrlParams[key];
        }
      }

      this.loadingData = true;
      this.apiClient
        .get(this.recordUrl, {
          params
        })
        .then(
          response => {
            this.loadingData = false;

            if (this.useJsonApi) {
              var apiResponse = Parser.parseJSONAPIResponse(response.data);
              this.gridData = apiResponse;
              if (apiResponse.current_page) {
                this.internalCurrentPage = apiResponse.current_page;
              }
              this.setPagination();
              return;
            }

            if (typeof response.data.data != "undefined") {
              this.gridData = response.data;
              if (response.data.current_page) {
                this.internalCurrentPage = response.data.current_page;
              }
              this.setPagination();
            } else {
              this.gridData = response.data;
            }
          },
          error => {
            this.loadingData = false;

            if (!error.data) {
              throw new Error(error);
            }
          }
        );
    }
  }
};
