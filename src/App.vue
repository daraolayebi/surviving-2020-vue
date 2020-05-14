<template>
    <div id="app">
        <app-header />
        <router-view/>
        <app-footer />
    </div>
</template>

<script>
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";
import reset from "./assets/app.css";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
