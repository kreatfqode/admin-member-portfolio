import config from "@/@core/config.vue";
import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";

const isAuthenticated = async () => {
  const url = `${config.apiTarget}/api/auth`;
  const token = 'Bearer ' + localStorage.getItem("authToken");

  if (token) {
    const headers = {
      Authorization: token,
    };

    try {
      const response = await axios.post(url, {}, { headers });
      const berhasil = response.status === 200;
      return berhasil;
    } catch (error) {
      localStorage.removeItem("authToken");
      console.error(error);
      return false;
    }
  } else {
    localStorage.removeItem("authToken");
    console.error("Auth Token tidak tersedia");
    return false;
  }
};

const requireAuth = async (to, from, next) => {
  if (!(await isAuthenticated())) {
    next("/login"); // Pengguna belum terautentikasi, alihkan ke halaman login.
  } else {
    next(); // Pengguna sudah terautentikasi, lanjutkan ke rute yang diminta.
  }
};

const requireGuest = async (to, from, next) => {
  if (await isAuthenticated()) {
    next("/dashboard"); // Pengguna belum terautentikasi, alihkan ke halaman login.
  } else {
    next(); // Pengguna sudah terautentikasi, lanjutkan ke rute yang diminta.
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL+config.deploymenBase),
  routes: [
    {path: "/", redirect:"/dashboard"},
    {
      path: "/",
      component: () => import("../layouts/default.vue"),
      beforeEnter: requireAuth,
      children: [
        {
          path: "dashboard",
          component: () => import("../pages/dashboard.vue"),
        },
        {
          path: "account-settings",
          component: () => import("../pages/account-settings.vue"),
        },
        {
          path: "projects",
          component: () => import("../pages/projects.vue"),
        },
        {
          path: "skills-tools",
          component: () => import("../pages/skills-tools.vue"),
        },
        {
          path: "experience",
          component: () => import("../pages/experience.vue"),
        },
        {
          path: "experience-create",
          component: () => import("../pages/experience-create.vue"),
        },
        {
          path: "message",
          component: () => import("../pages/message.vue"),
        },
        {
          path: "test",
          component: () => import("../pages/test.vue"),
        },
      ],
    },
    {
      path: "/",
      component: () => import("../layouts/blank.vue"),
      beforeEnter: requireGuest,
      children: [
        {
          path: "login",
          component: () => import("../pages/login.vue"),
        },
        {
          path: "register",
          component: () => import("../pages/register.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          component: () => import("../pages/[...all].vue"),
        },
      ],
    },
  ],
});

export default router;
