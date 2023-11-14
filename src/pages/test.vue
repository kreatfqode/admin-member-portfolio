<template>
    <VForm @submit="submitForm">
        <VCard>
            <VCardItem>
                <VRow>
                    <VCol cols="12" class="mt-3">
                        <VSelect placeholder="Pilih Umur Bayi" label="Umur Bayi" v-model="testValue" :items="testOptions"
                            prepend-inner-icon="bx-child" :menu-props="{ maxHeight: 200 }" />
                    </VCol>

                    <VCol cols="12">
                        <VTextField v-model="tinggi" prepend-inner-icon="bx-ruler" label="Tinggi Bayi"
                            placeholder="Jelaskan apa yang terjadi.." type="text" />
                    </VCol>

                    <VCol cols="12">
                        <VBtn type="submit" class="me-2" :disabled="isLoading">
                            <VProgressCircular indeterminate color="white" v-if="isLoading"></VProgressCircular>
                            {{ isLoading ? "" : "SUBMIT" }}
                        </VBtn>
                    </VCol>
                </VRow>
            </VCardItem>
        </VCard>
    </VForm>
</template>
  
<script>
import { ref } from 'vue';
export default {

    setup() {
        const isLoading = ref(false);
        const testOptions = [
            '0 - 5 Bulan',
            '6 - 11 Bulan',
            '12 - 23 Bulan',
            '24 - 59 Bulan'
        ];
        const testValue = ref();
        const tinggi = ref();

        return {
            testOptions,
            tinggi,
            testValue,
            isLoading
        };
    }
}
</script>
  