<template>
  <VRow>
    <VCol cols="12" md="6">
      <VCard>
        <VCardItem>
          <VForm class="mt-3" @submit.prevent="addSkill">
            <VSelect v-model="skillSelected" label="Skills" placeholder="Select Your Skill"
              :items="skillOptions.map(item => { return { title: item.nama, value: item.id } })" />
            <VBtn class="mt-4" type="submit" :disabled="isLoadingSkill">
              <VProgressCircular indeterminate color="white" v-if="isLoadingSkill"></VProgressCircular>
              {{ isLoadingSkill ? "" : "Tambah" }}
            </VBtn>
          </VForm>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol cols="12" md="6">
      <VCard>
        <VCardItem>
          <VForm class="mt-3" @submit.prevent="addTool">
            <VSelect v-model="toolSelected" label="Tools" placeholder="Select Your Tool"
              :items="toolOptions.map(item => { return { title: item.nama, value: item.id } })" />
            <VBtn class="mt-4" type="submit" :disabled="isLoadingTool">
              <VProgressCircular indeterminate color="white" v-if="isLoadingTool"></VProgressCircular>
              {{ isLoadingTool ? "" : "Tambah" }}
            </VBtn>
          </VForm>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol cols="12" md="6">
      <VRow>
        <VCol cols="12" md="2" v-for="(mySkill, index) in mySkills" :key="mySkill.id">
          <VCard @mouseenter="setHovered(index, true)" @mouseleave="setHovered(index, false)">
            <VCardItem>
              <VBtn v-if="mySkill.isHovered" icon @click="deleteSkill(mySkill.id)" class="delete-button" color="error">
                <VIcon>mdi-delete</VIcon>
              </VBtn>
              <sub v-text="mySkill.nama"></sub>
              <VImg :src="`${config.apiTarget}/${mySkill.gambar}`"
                :style="{ display: mySkill.isHovered ? 'none' : 'block' }" />
            </VCardItem>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="12" md="6">
      <VRow>
        <VCol cols="12" md="2" v-for="(myTool, index) in myTools">
          <VCard @mouseenter="setHovered(index, true, true)" @mouseleave="setHovered(index, false, true)">
            <VCardItem>
              <VBtn v-if="myTool.isHovered" icon @click="deleteTool(myTool.id)" class="delete-button" color="error">
                <VIcon>mdi-delete</VIcon>
              </VBtn>
              <sub v-text="myTool.nama"></sub>
              <VImg :src="`${config.apiTarget}/${myTool.gambar}`"
                :style="{ display: myTool.isHovered ? 'none' : 'block' }" />
            </VCardItem>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<script>
import config from "@/@core/config.vue";
import axios from 'axios';
import Swal from "sweetalert2";
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const isLoadingSkill = ref(false);
    const isLoadingTool = ref(false);
    const skillSelected = ref("");
    const toolSelected = ref("");
    const skillOptions = ref([]);
    const toolOptions = ref([]);
    const mySkills = ref([]);
    const myTools = ref([]);

    const addSkill = async () => {
      try {
        isLoadingSkill.value = true;
        const response = await axios.post(`${config.apiTarget}/api/skills`, {
          id_programmers: localStorage.getItem('id_programmers'),
          id_skills: skillSelected.value
        });
        await fetchData();
        isLoadingSkill.value = false;
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
      } catch (error) {
        isLoadingSkill.value = false;
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
          title: "Penambahan skill gagal",
        })
      }
    };

    const addTool = async () => {
      try {
        isLoadingTool.value = true;
        const response = await axios.post(`${config.apiTarget}/api/tools`, {
          id_programmers: localStorage.getItem('id_programmers'),
          id_tools: toolSelected.value
        });
        await await fetchData();
        isLoadingTool.value = false;
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
      } catch (error) {
        isLoadingTool.value = false;
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
          title: "Penambahan tool gagal",
        })
      }
    };

    const deleteSkill = async (skillId) => {
      try {
        const response = await axios.delete(`${config.apiTarget}/api/skills/?id_programmers=${localStorage.getItem('id_programmers')}&id_skills=${skillId}`)
        await fetchData();
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
          title: "Gagal menghapus skill",
        })
      }
    }
    const deleteTool = async (toolId) => {
      try {
        const response = await axios.delete(`${config.apiTarget}/api/tools/?id_programmers=${localStorage.getItem('id_programmers')}&id_tools=${toolId}`)
        await fetchData();
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
          title: "Gagal menghapus tool",
        })
      }
    };

    const fetchData = async () => {
      try {
        // Fetch skillOptions data
        const skillResponse = await axios.get(`${config.apiTarget}/api/skills?id_programmers_not=${localStorage.getItem('id_programmers')}`);
        skillOptions.value = skillResponse.data;

        // Fetch toolOptions data
        const toolResponse = await axios.get(`${config.apiTarget}/api/tools?id_programmers_not=${localStorage.getItem('id_programmers')}`);
        toolOptions.value = toolResponse.data;

        // Fetch mySkills data
        const mySkillResponse = await axios.get(`${config.apiTarget}/api/skills?id_programmers=${localStorage.getItem('id_programmers')}`);
        mySkills.value = mySkillResponse.data;

        // Fetch myTools data
        const myToolResponse = await axios.get(`${config.apiTarget}/api/tools?id_programmers=${localStorage.getItem('id_programmers')}`);
        myTools.value = myToolResponse.data;
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
          title: "Gagal mendapatkan data: " + error.response.statusText,
        })
      }
    };

    // Mengambil data skillOptions dan toolOptions dari API saat komponen dimuat
    onMounted(async () => {
      fetchData();
    });

    const setHovered = (index, isHovered, isTool = false) => {
      if (isTool) {
        myTools.value[index].isHovered = isHovered;
      } else {
        mySkills.value[index].isHovered = isHovered;
      }
    };

    return {
      skillSelected,
      skillOptions,
      toolSelected,
      toolOptions,
      mySkills,
      myTools,
      isLoadingSkill,
      isLoadingTool,
      addSkill,
      addTool,
      deleteSkill,
      setHovered,
      deleteTool,
      config,
    };
  }
}
</script>
