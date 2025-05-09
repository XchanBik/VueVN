<template>
    <div id="app" class="min-h-screen flex flex-col">
        <Config v-if="appStore.currentPage === PageState.Config" />
        <!--
        <HeaderBar />
        <PopUp />
        <ConfirmDialog />
        <FullPageLoader />
        -->
    </div>
</template>
  
<script setup lang="ts">
import Config from '@/components/Projects/Config.vue'

import { useAppStore } from '@/stores/app_data'
import { PageState } from '@/enums/page_state'

const appStore = useAppStore()
</script>
