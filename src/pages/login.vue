<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img class="d-flex text-primary" src="/logo.png" style="height: 50px" />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          Cube Programming
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">Login sebagai tim IT</h5>
        <p class="mb-0">Login untuk mengelola data portfolio</p>
      </VCardText>
      <VCardText>
        <VForm @submit="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.email" autofocus placeholder="xyz@email.com" label="Email" type="email" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Password" placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox v-model="form.remember" label="Remember me" />

                <RouterLink class="text-primary ms-2 mb-1" to="">
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn block type="submit" :disabled="isLoading">
                <VProgressCircular indeterminate color="white" v-if="isLoading"></VProgressCircular>
                {{ isLoading ? "" : "Login" }}
              </VBtn>
            </VCol>

            <!-- auth providers -->
            <VCol cols="12" class="text-center">
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<script>
import config from "@/@core/config.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  setup() {
    const isPasswordVisible = ref(false);
    const isLoading = ref(false);
    const form = ref({
      email: "",
      password: "",
      remember: false,
    });
    const error = ref(null);

    const login = async (formLogin) => {
      try {
        isLoading.value = true;
        formLogin.preventDefault();
        const loginData = {
          email: form.value.email,
          password: form.value.password,
        };
        const response = await axios
          .post(`${config.apiTarget}/api/auth/login`, loginData, {
            withCredentials: true,
            mode: 'cors'
          });
        if (response.status === 200) {
          localStorage.setItem("jwt-token", response.data.access_token);
          const url = `${config.apiTarget}/api/auth/me`;
          const token = response.data.access_token;
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          try {
            const responseAuth = await axios.post(url, {}, { headers });
            const berhasil = responseAuth.status === 200;
            if (berhasil) {
              localStorage.setItem("id_programmers", responseAuth.data.id);
              localStorage.setItem("web_portfolio", `${responseAuth.data.web_portfolio}?id_programmers=${responseAuth.data.id}`);
              localStorage.setItem("email", responseAuth.data.email);
              localStorage.setItem("warna_primary", responseAuth.data.warna_primary);
              localStorage.setItem("warna_secondary", responseAuth.data.warna_secondary);
              localStorage.setItem(
                "nama_panggilan",
                responseAuth.data.nama_panggilan ? responseAuth.data.nama_panggilan : ""
              );
              localStorage.setItem(
                "nama_lengkap",
                responseAuth.data.nama_lengkap ? responseAuth.data.nama_lengkap : ""
              );
              localStorage.setItem(
                "foto_utama",
                responseAuth.data.foto_utama ? responseAuth.data.foto_utama : ""
              );
              localStorage.setItem(
                "foto_tentang",
                responseAuth.data.foto_tentang ? responseAuth.data.foto_tentang : ""
              );
              localStorage.setItem(
                "tentang_diri",
                responseAuth.data.tentang_diri ? responseAuth.data.tentang_diri : ""
              );
              localStorage.setItem(
                "tentang_skill",
                responseAuth.data.tentang_skill ? responseAuth.data.tentang_skill : ""
              );
              localStorage.setItem(
                "tentang_pengalaman",
                responseAuth.data.tentang_pengalaman ? data.tentang_pengalaman : ""
              );
              localStorage.setItem(
                "tentang_project",
                responseAuth.data.tentang_project ? responseAuth.data.tentang_project : ""
              );
              localStorage.setItem(
                "alamat",
                responseAuth.data.alamat ? responseAuth.data.alamat : ""
              );
              localStorage.setItem(
                "no_telp",
                responseAuth.data.no_telp ? responseAuth.data.no_telp : ""
              );
              localStorage.setItem(
                "mulai_karir",
                responseAuth.data.mulai_karir ? responseAuth.data.mulai_karir : ""
              );
              localStorage.setItem(
                "moto_project",
                responseAuth.data.moto_project ? responseAuth.data.moto_project : ""
              );
              localStorage.setItem(
                "pdf_cv",
                responseAuth.data.pdf_cv ? responseAuth.data.pdf_cv : ""
              );
              window.location.href = `/${config.deploymenBase}dashboard`;
            }
            return berhasil;
          } catch (error) {
            localStorage.removeItem("jwt-token");
            console.error(error);
            return false;
          }
        } else {
          isLoading.value = false;
          Swal.fire({
            icon: 'error',
            title: response,
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
          title: "Email atau Password salah",
        })
      }
    };

    return {
      form,
      isPasswordVisible,
      error,
      isLoading,
      login,
    };
  },
};
</script>
