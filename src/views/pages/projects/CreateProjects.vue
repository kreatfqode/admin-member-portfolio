<template>
  <VForm @submit="submitForm">
    <VCard>
      <VCardItem>
        <VRow>
          <VCol cols="12" class="mt-3">
            <VTextField v-model="namaProject" prepend-inner-icon="bx-book" label="Nama Project" placeholder="John" />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="tanggal" prepend-inner-icon="bx-time" label="Tanggal Project" type="date" />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="link" prepend-inner-icon="bx-link" label="Link project" placeholder="https://web..."
              type="text" />
          </VCol>

          <VCol cols="12">

            <VSelect v-model="selectedOptions" :items="options" label="Pilih tenologi" multiple chips />
          </VCol>

          <!-- 👉 Avatar -->
          <VCol cols="12">
            <!-- 👉 Upload Photo -->
            <div class="d-flex flex-column justify-center gap-5">
              <div class="d-flex flex-wrap gap-2">
                <VBtn color="primary" @click="refInputEl?.click()">
                  <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                  <span class="d-none d-sm-block">Upload new photo</span>
                </VBtn>

                <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg" hidden @change="changeAvatar" />

                <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                  <span class="d-none d-sm-block">Reset</span>
                  <VIcon icon="bx-refresh" class="d-sm-none" />
                </VBtn>
              </div>
            </div>
            <VAvatar rounded="lg" size="200" class="me-6" :image="projectImageLocal.imageValue"
              v-show="projectImageLocal.imageValue !== ''" />
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
import { onMounted, ref } from "vue";

export default {

  setup() {
    const namaProject = ref("");
    const tanggal = ref("");
    const link = ref("");
    const selectedOptions = ref([]);
    const refInputEl = ref();
    const options = ref([]);
    const isLoading = ref(false);

    const projectImage = {
      imageValue: "",
    };

    const projectImageLocal = ref({ ...projectImage });

    const resetAvatar = () => {
      projectImageLocal.value.imageValue = projectImage.imageValue;
    };

    const changeAvatar = (file) => {
      const fileReader = new FileReader();
      const { files } = file.target;
      if (files && files.length) {
        // Validasi tipe file sebelum menampilkan gambarnya
        if (files[0].type === "image/jpeg" || files[0].type === "image/png" || files[0].type === "image/jpg") {
          fileReader.readAsDataURL(files[0]);
          fileReader.onload = () => {
            if (typeof fileReader.result === "string") {
              projectImageLocal.value.imageValue = fileReader.result;
            }
          };
        } else {
          // Tindakan jika tipe file tidak valid
          alert("File harus berupa gambar dengan tipe jpeg, png, atau jpg.");
          resetAvatar();
        }
      }
    };

    const resetForm = () => {
      namaProject.value = "";
      tanggal.value = "";
      link.value = "";
      selectedOptions.value = [];
      resetAvatar();
    };

    const submitForm = async (formLogin) => {
      try {
        isLoading.value = true;
        formLogin.preventDefault();
        if (projectImageLocal.value.imageValue) {
          const formData = new FormData();
          formData.append('gambar', projectImageLocal.value.imageValue);
          formData.append('id_programmers', localStorage.getItem("id_programmers"));
          formData.append('nama', namaProject.value);
          formData.append('tanggal', tanggal.value);
          formData.append('link', link.value);
          formData.append('teknologi', selectedOptions.value);

          const response = await axios.post(
            `${config.apiTarget}/api/projects`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem("authToken")
              },
            }
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
        } else {
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
            title: "Pilih gambar terlebih dahulu",
          })
        }
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
          title: "Gagal menambahkan projects",
        })
      }
    };

    onMounted(async () => {
      const response = await axios.get(`${config.apiTarget}/api/skills`);
      options.value = response.data.map(item => {
        return {
          title: item.nama, value:
            item.id
        }
      });
    });

    return {
      namaProject,
      tanggal,
      link,
      selectedOptions,
      projectImageLocal,
      refInputEl,
      options,
      isLoading,
      resetAvatar,
      changeAvatar,
      resetForm,
      submitForm,
    };
  }
}
</script>
