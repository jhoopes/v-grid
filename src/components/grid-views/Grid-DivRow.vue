<template>
  <div id="records">
    <table class="table table-hover">
      <tr>
        <th v-for="headerName in tableHeaders" :key="headerName">
          {{ getHeaderName(headerName) }}
        </th>
      </tr>
    </table>

    <div
      v-for="record in records"
      :key="record.id"
      :is="recordType"
      :record="record"
      :base-record-id="baseRecordId"
      v-on:remove="removeRecord(record, $event)"
      :class="{
        selected: selectedRecords.find(r => r.id === record.id),
        'cursor-pointer': recordsAreSelectable
      }"
      @click.native="handeSelectionClick(record)"
      @record-selected="selectRecord(record)"
      @record-unselected="deselectRecord(record)"
      @refreshRecords="$parent.runRefresh()"
      :args="args"
    ></div>
    <div v-if="records.length == 0"></div>
  </div>
</template>
<script>
import is_grid_view from "../../mixins/is_grid_view";

export default {
  mixins: [is_grid_view],

  data() {
    return {
      baseRecordId: 0,
      tableHeaders: [] // if headers are passed in a fake table will be made
    };
  },

  created() {
    this.baseRecordId = this.$parent.baseRecordId;
    this.tableHeaders = this.$parent.headers;
  },

  methods: {
    getHeaderName(name) {
      return name;
    },
    handeSelectionClick(record) {
      // only run section if records are selectable through a simple click
      if (!this.recordsAreSelectable) {
        return;
      }

      let foundRecord = this.selectedRecords.find(rec => {
        return rec.id === record.id;
      });

      if (foundRecord) {
        this.deselectRecord(record);
      } else {
        this.selectRecord(record);
      }
    },
    selectRecord(record) {
      this.$emit("record-selected", record);
    },
    deselectRecord(record) {
      this.$emit("record-unselected", record);
    },
    removeRecord(record) {
      this.$emit("removeRecord", record);
    }
  }
};
</script>
