<script setup>
import CreateProjects from "@/views/pages/projects/CreateProjects.vue";
import ReadProjects from "@/views/pages/projects/ReadProjects.vue";
import { useRoute } from "vue-router";
// import AccountSettingsSecurity from "@/views/pages/";

const route = useRoute();
const activeTab = ref(route.params.tab);

// tabs
const tabs = [
  {
    title: "Read",
    icon: "bx-book-open",
    tab: "read",
  },
  {
    title: "Create",
    icon: "bx-book-add",
    tab: "create",
  },
];
</script>

<template>
  <div>
    <VTabs v-model="activeTab" show-arrows>
      <VTab v-for="item in tabs" :key="item.icon" :value="item.tab">
        <VIcon size="20" start :icon="item.icon" />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow v-model="activeTab" class="mt-5">
      <!-- read -->
      <VWindowItem value="read">
        <ReadProjects />
      </VWindowItem>

      <!-- create -->
      <VWindowItem value="create">
        <CreateProjects />
      </VWindowItem>
    </VWindow>
  </div>
</template>
