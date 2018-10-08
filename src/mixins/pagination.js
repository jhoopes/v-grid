export default {

    data() {
        return {
            internalPagination: false,
            internalCurrentPage: null,
            internalTotalPages: null,
        }
    },

    computed: {
        canPaginate() {
            if(typeof this.data.current_page !== 'undefined' &&
                this.data.current_page !== null) {
                return true;
            } else if( this.pagination.per_page ) {
                this.internalPagination = true;
                this.calculateInternalPage();
                return true;
            }
            return false;
        },
        currentPage() {
            if(this.data.current_page) {
                return this.data.current_page;
            } else if(this.internalPagination) {
                return this.internalCurrentPage
            }

            return 0;
        },
        totalPages() {
            if(this.data.total) {
                return this.data.total;
            } else if (this.internalPagination) {
                return this.internalTotalPages
            }

            return 0;
        },
        internalPage() {

            var start = (this.currentPage * this.pagination.per_page) - 1;

            var end = null;
            if(this.currentPage !== this.totalPages) {
                end = ( (this.currentPage * this.pagination.per_page) + this.pagination.per_page)  - 1;
            }
            if(end) {
                return this.data.slice(start, end);
            }else {
                return this.data.slice(start);
            }
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
        calculateInternalPage()  {

            this.internalTotalPages = Math.floor((this.data.length / this.pagination.per_page));
            this.internalCurrentPage = 1;

        }
    }

}