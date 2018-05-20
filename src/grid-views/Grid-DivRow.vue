<template>

    <div id="records">
        <div v-for="record in records" :is="recordType" :record="record" :base-record-id="baseRecordId" v-on:remove="removeRecord(record, $event)"></div>
        <div v-if="records.length == 0">

        </div>
    </div>

</template>
<script>
    export default {

        props: ['records', 'recordType'],

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