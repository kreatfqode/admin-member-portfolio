<template>
    <VCard>
    </VCard>
    <VCard class="mt-3">
        <VCardItem>
            <VBtn to="/experience-create">
                Tambah Experience
            </VBtn>
        </VCardItem>
        <VTable :headers="headers" :items="data" item-key="fullName" class="table-rounded" hide-default-footer disable-sort>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="row in data" :key="row.tahun">
                    <td class="text-sm" v-text="row.tahun" />
                    <td class="text-sm text-center" v-text="row.deskripsi" />
                    <td class="text-sm text-center" v-text="row.tempat" />
                    <!-- status -->
                    <td class="text-center">
                        <VChip size="small" color="primary" class="text-capitalize">
                            {{ row.bidang }}
                        </VChip>
                    </td>
                    <td>
                        <VBtn class="float-right" color="error" @click="deleteExperiences(row.id)">
                            <VIcon>mdi-delete</VIcon>
                        </VBtn>
                    </td>
                </tr>
            </tbody>
        </VTable>
    </VCard>
</template>
<script>
import config from "@/@core/config.vue";
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    data() {
        return {
            data: [
                {
                    tahun: "",
                    tempat: "",
                    bidang: "",
                    deskripsi: "",
                }
            ],

            headers: [
                'Tahun',
                'Deskripsi',
                'Tempat',
                'Bidang',
                'Aksi',
            ]
        }
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get(`${config.apiTarget}/api/experiences`);

                if (response.status == 200) {
                    this.data = response.data;
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
                    title: error.response.statusText,
                })
            }
        },

        async deleteExperiences(id_experiences) {
            try {
                const confirmDelete = await Swal.fire({
                    title: 'Ingin hapus experience?',
                    showConfirmButton: false,
                    showDenyButton: true,
                    showCancelButton: true,
                    denyButtonText: `Hapus`,
                });
                if (confirmDelete.isDenied) {
                    const response = await axios.delete(`${config.apiTarget}/api/experiences?id_experiences=${id_experiences}`);

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
                    this.fetchData();
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
                    title: error.response.statusText,
                })
            }
        }
    },
    async created() {
        this.fetchData();
    }
}

</script>
