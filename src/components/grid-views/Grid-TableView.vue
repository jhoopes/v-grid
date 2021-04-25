<template>
  <div class="table-responsive">
    <table class="table table-hover" v-if="records.length > 0">
      <thead>
        <tr>
          <th v-for="headerName in tableHeaders" :key="headerName">
            {{ getHeaderName(headerName) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <component
          v-for="record in records"
          :key="record.id"
          :is="recordType"
          v-model:record="record"
          :base-record-id="baseRecordId"
          v-on:remove="removeRecord(record, $event)"
          @refreshRecords="$parent.runRefresh()"
          :args="args"
        ></component>
      </tbody>
    </table>

    <div v-if="records.length == 0">
      {{ noRecordsText }}
    </div>
  </div>
</template>
<script>
import TableRow from "../generic-rows/table-row.vue";

export default {
  // props: ["records", "recordType", "args"],

  props: {
    records: {
      type: Array,
      required: true
    },
    recordType: {
      type: String,
      required: true
    },
    args: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      baseRecordId: 0,
      tableHeaders: []
    };
  },

  created() {
    this.baseRecordId = this.$parent.baseRecordId;
    this.tableHeaders = this.$parent.headers;
  },

  components: {
    TableRow
  },

  computed: {
    noRecordsText() {
      if (typeof this.args.noRecordsText !== "undefined") {
        return this.args.noRecordsText;
      }

      return "No Records";
    }
  },

  methods: {
    getHeaderName(name) {
      return name;
    },
    removeRecord(record) {
      this.$emit("removeRecord", record);
    }
  }
};
</script>
