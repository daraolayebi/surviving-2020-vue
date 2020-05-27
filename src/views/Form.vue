<template>
    <div>
        <app-header />
        <div class="main-body" :style="{ background: `${backgroundColor}` }">
            <div class="inactive-overlay"></div>
            <div class="main-body-inner">
                <user-form @updated-phrase="updateBackground" />
            </div>
        </div>
        <app-footer />
    </div>
</template>

<script>
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import UserForm from "../components/UserForm";
export default {
  components: {
    AppHeader,
    AppFooter,
    UserForm,
  },
  data() {
    return {
      phraseId: "1",
    };
  },
  created() {
    this.aboutIsVisible = true;
  },
  computed: {
    backgroundColor() {
      if (this.phraseId == 1) return "#3c4561";
      else if (this.phraseId == 2) return "#A96767";
      else if (this.phraseId == 3) return "#9e8d5d";
      else if (this.phraseId == 4) return "#376055";
    },
  },
  methods: {
    // hideAboutContent() {
    //   let about = document.getElementById("about");
    //   about.classList.add("hidden");
    // },
    updateBackground(id) {
      this.phraseId = id;
    },
  },
};
</script>
    


