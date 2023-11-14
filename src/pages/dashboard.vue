<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol cols="12" md="12">
      <AnalyticsCongratulations />
    </VCol>

    <VCol cols="12" sm="12">
      <VRow>
        <!-- 👉 Profit -->
        <VCol cols="12" md="3">
          <CardStatisticsVertical v-bind="{
            title: 'Projects',
            image: chart,
            stats: myProjectCount,
            to: '/projects'
          }" />
        </VCol>

        <!-- 👉 Sales -->
        <VCol cols="12" md="3">
          <CardStatisticsVertical v-bind="{
            title: 'Skills',
            image: wallet,
            stats: mySkillCount,
            to: '/skills-tools'
          }" />
        </VCol>
        <!-- 👉 Payments -->
        <VCol cols="12" sm="3">
          <CardStatisticsVertical v-bind="{
            title: 'Tools',
            image: paypal,
            stats: myToolCount,
            to: '/skills-tools'
          }" />
        </VCol>

        <!-- 👉 Revenue -->
        <VCol cols="12" sm="3">
          <CardStatisticsVertical v-bind="{
            title: 'Experience',
            image: card,
            stats: myExperienceCount,
            to: '/experience'
          }" />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
<script>
import config from "@/@core/config.vue";
import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";
import chart from "@images/cards/chart-success.png";
import card from "@images/cards/credit-card-primary.png";
import paypal from "@images/cards/paypal-error.png";
import wallet from "@images/cards/wallet-info.png";
import axios from "axios";

export default {
  components: {
    AnalyticsCongratulations,
  },
  data() {
    return {
      myProjectCount: 0,
      mySkillCount: 0,
      myToolCount: 0,
      myExperienceCount: 0,
      chart: chart,
      card: card,
      paypal: paypal,
      wallet: wallet,
    }
  },
  async created() {
    // Fetch mySkills data
    const mySkillResponse = await axios.get(`${config.apiTarget}/api/skills?id_programmers=${localStorage.getItem('id_programmers')}`);
    this.mySkillCount = mySkillResponse.data.length;

    // Fetch myTools data
    const myToolResponse = await axios.get(`${config.apiTarget}/api/tools?id_programmers=${localStorage.getItem('id_programmers')}`);
    this.myToolCount = myToolResponse.data.length;

    // Fetch myTools data
    const myProjectResponse = await axios.get(`${config.apiTarget}/api/projects?id_programmers=${localStorage.getItem('id_programmers')}`);
    this.myProjectCount = myProjectResponse.data.length;

    const myExperienceResponse = await axios.get(`${config.apiTarget}/api/experiences`);
    this.myExperienceCount = myExperienceResponse.data.length;
  }
}
</script>
