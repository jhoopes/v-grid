<template>
    <div class="table-responsive">
        <table class="table table-hover" v-if="records.length > 0">
            <thead>
                <tr>
                    <th v-for="headerName in tableHeaders">
                        {{ getHeaderName(headerName) }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="record in records"
                    :key="record.id"
                    :is="recordType"
                    :record.sync="record"
                    :base-record-id="baseRecordId"
                    v-on:remove="removeRecord(record, $event)"
                    :args="args"></tr>
            </tbody>
        </table>


        <div v-if="records.length == 0">
            {{ noRecordsText }}
        </div>
    </div>
</template>
<script>
    import TableRow from './../generic-rows/table-row.vue';

    export default {

        props: ['records', 'recordType', 'args'],

        data() {
            return {
                baseRecordId: 0,
                tableHeaders: []
            }
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
                if(typeof this.args.noRecordsText !== "undefined") {
                    return this.args.noRecordsText
                }

                return 'No Records'
            }
        },

        methods: {
            getHeaderName(name) {
                return name;
            },
            removeRecord(record, event) {
                this.records.$remove(record);
            }
        }

    }
</script>