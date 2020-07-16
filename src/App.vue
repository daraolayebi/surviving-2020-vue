<template>
    <div id="app">
        <vue-page-transition>
            <router-view/>
        </vue-page-transition>
        <div class="app-footer">
            <!-- <div class="app-donation-link">
                <small>
                    <a href="https://www.linkedin.com/in/daraolayebi/" target="_blank" class="link">Click here</a> to donate to a cause.
                </small>
            </div> -->
            <!-- <div class="app-copyright-bar">
                <small>A project by
                    <a href="https://www.linkedin.com/in/daraolayebi/" target="_blank" class="link"> Dara Olayebi</a>. &copy; 2020.
                </small>
            </div> -->
        </div>
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
    if (!this.count) this.$store.dispatch("FetchResponsesCount");
  },
};
</script>
