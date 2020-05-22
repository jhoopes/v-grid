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
            if (typeof this.gridData.current_page !== 'undefined' &&
                this.gridData.current_page !== null) {
                return true;
            } else if (this.pagination.per_page) {
                this.internalPagination = true;
                this.calculateInternalPage();
                return true;
            }
            return false;
        },
        currentPage() {
            if (this.gridData.current_page) {
                return this.gridData.current_page;
            } else if (this.internalPagination) {
                return this.internalCurrentPage
            }

            return 0;
        },
        totalPages() {
            if (this.gridData.last_page) {
                return this.gridData.last_page;
            } else if (this.internalPagination) {
                return this.internalTotalPages
            }

            return 0;
        },
        internalPage() {
            let perPage = null;
            if(this.gridData.per_page) {
                perPage = this.gridData.per_page
            } else if(this.pagination.per_page) {
                perPage = this.pagination.per_page
            } else {
                return // if we don't have a per page set, then we aren't paginating
            }


            if (this.currentPage == 1) {
                var start = 0;
            } else {
                var start = (this.currentPage * perPage) - perPage;
            }

            var end = null;
            if (this.currentPage !== this.totalPages) {
                end = this.currentPage * perPage;
            }

            var data = [];
            if(this.gridData.data) {
                data = this.gridData.data;
            } else {
                data = this.gridData;
            }


            if (end) {
                return data.slice(start, end);
            } else {
                return data.slice(start);
            }
        }
    },

    watch: {
        data: function (val) {
            if (this.canPaginate) {}
        }
    },

    methods: {
        setPagination() {
            var vm = this;

            var search = window.location.search;
            if (!search) {
                search = "#page";
            } else {
                search = "" + search + "#page=";
            }
        },
        calculateInternalPage() {

            this.internalTotalPages = Math.ceil((this.data.length / this.pagination.per_page));
            this.internalCurrentPage = 1;

        }
    }

}