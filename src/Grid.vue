<template>

    <div :id="'grid-' + uniqueId ">
        <component :is="gridType" :records.sync="records" :record-type="recordType" :args="gridArgs"></component>
        <div class="flex justify-between controls">
            <pagination
                :current-page="currentPage"
                :page-count="totalPages"
            ></pagination>
            <div class="text-right" :class="addButtonSize" v-if="allowAdd">
                <button @click="addRecord" class="btn btn-success"><i class="fa fa-plus"></i> {{ addButtonText }}</button>
            </div>
        </div>
    </div>

</template>
<script>
    import api from './mixins/api';
    import pagination from './mixins/pagination';
    import tableView from './grid-views/Grid-TableView.vue'
    import divRow from './grid-views/Grid-DivRow.vue'
    import Pagination from './Pagination.vue';
    import { generateUniqueId } from './mixins/utils';
    export default {

        name: 'v-grid',

        props: {
            gridType: {
                type: String,
                default: 'tableView'
            },
            recordType: {
                type: String,
                default() {
                    if(this.gridType == 'tableView') {
                        return 'table-row';
                    }

                    return null;
                },
            },
            headers: {
                type: Array
            },
            data: {
                type: [Object, Array],
                default() {
                    return {
                        data: [],
                        total: 0,
                        per_page: 10,
                        current_page: 1,
                        last_page: 1
                    }
                }
            },
            allowAdd: {
                type: Boolean,
                default: false,
            },
            baseRecordId: {
                type: Number,
                default: null
            },
            recordUrl: {
                type: String,
                default: null
            },
            gridArgs: {
                type: Object,
                default() {
                    return {};
                },
            }
        },

        data() {
            return {
                uniqueId: '',
                addButtonText: ''
            }
        },

        computed: {
            records() {
                if(typeof this.data.current_page !== 'undefined' &&
                        this.data.current_page !== null &&
                        typeof this.data.data !== 'undefined' &&
                        this.data.data !== null) {

                    return this.data.data;
                }
                return this.data;
            },
        },

        components: {
            tableView,
            divRow,
            Pagination
        },

        mixins: [ api, pagination ],

        created() {
            this.uniqueId = generateUniqueId();
        },

        mounted() {
            this.init();
        },

        methods: {
            init() {

                // determine if we were given an API URL to
                // use or just use the base records object
                if(typeof this.recordUrl !== 'undefined' && this.recordUrl !== null) {
                    this.getRecordsFromAPI();
                }else if(this.canPaginate) {
                    this.setPagination();
                }

            },
            addRecord() {
                this.records.push({
                    isNew: true
                });
            },
        }
    }
</script>