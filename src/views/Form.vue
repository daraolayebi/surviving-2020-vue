<template>
    <div>
        <app-header />
        <div class="main-body" :style="{ background: `${backgroundColor}` }">
            <div class="inactive-overlay"></div>
            <div class="main-body-inner">
                <user-form @updated-phrase="updateBackground" @form-submitted="submissionSuccess" v-if="!formSubmitted" />
                <transition name="success">
                    <success v-if="formSubmitted" :user-response="userResponse" />
                </transition>
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
      userResponse: "",
    };
  },
  created() {
    this.aboutIsVisible = true;
  },
  computed: {
    backgroundColor() {
      if (this.phraseId == 1) return "#3c4561";
      else if (this.phraseId == 2) return "#A96767";
      else if (this.phraseId == 3) return "#497c88";
      else if (this.phraseId == 4) return "#376055";
      else if (this.phraseId == 5) return "#0E2533";
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

<style scoped>
/* .fade-enter-active {
  transition: opacity 1.5s;
}
.fade-leave-active {
  opacity: 0;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
/* Success Styles */
.success-enter {
  transform: translateX(30px);
  opacity: 0;
}
.success-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.success-leave-active,
.success-leave-to {
  opacity: 0;
}
</style>
    


