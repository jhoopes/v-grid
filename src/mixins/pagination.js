import jQuery from 'jquery';

export default {

    computed: {
        canPaginate() {
            if(typeof this.data.current_page !== 'undefined' &&
                this.data.current_page !== null) {
                return true;
            }
            return false;
        },
    },

    watch: {
        data: function(val) {
            if(this.canPaginate) {
                this.setPagination();
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

                jQuery('#' + this.uniqueId + '-pager').pagination({
                    currentPage: this.data.current_page,
                    items: this.data.total,
                    itemsOnPage: this.data.per_page,
                    cssStyle: 'pagination',
                    hrefTextPrefix: search,
                    prevText: '<i class="icon-previous"></i>',
                    nextText: '<i class="icon-next"></i>',
                    onPageClick: function(pageNumber, e) {
                        if(typeof this.recordUrl !== 'undefined' && this.recordUrl !== null) {
                            vm.getRecordsFromAPI(pageNumber);
                        }else {
                            vm.$emit('updatePage', pageNumber);
                        }
                    }
                });
            });
        },
    }

}