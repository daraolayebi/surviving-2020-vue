<template>
    <div id="app">
        <vue-page-transition>
            <router-view/>
        </vue-page-transition>
    </div>
</template>

<script>
import reset from "./assets/app.css";
export default {
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
