<template>

    <div :id="'grid-' + uniqueId " class="grid">
        <div v-if="allowAdd && addDisplay === 'top'" class="top-bar">
            <button @click="addRecord" class="button"><i class="fa fa-plus"></i> {{ addButtonText }}</button>
            <fa-icon icon="sync" v-if="refreshRecords" @click="refreshRecords"></fa-icon>
        </div>
        <div v-show="!loadingData">
            <component
                    :is="gridType"
                    :records.sync="records"
                    :record-type="recordType"
                    :args="gridArgs"
                    :selected-records="selectedRecords"
                    :records-are-selectable="bulkActions.length > 0"
                    @record-selected="addRecordToSelections"
                    @record-unselected="removeRecordFromSelections"
                    @removeRecord="removeRecord"
            ></component>
        </div>
        <div v-show="loadingData" style="min-height: 75vh; display: flex; align-items: center; justify-content: center;">
            <span class="fa fa-spinner fa-spin fa-3x"></span>
        </div>
        <div class="flex justify-between controls" v-show="!loadingData">
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
    import props from './mixins/grid/props';
    import api from './mixins/api';
    import pagination from './mixins/pagination';
    import tableView from './grid-views/Grid-TableView.vue'
    import divRow from './grid-views/Grid-DivRow.vue'
    import Pagination from './Pagination.vue';
    import { generateUniqueId } from './mixins/utils';
    export default {

        name: 'v-grid',

        data() {
            return {
                uniqueId: '',
                gridData: {},
                loadingData: false,
                selectedRecords: [],
            }
        },

        watch: {
            data(newData) {
                this.gridData = newData;
            }
        },

        computed: {
            records() {

                if(typeof this.gridData.current_page !== 'undefined' &&
                    this.gridData.current_page !== null &&
                    typeof this.gridData.data !== 'undefined' &&
                    this.gridData.data !== null) {

                    return this.gridData.data;
                } else if(this.internalPagination) {
                    return this.internalPage
                }
                return this.gridData;
            },
        },

        components: {
            tableView,
            divRow,
            Pagination
        },

        mixins: [ props,  api, pagination ],

        created() {
            this.uniqueId = generateUniqueId();
            this.gridData = this.data;
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
                } else if(this.recordUrl) {
                    this.getRecordsFromAPI(newPage);
                } else {
                    this.$emit('updatePagination', newPage);
                }

            },
            removeRecord(record) {
                this.$emit('removeRecord', record);
            },
            addRecordToSelections(record) {
                this.selectedRecords.push(record);
            },
            removeRecordFromSelections(record) {

                let recordIndex = this.selectedRecords.findIndex(selectedRecord => {
                    return selectedRecord.id === record.id;
                });

                this.selectedRecords.splice(recordIndex, 1);
            }
        }
    }
</script>