<template>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th v-for="headerName in tableHeaders">
                        {{ getHeaderName(headerName) }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records" :is="recordType" :record.sync="record" :base-record-id="baseRecordId" v-on:remove="removeRecord(record, $event)"></tr>
            </tbody>
        </table>


        <div v-if="records.length == 0">
            No Records
        </div>
    </div>
</template>
<script>
    import TableRow from './../generic-rows/table-row.vue';

    export default {

        props: ['records', 'recordType'],

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