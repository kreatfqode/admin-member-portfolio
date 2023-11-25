<script setup>
import config from '@/@core/config.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
const avatar1 = `${config.apiTarget}/${localStorage.getItem("foto_utama")}`;
const clickLogout = async () => {
  try {
    const confirmLogout = await Swal.fire({
      title: 'Ingin log out dari aplikasi?',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Log Out`,
    });
    if (confirmLogout.isDenied) {
      const token = localStorage.getItem("authToken");

      const headers = {
        Authorization: token,
      };
      const response = await axios.post(`${config.apiTarget}/api/logout`, {}, { headers }); // Ganti dengan URL logout yang sesuai

      if (response.status === 200) {
        // Logout berhasil
        localStorage.removeItem("authToken");
        localStorage.removeItem("id_programmers");
        localStorage.removeItem("email");
        localStorage.removeItem("nama_panggilan");
        localStorage.removeItem("nama_lengkap");
        localStorage.removeItem("foto_utama");
        localStorage.removeItem("foto_tentang");
        localStorage.removeItem("tentang_diri");
        localStorage.removeItem("tentang_skill");
        localStorage.removeItem("tentang_pengalaman");
        localStorage.removeItem("tentang_project");
        localStorage.removeItem("alamat");
        localStorage.removeItem("no_telp");
        localStorage.removeItem("mulai_karir");
        localStorage.removeItem("moto_project");
        localStorage.removeItem("pdf_cv");
        // Redirect ke halaman login atau halaman lain yang sesuai
        window.location.href = `${config.deploymenBase}/login`;
      } else {
        // Tangani kesalahan logout jika diperlukan
        alert("Logout gagal");
      }
    }
  } catch (error) {
    // Tangani kesalahan yang mungkin terjadi selama permintaan logout
    alert("Terjadi kesalahan saat logout:", error);
  }
};
</script>

<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              John Doe
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-user" size="22" />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-help-circle" size="22" />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="clickLogout">
            <template #prepend>
              <VIcon class="me-2" icon="bx-log-out" size="22" />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
