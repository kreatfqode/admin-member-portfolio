<template>
  <div>
    <VRow>
      <VCol cols="12" md="4" sm="6" v-for="project in dataProject" :key="project.id_programmers">
        <VCard>
          <VImg :src="`${apiTarget}/${imagePath}/${project.gambar}`" cover max-height="280" />

          <VCardItem>
            <VCardTitle>{{ project.nama }}</VCardTitle>
            <div class="mb-4">
              {{ project.tanggal }}
            </div>
            <VChip v-for="tekno in project.teknologi" size="small" color="success" class="text-capitalize">
              {{ tekno }}
            </VChip>
          </VCardItem>

          <VCardText>
            <VBtn :href="project.link"> DETAILS </VBtn>
            <VBtn class="ml-4" color="error" @click="deleteProject(project.id)"> DELETE </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import config from "@/@core/config.vue";
import axios from "axios";
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      dataProject: [],
      apiTarget: config.apiTarget,
      imagePath: config.imagePath
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`${config.apiTarget}/api/projects?id_programmers=${localStorage.getItem('id_programmers')}`);
        if (response.status === 200) {
          this.dataProject = response.data;
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: response,
        })
      }
    },
    async deleteProject(id_projects) {
      try {
        const confirmDelete = await Swal.fire({
          title: 'Ingin hapus project?',
          showConfirmButton: false,
          showDenyButton: true,
          showCancelButton: true,
          denyButtonText: `Hapus`,
        });
        if (confirmDelete.isDenied) {
          const response = await axios.delete(`${config.apiTarget}/api/projects?id_projects=${id_projects}`);
          if (response.status === 200) {
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
            });
            this.fetchData();
          }
        }
      } catch (error) {
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
          title: response.data.success.message,
        })
      }
    }
  },
  async created() {
    this.fetchData();
  },
};
</script>
