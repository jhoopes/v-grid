<template>
    <tr>
        <td v-for="key in rowKeys">
            {{ record[key] }}
        </td>
    </tr>
</template>
<script>
    export default {
        props: {
            record: {
                type: [Object, Array],
                required: true,
            },
            baseRecordId: {
                type: Number,
                default: 0
            },
        },

        data() {
            return {
                rowKeys: []
            }
        },

        created() {
            this.rowKeys = Object.keys(this.record);
        }
    }
</script>