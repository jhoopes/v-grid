<template>
    <div class="pagination m-4" v-if="pageCount > 1">
        <ul class="list-reset flex">
            <li class="px-2 rounded" :class="previousClass"
                @click="setCurrentPage(Math.max(1, currentPage-1))"
            >
                <a
                   aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="page in pages"
                class="px-2 cursor-pointer"
                :class="paginationItemClass(page)"
            >
                <a v-if="page.number"
                   @click="setCurrentPage(page.number)"
                >
                    {{ page.number }}
                </a><span v-if="page.number === null">...</span>
            </li>
            <li :class="nextClass" class="px-2 rounded"
                v-on:click="setCurrentPage(Math.min(pageCount, currentPage + 1))"
            >
                <a
                   aria-label="Next"
                >
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {

        props: {
            currentPage: {
                required: true,
                type: Number
            },
            pageCount: {
                required: true,
                type: Number
            }
        },

        computed: {
            previousClass() {
                if(this.currentPage === 1) {
                    return 'disabled';
                }

                return 'cursor-pointer';
            },
            nextClass() {
                if(this.currentPage === this.pageCount) {
                    return 'disabled';
                }

                return 'cursor-pointer';
            },
            pages() {
                let pages = [];

                if (this.pageCount > 10) {
                    if (this.currentPage >= 7 &&  this.currentPage < this.pageCount - 5) {
                        pages = pages.concat(this.makeRange(1, 2));
                        pages.push({
                            number: null
                        });
                        pages = pages.concat(this.makeRange(this.currentPage - 3, this.currentPage + 3));
                        pages.push({
                            number: null
                        });
                        pages = pages.concat(this.makeRange(this.pageCount - 1, this.pageCount));
                    } else if (this.currentPage < 7) {
                        pages = pages.concat(this.makeRange(1, 8));
                        pages.push({
                            number: null
                        });
                        pages = pages.concat(this.makeRange(this.pageCount - 1, this.pageCount));
                    } else if (this.currentPage >= this.pageCount - 5) {
                        pages = pages.concat(this.makeRange(1, 2));
                        pages.push({
                            number: null
                        });
                        pages = pages.concat(this.makeRange(this.pageCount - 5, this.pageCount));
                    }
                } else {
                    pages = this.makeRange(1, this.pageCount);
                }

                return pages;
            }
        },

        methods: {
            makeRange(start, end) {
                let range = [];
                for (var i=start;i<=end;i++){
                    range.push({
                        number: i
                    });
                }
                return range;
            },
            paginationItemClass(page) {

                if(!page.number) {
                    return 'disabled';
                }

                if(this.currentPage === page.number) {
                    return 'selected'
                }

            },
            setCurrentPage(newPageNumber) {
                this.$emit('updatePageNumber', newPageNumber);
            }
        }

    }
</script>