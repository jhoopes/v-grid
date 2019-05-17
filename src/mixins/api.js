export default {


    watch: {
        recordUrlParams(newParams) {
            if(typeof this.recordUrl !== 'undefined' && this.recordUrl !== null) {
                this.getRecordsFromAPI();
            }
        }
    },

    methods: {
        getRecordsFromAPI(page ) {

            if(page == null) {
                page = 1;
            }

            let params = {
                page
            };

            if(this.sortBy && this.sortBy.by) {
                params.sortBy = this.sortBy.by;
            }

            if(this.currentFilter && this.currentFilter.params) {
                Object.assign(params, this.currentFilter.params);
            }

            Object.assign(params, this.recordUrlParams);
            this.loadingData = true;
            this.apiClient.get(this.recordUrl, {
                params
            }).then(response => {
                this.loadingData = false;
                if(typeof response.data.data != 'undefined') {
                    this.gridData = response.data;
                    if(response.data.current_page) {
                        this.internalCurrentPage = response.data.current_page;
                    }
                    this.setPagination();
                }

            }, function(response) {
                this.loadingData = false;
                window.notify('alert', {
                    'type': 'error',
                    message: response.data.message,
                    title: Lang.get('claims.error')
                });
            });
        },
    }

}