<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Change Password">
        <VForm @submit="changePassword">
          <VCardText>
            <!-- 👉 Current Password -->
            <VRow>
              <VCol cols="12" md="6">
                <!-- 👉 current password -->
                <VTextField v-model="currentPassword" :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'bx-hide' : 'bx-show'
                    " label="Current Password" placeholder="············" @click:append-inner="
    isCurrentPasswordVisible = !isCurrentPasswordVisible
    " />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol cols="12" md="6">
                <!-- 👉 new password -->
                <VTextField v-model="newPassword" :type="isNewPasswordVisible ? 'text' : 'password'" :append-inner-icon="isNewPasswordVisible ? 'bx-hide' : 'bx-show'
                  " label="New Password" placeholder="············" @click:append-inner="
    isNewPasswordVisible = !isNewPasswordVisible
    " />
              </VCol>

              <VCol cols="12" md="6">
                <!-- 👉 confirm password -->
                <VTextField v-model="confirmPassword" :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'
                    " label="Confirm New Password" placeholder="············" @click:append-inner="
    isConfirmPasswordVisible = !isConfirmPasswordVisible
    " />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <p class="text-base font-weight-medium mt-2">
              Password Requirements:
            </p>

            <ul class="d-flex flex-column gap-y-3">
              <li v-for="item in passwordRequirements" :key="item" class="d-flex">
                <div>
                  <VIcon size="7" icon="bxs-circle" class="me-3" />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn type="submit">Save changes</VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>
<script>
import config from '@/@core/config.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';

export default {
  setup() {
    const isCurrentPasswordVisible = ref(false);
    const isNewPasswordVisible = ref(false);
    const isConfirmPasswordVisible = ref(false);
    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const passwordRequirements = [
      "Minimal 6 karakter",
      "Selebihnya bebas"
    ];

    const changePassword = async (formData) => {
      try {
        formData.preventDefault();
        if (newPassword.value == confirmPassword.value) {

          formData = {
            id_programmers: localStorage.getItem('id_programmers'),
            password: newPassword.value
          }

          const response = await axios.put(`${config.apiTarget}/api/programmers`, formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

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
            title: "Password baru harus sama",
          })
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
          title: error,
        })
      }
    }

    const resetForm = () => {
      currentPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
    }

    return {
      isCurrentPasswordVisible,
      isNewPasswordVisible,
      isConfirmPasswordVisible,
      currentPassword,
      newPassword,
      confirmPassword,
      passwordRequirements,
      changePassword,
    }
  }
}

</script>
