<template>
    <div>
        <footer class="footer">
            <ul>
                <li class="footer-link" @mouseover="updateBg('green')" @mouseleave="removeBg('green')">
                    <router-link to="/submit-story">Share your story</router-link>
                </li>
                <li class="footer-link">
                    <span @click="showAbout = true">About Project</span>
                </li>
                <li class="footer-link" @mouseover="updateBg('blue')" @mouseleave="removeBg('blue')">
                    <router-link to="/stories">Explore stories</router-link>
                </li>
            </ul>
        </footer>
        <transition name="fade">
            <about v-if="showAbout" @close-about="showAbout = false" />
        </transition>
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
    updateBg(color) {
      let home = document.querySelector(".home");
      home.classList.add(color);
    },
    removeBg(color) {
      let home = document.querySelector(".home");
      home.classList.remove(color);
    },
  },
};
</script>
