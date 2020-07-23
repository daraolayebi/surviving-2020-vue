<template>
    <div class="submit-story" :style="{ background: `${backgroundColor}` }">
        <div class="inactive-overlay"></div>
        <transition name="fade">
            <user-form @updated-phrase="updateBackground" @form-submitted="submissionSuccess" v-if="!formSubmitted" />
        </transition>
        <transition name="fade">
            <success v-if="formSubmitted" :user-response="userResponse" @refresh-form="formSubmitted = false" />
        </transition>
    </div>
</template>

<script>
import UserForm from "../components/UserForm";
import Success from "../views/Success";
export default {
  components: {
    UserForm,
    Success,
  },
  data() {
    return {
      phraseId: "0",
      formSubmitted: false,
      userResponse: "",
    };
  },
  created() {
    this.aboutIsVisible = true;
  },
  computed: {
    responses() {
      let all = this.$store.getters.responses;
      return all.slice(0, 10);
    },
    scrollSpeed() {
      return {
        type: "duration",
        number: 45000,
      };
    },
    backgroundColor() {
      if (this.phraseId == 0) return "#0b1c25";
      else if (this.phraseId == 1) return "#0c494c";
      else if (this.phraseId == 2) return "#134A69";
      else if (this.phraseId == 3)
        // "#497c88";
        return "#776079";
      else if (this.phraseId == 4) return "#344D68";
    },
  },
  methods: {
    submissionSuccess(response) {
      this.formSubmitted = true;
      this.phraseId = 5;
      this.userResponse = response;
    },
    updateBackground(id) {
      this.phraseId = id;
    },
  },
};
</script>
