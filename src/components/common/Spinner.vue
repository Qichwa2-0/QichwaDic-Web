<template>
    <div v-show="this.visible" class="spinner-container">
        <div class="spinner-wrapper m-auto">
            <div class="spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <p class="text-info small mt-2">{{ message }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Spinner",
        props: {
            visible: {
                type: Boolean,
                default: true
            },
            message: {
                type: String,
                default: 'Por favor, espere'
            }
        }
    }
</script>

<style>

</style>
