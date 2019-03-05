export default {

    methods: {
        getRecordsFromAPI(page ) {

            if(page == null) {
                page = 1;
            }

            let params = {
                page
            };

            Object.assign(params, this.recordUrlParams);

            this.apiClient.get(this.recordUrl, {
                params
            }).then(response => {

                if(typeof response.data.data != 'undefined') {
                    this.gridData = response.data;
                    if(response.data.current_page) {
                        this.internalCurrentPage = response.data.current_page;
                    }
                    this.setPagination();
                }

            }, function(response) {
                window.notify('alert', {
                    'type': 'error',
                    message: response.data.message,
                    title: Lang.get('claims.error')
                });
            });
        },
    }

}