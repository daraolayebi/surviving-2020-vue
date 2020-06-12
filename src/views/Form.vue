<template>
    <div>
        <app-header />
        <div class="main-body" :style="{ background: `${backgroundColor}` }">
            <div class="inactive-overlay"></div>
            <div class="main-body-inner">
                <user-form @updated-phrase="updateBackground" @form-submitted="submissionSuccess" v-if="!formSubmitted" />
                <success v-if="formSubmitted" />
            </div>
        </div>
        <app-footer />
    </div>
</template>

<script>
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import UserForm from "../components/UserForm";
import Success from "../views/Success";
export default {
  components: {
    AppHeader,
    AppFooter,
    UserForm,
    Success,
  },
  data() {
    return {
      phraseId: "1",
      formSubmitted: false,
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
      else if (this.phraseId == 5) return "#0E2533";
    },
  },
  methods: {
    submissionSuccess() {
      this.formSubmitted = true;
      this.phraseId = 5;
    },
    updateBackground(id) {
      this.phraseId = id;
    },
  },
};
</script>
    


