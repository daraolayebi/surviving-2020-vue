<template>
    <header class="app-header">
        <div class="header-inner">
            <router-link to="/" class="for-desktop">
                <div class="app-name">
                    <vue-typed-js :showCursor="false" :strings="['Surviving 2020']">
                        <span class="typing"></span>
                    </vue-typed-js>
                </div>
            </router-link>
            <div class="mobile-menu-icon" @click="toggleMenu('.mobile-menu-list')">
                <img v-if="!mobileMenu" src="@/assets/images/menu.svg" alt="menu" class="mobile-menu">
                <img v-else src="@/assets/images/close.svg" alt="menu" class="mobile-menu">
            </div>

        </div>
        <div class="mobile-menu-list">
            <div class="app-name">
                <vue-typed-js :showCursor="false" :strings="['Surviving 2020']">
                    <span class="typing"></span>
                </vue-typed-js>
            </div>
            <li class="footer-link">
                <router-link to="/">Home</router-link>
            </li>
            <li class="footer-link">
                <span @click="showAboutContent">About Project</span>
            </li>
            <li class="footer-link">
                <router-link to="/submit-story">Share your story</router-link>
            </li>
            <li class="footer-link">
                <router-link to="/stories">Explore stories</router-link>
            </li>
        </div>
        <transition name="fade">
            <about v-if="showAbout" @close-about="closeAbout" />
        </transition>
    </header>
</template>

<script>
import About from "../views/About";
import { VueTypedJs } from "vue-typed-js";
export default {
  props: ["pause"],
  data() {
    return {
      showAbout: false,
      mobileMenu: false,
    };
  },
  components: {
    About,
    VueTypedJs,
  },
  computed: {
    isFormPage() {
      if (this.$route.path === "/submit-story") return true;
      else return false;
    },
    nextPage() {
      if (this.$route.path === "/") return "/submit";
      else if (this.$route.path === "/submit") return "/stories";
    },
  },
  watch: {
    $route() {
      let menu = document.querySelector(".mobile-menu-list");
      menu.classList.remove("show");
      this.mobileMenu = false;
    },
  },
  methods: {
    showAboutContent() {
      this.showAbout = true;
    },
    closeAbout() {
      this.showAbout = false;
      this.mobileMenu = false;
      let menu = document.querySelector(".mobile-menu-list");
      menu.classList.remove("show");
    },
    toggleMenu(el) {
      let menu = document.querySelector(el);
      menu.classList.toggle("show");
      this.mobileMenu = !this.mobileMenu;
    },
    updateBg(color) {
      let body = document.querySelector(".main-body");
      body.classList.add(color);
    },
    removeBg(color) {
      let body = document.querySelector(".main-body");
      body.classList.remove(color);
    },
  },
};
</script>
