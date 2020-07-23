<template>
    <div id="app">
        <app-header />
        <vue-page-transition>
            <router-view/>
        </vue-page-transition>
    </div>
</template>

<script>
import AppHeader from "./components/Header";
import style from "./assets/app.scss";
export default {
  components: {
    AppHeader,
  },
  computed: {
    responses() {
      return this.$store.getters.responses;
    },
    count() {
      return this.$store.getters.count;
    },
  },
  created() {
    if (this.responses.length === 0) this.$store.dispatch("FetchResponses");
    //if (!this.count) this.$store.dispatch("FetchResponsesCount");
  },
};
</script>
