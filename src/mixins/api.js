export default {

    methods: {
        getRecordsFromAPI(page ) {

            if(page == null) {
                page = 1;
            }

            var vm = this;
            this.$http.get(this.recordUrl, { 'page': page }).then(function(response) {

                if(typeof response.data.data != 'undefined') {
                    vm.records = response.data.data;
                    vm.current_page = response.data.current_page;
                    vm.last_page = response.data.last_page;
                    vm.per_page = response.data.per_page;
                    vm.total = response.data.total;

                    vm.setPagination();
                }

            }, function(response) {
                portal.notify('alert', {
                    'type': 'error',
                    message: response.data.message,
                    title: Lang.get('claims.error')
                });
            });
        },
    }

}