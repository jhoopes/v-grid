<template>

    <div id="records">
        <div
                v-for="record in records"
                :key="record.id"
                :is="recordType"
                :record="record"
                :base-record-id="baseRecordId"
                v-on:remove="removeRecord(record, $event)"
                :args="args">

        </div>
        <div v-if="records.length == 0">

        </div>
    </div>

</template>
<script>
    export default {

        props: ['records', 'recordType', 'args'],

        data() {
            return {
                baseRecordId: 0
            }
        },

        ready() {
            this.baseRecordId = this.$parent.baseRecordId;
        },

        methods: {
            removeRecord(record, event) {
                this.records.$remove(record);
            }
        }

    }
</script>