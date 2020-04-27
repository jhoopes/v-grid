<template>
    <tr>
        <td v-for="value in record" class="px-2">
            {{ value }}
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

    }
</script>