<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stats: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <VCard>
    <VCardText class="d-flex align-center pb-4">
      <img width="42" :src="props.image" alt="image">
    </VCardText>

    <VCardText>
      <b class="mb-1">
        {{ props.title }}
      </b>
      <h4 class="text-h4 text-no-wrap">
        {{ props.stats }}
      </h4>
    </VCardText>
  </VCard>
</template>
