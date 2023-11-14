<template>
    <VForm @submit="submitForm">
        <VCard>
            <VCardItem>
                <VRow>
                    <VCol cols="12" class="mt-3">
                        <VTextField v-model="tempat" prepend-inner-icon="bx-building-house" label="Tempat Pengalaman Anda"
                            placeholder="GDSC.." />
                    </VCol>

                    <VCol cols="12">
                        <VTextField v-model="deskripsi" prepend-inner-icon="bx-pencil" label="Deskripsi"
                            placeholder="Jelaskan apa yang terjadi.." type="text" />
                    </VCol>

                    <VCol cols="6">
                        <VTextField v-model="tanggal" prepend-inner-icon="bx-time" label="Tanggal" type="date" />
                    </VCol>

                    <VCol cols="6">
                        <VTextField v-model="jabatan" prepend-inner-icon="bx-briefcase" label="Bidang atau Jabatan"
                            placeholder="back-end senior developer.." type="text" />
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
import config from "@/@core/config.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {

    setup() {
        const tempat = ref("");
        const tanggal = ref("");
        const jabatan = ref("");
        const deskripsi = ref("");
        const isLoading = ref(false);

        const submitForm = async (formLogin) => {
            try {
                isLoading.value = true;
                formLogin.preventDefault();
                const formData = new FormData();
                formData.append('id_programmers', localStorage.getItem("id_programmers"));
                formData.append('tempat', tempat.value);
                formData.append('tahun', tanggal.value);
                formData.append('bidang', jabatan.value);
                formData.append('deskripsi', deskripsi.value);

                const response = await axios.post(
                    `${config.apiTarget}/api/experiences`,
                    formData
                );

                isLoading.value = false;

                Swal.fire({
                    toast: true,
                    position: "top",
                    iconColor: "white",
                    color: "white",
                    background: "rgb(var(--v-theme-success))",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2200,
                    icon: "success",
                    title: response.data.success.message,
                })

                resetForm();
            } catch (error) {
                isLoading.value = false;
                Swal.fire({
                    toast: true,
                    position: "top",
                    iconColor: "white",
                    color: "white",
                    background: "rgb(var(--v-theme-error))",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2200,
                    icon: "error",
                    title: error.response.statusText,
                })
            }
        };

        const resetForm = () => {
            tempat.value = "";
            tanggal.value = "";
            jabatan.value = "";
            deskripsi.value = "";
        }

        return {
            tempat,
            tanggal,
            jabatan,
            deskripsi,
            isLoading,
            submitForm,
            resetForm
        };
    }
}
</script>
  