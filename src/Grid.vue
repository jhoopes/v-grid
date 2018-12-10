<template>

    <div :id="'grid-' + uniqueId " class="grid">
        <div v-if="allowAdd && addDisplay === 'top'" class="top-bar">
            <button @click="addRecord" class="button"><i class="fa fa-plus"></i> {{ addButtonText }}</button>
            <fa-icon icon="sync" v-if="refreshRecords" @click="refreshRecords"></fa-icon>
        </div>
        <component :is="gridType" :records.sync="records" :record-type="recordType" :args="gridArgs"></component>
        <div class="flex justify-between controls">
            <div>
                <pagination
                        :current-page="currentPage"
                        :page-count="totalPages"
                        @updatePageNumber="updatePagination"
                ></pagination>
            </div>
            <div class="text-right" v-if="allowAdd && addDisplay === 'bottom'">
                <button @click="addRecord" class="button"><i class="fa fa-plus"></i> {{ addButtonText }}</button>
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
            addAction: {
                type: Function,
                default() {
                    this.records.push({
                        isNew: true
                    });
                }
            },
            addButtonText: {
                type: String,
                default: 'Add'
            },
            addDisplay: {
                type: String,
                default: 'bottom'
            },
            baseRecordId: {
                type: Number,
                default: null
            },
            recordUrl: {
                type: String,
                default: null
            },
            refreshRecords: {
                type: Function,
                default: null
            },
            pagination: {
                type: Object,
                default() {
                    return {}
                }
            },
            gridArgs: {
                type: Object,
                default() {
                    return {};
                },
            },
            apiClient: {
                type: Object,
                default() {
                    return axios;
                }
            }
        },

        data() {
            return {
                uniqueId: '',
            }
        },

        computed: {
            records() {
                if(typeof this.data.current_page !== 'undefined' &&
                        this.data.current_page !== null &&
                        typeof this.data.data !== 'undefined' &&
                        this.data.data !== null) {

                    return this.data.data;
                } else if(this.internalPagination) {
                    return this.internalPage
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
                this.addAction();
            },
            updatePagination(newPage) {

                if(this.internalPagination) {
                    this.internalCurrentPage = newPage;
                }else {
                    this.$emit('updatePagination', newPage);
                }

            }
        }
    }
</script>