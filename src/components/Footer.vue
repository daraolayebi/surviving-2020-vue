<template>
    <footer class="footer">
        <ul>
            <li @click="showAboutContent('body', '.about')">About Project
                <!-- <router-link to="/about">About Project</router-link> -->
            </li>
            <li>Change Language</li>
        </ul>
    </footer>
</template>

<script>
export default {
  methods: {
    showAboutContent(body, about) {
      let el = document.querySelector(body);
      let ab = document.querySelector(about);
      el.classList.add("slide-out");
      ab.classList.add("visible");
    },
  },
  watch: {
    $route() {},
  },
};
</script>
