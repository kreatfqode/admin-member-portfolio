<script setup>
import config from "@/@core/config.vue";
import VerticalNavLayout from "@layouts/components/VerticalNavLayout.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
import axios from "axios";
import Swal from 'sweetalert2';
import { useTheme } from "vuetify";

// Components
import Footer from "@/layouts/components/Footer.vue";
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue";
import UserProfile from "@/layouts/components/UserProfile.vue";

const vuetifyTheme = useTheme();

const urlMyPortfolio = localStorage.getItem('url_portfolio');

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
      const response = await axios.post(
        `${config.apiTarget}/api/logout`,
        {},
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("authToken")
          },
        }
      );
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
      }
      // Redirect ke halaman login atau halaman lain yang sesuai
      window.location.href = `${config.deploymenBase}/login`;
    }
  } catch (error) {
    // Tangani kesalahan yang mungkin terjadi selama permintaan logout
    alert("Terjadi kesalahan saat logout:", error);
  }
};
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!-- 👉 Search -->
        <div class="d-flex align-center cursor-pointer" style="user-select: none">
          <!-- 👉 Search Trigger button -->
          <VBtn :href="urlMyPortfolio">
            Lihat Portfolio Saya
          </VBtn>
        </div>

        <VSpacer />

        <IconBtn class="me-2" href="https://github.com/muhamadoskhar" target="_blank" rel="noopener noreferrer">
          <VIcon icon="bxl-github" />
        </IconBtn>

        <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink :item="{
        title: 'Dashboard',
        icon: 'bx-home',
        to: '/dashboard',
      }" />
      <VerticalNavLink :item="{
        title: 'Account Settings',
        icon: 'mdi-account-cog-outline',
        to: '/account-settings',
      }" />
      <VerticalNavLink :item="{
        title: 'Projects',
        icon: 'bx-code',
        to: '/projects',
      }" />
      <VerticalNavLink :item="{
        title: 'Skills & Tools',
        icon: 'bx-star',
        to: '/skills-tools',
      }" />
      <VerticalNavLink :item="{
        title: 'Experience',
        icon: 'bx-trophy',
        to: '/experience',
      }" />
      <VerticalNavLink :item="{
        title: 'Message',
        icon: 'bx-envelope',
        to: '/message',
      }" />
      <VerticalNavLink @click="clickLogout" :item="{
        title: 'Logout',
        icon: 'bx-log-out',
      }" />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
