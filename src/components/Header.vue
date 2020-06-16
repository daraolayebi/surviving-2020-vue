<template>
    <header class="header">
        <div class="header-inner">
            <div>
                <img v-if="this.$route.path === '/'" src="@/assets/images/mobile-navigation-transparent.svg" class="mobile-menu left">
                <img v-else @click="$router.go(-1)" src="@/assets/images/mobile-navigation.svg" alt="go back" class="mobile-menu left">
            </div>
            <div class="app-left">
                <router-link to="/">
                    <div class="app-name">
                        <span>Surviving 2020</span>
                        <br>
                    </div>
                </router-link>
            </div>
            <img src="@/assets/images/mobile-navigation.svg" alt="go forward" v-if="this.$route.path !== '/stories'" @click="$router.push(nextPage)" class="mobile-menu right">
        </div>
    </header>
</template>

<script>
export default {
  computed: {
    nextPage() {
      if (this.$route.path === "/") return "/submit";
      else if (this.$route.path === "/submit") return "/stories";
    },
  },
};
</script>
