export default {

    computed: {
        canPaginate() {
            if(typeof this.data.current_page !== 'undefined' &&
                this.data.current_page !== null) {
                return true;
            }
            return false;
        },
        currentPage() {
            if(this.data.current_page) {
                return this.data.current_page;
            }

            return 0;
        },
        totalPages() {
            if(this.data.total) {
                return this.data.total;
            }

            return 0;
        }
    },

    watch: {
        data: function(val) {
            if(this.canPaginate) {
            }
        }
    },

    methods: {
        setPagination() {
            var vm = this;

            var search = window.location.search;
            if(!search) {
                search = "#page";
            }else {
                search = "" + search + "#page=";
            }

            this.$nextTick(function() { // run the paginator after the next tick


            });
        },
    }

}