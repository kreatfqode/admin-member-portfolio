<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <VRow>
          <VCardText class="d-flex" cols="12" md="6">
            <!-- 👉 Avatar Profile -->
            <VAvatar rounded="lg" size="200" class="me-6" :image="accountDataLocal.foto_utama" />

            <!-- 👉 Upload Profile Photo -->
            <div class="d-flex flex-column justify-center gap-5">
              <div class="d-flex flex-wrap gap-2">
                <VBtn color="primary" @click="refInputElProfile?.click()">
                  <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                  <span class="d-none d-sm-block">Upload Profile Photo</span>
                </VBtn>

                <input ref="refInputElProfile" type="file" name="file" accept=".jpeg,.png,.jpg" hidden
                  @input="changeAvatar($event, 'foto_utama')" />

                <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar('foto_utama')">
                  <span class="d-none d-sm-block">Reset</span>
                  <VIcon icon="bx-refresh" class="d-sm-none" />
                </VBtn>
              </div>

              <p class="text-body-1 mb-0">
                Upload foto utama untuk ditampilkan
                <br />
                pada halaman web portfolio anda. Hanya
                <br />
                berlaku untuk foto dengan format JPG, PNG.
              </p>
            </div>
          </VCardText>

          <VCardText class="d-flex" cols="12" md="6">
            <!-- 👉 Avatar About -->
            <VAvatar rounded="lg" size="200" class="me-6" :image="accountDataLocal.foto_tentang" />

            <!-- 👉 Upload About Photo -->
            <div class="d-flex flex-column justify-center gap-5">
              <div class="d-flex flex-wrap gap-2">
                <VBtn color="primary" @click="refInputElAbout?.click()">
                  <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                  <span class="d-none d-sm-block">Upload About Photo</span>
                </VBtn>

                <input ref="refInputElAbout" type="file" name="file" accept=".jpeg,.png,.jpg" hidden
                  @input="changeAvatar($event, 'foto_tentang')" />

                <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar('foto_tentang')">
                  <span class="d-none d-sm-block">Reset</span>
                  <VIcon icon="bx-refresh" class="d-sm-none" />
                </VBtn>
              </div>

              <p class="text-body-1 mb-0">
                Upload foto kedua untuk ditampilkan
                <br />
                pada halaman web portfolio anda. Hanya
                <br />
                berlaku untuk foto dengan format JPG, PNG.
              </p>
            </div>
          </VCardText>

        </VRow>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6" @submit="updateDataProgrammer">
            <VRow>
              <!-- 👉 First Name -->

              <VCol md="2" cols="12">
                <VTextField v-model="accountDataLocal.warna_primary" placeholder="xyz@mail.com" label="Warna Primary"
                  type="color" />
              </VCol>

              <VCol md="2" cols="12">
                <VTextField v-model="accountDataLocal.warna_secondary" placeholder="xyz@mail.com" label="Warna Secondary"
                  type="color" />
              </VCol>

              <VCol md="8" cols="12">
                <VTextField v-model="accountDataLocal.email" placeholder="xyz@mail.com" label="Email" />
              </VCol>

              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.no_telp" placeholder="08xx" label="no telp" type="number" />
              </VCol>

              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.nama_panggilan" placeholder="nama panggilan.."
                  label="Nama Panggilan" />
              </VCol>

              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.nama_lengkap" placeholder="nama lengkap.." label="Nama Lengkap" />
              </VCol>

              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.pdf_cv" placeholder="pdf_cv" label="pdf_cv" />
              </VCol>

              <VCol md="12" cols="12">
                <VTextField v-model="accountDataLocal.tentang_diri" placeholder="Cerita singkat tetang anda.."
                  label="Tentang Diri" />
              </VCol>

              <VCol md="12" cols="12">
                <VTextField v-model="accountDataLocal.tentang_skill" placeholder="Cerita singkat keseluruhan skill.."
                  label="Tentang Skill" />
              </VCol>

              <VCol md="12" cols="12">
                <VTextField v-model="accountDataLocal.tentang_pengalaman"
                  placeholder="Cerita singkat keseluruhan pengalaman.." label="Tentang Pengalaman" />
              </VCol>

              <VCol md="12" cols="12">
                <VTextField v-model="accountDataLocal.tentang_project" placeholder="Cerita singkat keseluruhan project.."
                  label="Tentang Project" />
              </VCol>

              <VCol md="12" cols="12">
                <VTextField v-model="accountDataLocal.alamat" placeholder="alamat" label="Alamat" />
              </VCol>

              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.mulai_karir" label="Mulai Karir" type="date" />
              </VCol>

              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.moto_project"
                  placeholder="Beberapa kata mencerminkan anda sebagai developer.." label="Moto Developer" />
              </VCol>


              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit" :disabled="isLoading">
                  <VProgressCircular indeterminate color="white" v-if="isLoading"></VProgressCircular>
                  {{ isLoading ? "" : "Save change" }}
                </VBtn>

                <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Deactivate Account -->
      <VCard title="Deactivate Account">
        <VCardText>
          <div>
            <VCheckbox v-model="isAccountDeactivated" label="I confirm my account deactivation" />
          </div>

          <VBtn :disabled="!isAccountDeactivated" color="error" class="mt-3">
            Deactivate Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
<script>
import config from '@/@core/config.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted } from 'vue';


export default {
  setup() {
    const accountData = {
      email: localStorage.getItem("email"),
      warna_primary: "",
      warna_secondary: "",
      nama_panggilan: localStorage.getItem("nama_panggilan"),
      nama_lengkap: localStorage.getItem("nama_lengkap"),
      foto_utama: `${config.apiTarget}/${config.imagePath}/${localStorage.getItem("foto_utama")}`,
      foto_tentang: `${config.apiTarget}/${config.imagePath}/${localStorage.getItem("foto_tentang")}`,
      tentang_diri: localStorage.getItem("tentang_diri"),
      tentang_skill: localStorage.getItem("tentang_skill"),
      tentang_pengalaman: localStorage.getItem("tentang_pengalaman"),
      tentang_project: localStorage.getItem("tentang_project"),
      alamat: localStorage.getItem("alamat"),
      no_telp: localStorage.getItem("no_telp"),
      mulai_karir: localStorage.getItem("mulai_karir"),
      moto_project: localStorage.getItem("moto_project"),
      pdf_cv: localStorage.getItem("pdf_cv"),
    };

    const isLoading = ref(false);
    const refInputElProfile = ref();
    const refInputElAbout = ref();
    const accountDataLocal = ref(structuredClone(accountData));
    const isAccountDeactivated = ref(false);

    const resetForm = () => {
      accountDataLocal.value = structuredClone(accountData);
    };

    const changeAvatar = async (event, imgProp) => {
      if (event.target && event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = async () => {
          try {
            if (typeof fileReader.result === "string") {
              accountDataLocal.value[imgProp] = fileReader.result;
              let formData = {
                id_programmers: localStorage.getItem('id_programmers')
              };
              formData[imgProp] = fileReader.result;
              const response = await axios.put(`${config.apiTarget}/api/programmers`, formData, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });

              localStorage.setItem(imgProp, response.data.success.path);

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
        };
      }
    };

    // reset avatar image
    const resetAvatar = (imgProp) => {
      accountDataLocal.value[imgProp] = accountData[imgProp];
    };

    const updateDataProgrammer = async (formPersonalData) => {
      try {
        isLoading.value = true;

        formPersonalData.preventDefault();

        const warna_primary = hexToHSL(accountDataLocal.value.warna_primary);
        const warna_secondary = hexToHSL(accountDataLocal.value.warna_secondary);

        const formData = new FormData();
        formData.append('id_programmers', localStorage.getItem('id_programmers'));
        formData.append('email', accountDataLocal.value.email);
        formData.append('warna_primary', warna_primary);
        formData.append('warna_secondary', warna_secondary);
        formData.append('nama_panggilan', accountDataLocal.value.nama_panggilan);
        formData.append('nama_lengkap', accountDataLocal.value.nama_lengkap);
        formData.append('tentang_diri', accountDataLocal.value.tentang_diri);
        formData.append('tentang_skill', accountDataLocal.value.tentang_skill);
        formData.append('tentang_pengalaman', accountDataLocal.value.tentang_pengalaman);
        formData.append('tentang_project', accountDataLocal.value.tentang_project);
        formData.append('alamat', accountDataLocal.value.alamat);
        formData.append('no_telp', accountDataLocal.value.no_telp);
        formData.append('mulai_karir', accountDataLocal.value.mulai_karir);
        formData.append('moto_project', accountDataLocal.value.moto_project);
        formData.append('pdf_cv', accountDataLocal.value.pdf_cv);

        const response = await axios.put(`${config.apiTarget}/api/programmers`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status == 201) {
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

          localStorage.setItem('email', accountDataLocal.value.email);
          localStorage.setItem('warna_primary', warna_primary);
          localStorage.setItem('warna_secondary', warna_secondary);
          localStorage.setItem('nama_panggilan', accountDataLocal.value.nama_panggilan);
          localStorage.setItem('nama_lengkap', accountDataLocal.value.nama_lengkap);
          localStorage.setItem('tentang_diri', accountDataLocal.value.tentang_diri);
          localStorage.setItem('tentang_skill', accountDataLocal.value.tentang_skill);
          localStorage.setItem('tentang_pengalaman', accountDataLocal.value.tentang_pengalaman);
          localStorage.setItem('tentang_project', accountDataLocal.value.tentang_project);
          localStorage.setItem('alamat', accountDataLocal.value.alamat);
          localStorage.setItem('no_telp', accountDataLocal.value.no_telp);
          localStorage.setItem('mulai_karir', accountDataLocal.value.mulai_karir);
          localStorage.setItem('moto_project', accountDataLocal.value.moto_project);
          localStorage.setItem('pdf_cv', accountDataLocal.value.pdf_cv);

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
            title: response,
          })
          console.log(response);
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
          title: error,
        })
      }
    }

    const hexToHSL = (hex) => {
      // HSL values will be between 0 and 1
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;

      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);

      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      // Convert HSL values to percentages and return as an object
      return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
    }

    const hslToHex = (hsl) => {
      let h = hsl[0] / 360;
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;

      let r, g, b;
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    onMounted(async () => {
      accountDataLocal.value.warna_primary = await hslToHex(localStorage.getItem("warna_primary").replace(/%/g, '').split(',').map(str => parseInt(str)));
      accountData.warna_primary = accountDataLocal.value.warna_primary;

      accountDataLocal.value.warna_secondary = await hslToHex(localStorage.getItem("warna_secondary").replace(/%/g, '').split(',').map(str => parseInt(str)));
      accountData.warna_secondary = accountDataLocal.value.warna_secondary;
    })

    return {
      accountData,
      accountDataLocal,
      isAccountDeactivated,
      isLoading,
      resetForm,
      changeAvatar,
      resetAvatar,
      updateDataProgrammer,
      refInputElProfile,
      refInputElAbout
    }
  }
}
</script>
