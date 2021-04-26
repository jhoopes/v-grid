<template>
  <div :id="'grid-' + uniqueId" class="grid">
    <div class="top-bar flex justify-end">
      <button
        @click="addRecord"
        class="button"
        v-if="allowAdd && addDisplay === 'top'"
      >
        <i class="fa fa-plus"></i> {{ addButtonText }}
      </button>
      <button v-if="allowRefresh" @click="runRefresh">
        <font-awesome-icon :icon="faIcons.faSync"></font-awesome-icon>
      </button>
      <div v-if="selectedRecords.length > 0">
        <multi-select
          :options="bulkActions"
          track-by="name"
          label="title"
          placeholder="Select Action"
          @input="runBulkAction"
          class="bulk-options-selector"
          :show-labels="false"
        ></multi-select>
      </div>
      <div v-if="filters.length > 0">
        <multi-select
          :options="filters"
          track-by="name"
          label="title"
          placeholder="Select filter"
          :value="currentFilter"
          @input="runFilter"
          class="bulk-options-selector"
          :show-labels="false"
        ></multi-select>
      </div>
      <div v-if="sorts.length > 0">
        <multi-select
          :options="sorts"
          track-by="name"
          label="title"
          placeholder="Select field to sort by"
          :value="sortBy"
          @input="runSort"
          class="bulk-options-selector"
          :show-labels="false"
        ></multi-select>
      </div>
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
    <div
      v-show="loadingData"
      style="min-height: 75vh; display: flex; align-items: center; justify-content: center;"
    >
      <font-awesome-icon
        :icon="faIcons.faSpinner"
        :spin="true"
        size="3x"
      ></font-awesome-icon>
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
        <button @click="addRecord" class="button">
          <i class="fa fa-plus"></i> {{ addButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import props from "../mixins/grid/props";
import api from "../mixins/api";
import pagination from "../mixins/pagination";
import tableView from "./grid-views/Grid-TableView.vue";
import divRow from "./grid-views/Grid-DivRow.vue";
import Pagination from "./Pagination.vue";
import { generateUniqueId } from "../mixins/utils";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import MultiSelect from '@suadelabs/vue3-multiselect'
export default {
  name: "v-grid",

  data() {
    return {
      uniqueId: "",
      gridData: {},
      loadingData: false,
      selectedRecords: [],
      sortBy: null,
      currentFilter: null,
      faIcons: {
        faPlus,
        faSync,
        faSpinner
      }
    };
  },

  watch: {
    data(newData) {
      this.gridData = newData;
    },
    externalLoading(newLoading) {
      this.loadingData = newLoading;
    },
    queueRefresh(newRefresh) {
      if (newRefresh) {
        this.runRefresh();
      }

      this.$emit("update:queueRefresh", false);
    }
  },

  computed: {
    records() {
      if (
        typeof this.gridData.current_page !== "undefined" &&
        this.gridData.current_page !== null &&
        typeof this.gridData.data !== "undefined" &&
        this.gridData.data !== null
      ) {
        return this.gridData.data;
      } else if (this.internalPagination) {
        return this.internalPage;
      }
      return this.gridData;
    }
  },

  components: {
    FontAwesomeIcon,
    tableView,
    divRow,
    Pagination,
    MultiSelect
  },

  mixins: [props, api, pagination],

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
      if (typeof this.recordUrl !== "undefined" && this.recordUrl !== null) {
        this.getRecordsFromAPI();
      } else if (this.canPaginate) {
        this.setPagination();
      }
    },
    addRecord() {
      this.addAction();
    },
    updatePagination(newPage) {
      if (this.internalPagination) {
        this.internalCurrentPage = newPage;
      } else if (this.recordUrl) {
        this.getRecordsFromAPI(newPage);
      } else {
        this.$emit("updatePagination", newPage);
      }
    },
    removeRecord(record) {
      this.$emit("removeRecord", record);
    },
    addRecordToSelections(record) {
      this.selectedRecords.push(record);
    },
    removeRecordFromSelections(record) {
      let recordIndex = this.selectedRecords.findIndex(selectedRecord => {
        return selectedRecord.id === record.id;
      });

      this.selectedRecords.splice(recordIndex, 1);
    },
    runRefresh() {
      if (this.refreshRecords) {
        this.refreshRecords();
        return;
      }

      if (this.recordUrl) {
        this.loadingData = true;
        this.getRecordsFromAPI();
      }
    },
    runBulkAction(action) {
      action.action(this.selectedRecords);

      if (this.recordUrl && this.updateAfterBulkAction) {
        this.getRecordsFromAPI();
      }
      this.$emit("actionRun", action);
      this.selectedRecords = [];
    },
    runFilter(filter) {
      if (!filter) {
        // reset filter
        this.currentFilter = null;
        this.$emit("updateFilter", null);
        if (this.recordUrl) {
          this.getRecordsFromAPI();
        }
        return;
      }

      if (!filter.params) {
        throw new Error("Invalid filter option");
      }

      this.currentFilter = filter;
      this.$emit("updateFilter", filter);
      if (this.recordUrl) {
        this.getRecordsFromAPI();
      }
    },
    runSort(sort) {
      if (!sort) {
        // reset sort
        this.sortBy = null;
        this.$emit("updateSort", null);
        if (this.recordUrl) {
          this.getRecordsFromAPI();
        }
        return;
      }

      if (typeof sort.action === "function") {
        sort.action();
      } else if (!sort.by) {
        throw new Error("Invalid sort option");
      }

      this.sortBy = sort;
      if (this.recordUrl) {
        this.getRecordsFromAPI();
      }
      this.$emit("updateSort", sort);
    }
  }
};
</script>
