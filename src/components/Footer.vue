<template>
    <footer class="footer">
        <ul>
            <template v-if="$route.path == '/'">
                <li class="footer-link" @mouseover="updateBg('green')" @mouseleave="removeBg('green')">
                    <router-link to="/submit">Share your story</router-link>
                </li>
                <li class="footer-link" @mouseover="updateBg('pink')" @mouseleave="removeBg('pink')">
                    <router-link to="/stories">Explore stories</router-link>
                </li>
            </template>
            <template v-if="$route.path == '/submit'">
                <li class="footer-link">
                    <router-link to="/">Go Back Home</router-link>
                </li>
                <li class="footer-link">
                    <router-link to="/stories">Explore stories</router-link>
                </li>
            </template>
            <template v-if="$route.path == '/stories'">
                <li v-if="$route.path == '/stories'" class="footer-link">
                    <router-link to="/submit">Share your story</router-link>
                </li>
                <li class="footer-link">
                    <router-link to="/">Go Back Home</router-link>
                </li>
            </template>
        </ul>
    </footer>
</template>

<script>
export default {
  methods: {
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
