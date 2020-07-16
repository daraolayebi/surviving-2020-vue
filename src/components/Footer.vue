<template>

    <div>
        <transition name="fade">
            <about v-if="showAbout" @close-about="showAbout = false" />
        </transition>
        <footer class="footer">
            <ul>
                <template v-if="$route.path == '/'">
                    <li class="footer-link" @mouseover="updateBg('green')" @mouseleave="removeBg('green')">
                        <router-link to="/submit-story">Share your story</router-link>
                    </li>
                    <li class="footer-link">
                        <span @click="showAboutContent">About Project</span>
                    </li>
                    <li class="footer-link" @mouseover="updateBg('pink')" @mouseleave="removeBg('pink')">
                        <router-link to="/stories">Explore stories</router-link>
                    </li>
                </template>
                <template v-if="$route.path == '/submit-story'">
                    <li class="footer-link">
                        <router-link to="/">Go Back Home</router-link>
                    </li>
                    <li class="footer-link">
                        <router-link to="/stories">Explore stories</router-link>
                    </li>
                </template>
                <template v-if="$route.path == '/stories'">
                    <li v-if="$route.path == '/stories'" class="footer-link">
                        <router-link to="/submit-story">Share your story</router-link>
                    </li>
                    <li class="footer-link">
                        <router-link to="/">Go Back Home</router-link>
                    </li>
                </template>
            </ul>
        </footer>
    </div>
</template>

<script>
import About from "../views/About";
export default {
  components: {
    About,
  },
  data() {
    return {
      showAbout: false,
    };
  },
  methods: {
    showAboutContent() {
      this.showAbout = true;
    },
    updateBg(color) {
      let about = document.querySelector(".about");
      about.classList.add(color);
    },
    removeBg(color) {
      let about = document.querySelector(".about");
      about.classList.remove(color);
    },
  },
};
</script>
