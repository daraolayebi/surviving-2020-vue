<template>
    <div>
        <app-header />
        <div class="main-body" :style="{ background: `${backgroundColor}` }">
            <!-- <div class="circle-one" :style="{ background: `${backgroundColor}`, backgroundPosition: `${backgroundPosition}` }"></div>
            <div class="circle-two" :style="{ background: `${backgroundColor}`, backgroundPosition: `${backgroundPosition}` }"></div> -->
            <div class="inactive-overlay"></div>
            <div class="main-body-inner">
                <user-form @updated-phrase="updateBackground" @form-submitted="submissionSuccess" v-if="!formSubmitted" />
                <transition name="fade">
                    <success v-if="formSubmitted" :user-response="userResponse" />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { VueTypedJs } from "vue-typed-js";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import UserForm from "../components/UserForm";
import Success from "../views/Success";
import DynamicMarquee from "vue-dynamic-marquee";
export default {
  components: {
    VueTypedJs,
    AppHeader,
    AppFooter,
    UserForm,
    Success,
    DynamicMarquee,
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
      else if (this.phraseId == 1) return "#0b565a";
      else if (this.phraseId == 2) return "#497c88";
      else if (this.phraseId == 3) return "#776079";
      else if (this.phraseId == 4) return "#344D68";
    },
    // backgroundPosition() {
    //   if (this.phraseId == 1) return "100px 30px";
    //   else if (this.phraseId == 2) return "#884747";
    //   else if (this.phraseId == 3) return "#497c88";
    //   else if (this.phraseId == 4) return "#2D4134";
    //   else if (this.phraseId == 5) return "#0E2533";
    // },
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
.fade-enter-active {
  transition: opacity 1.5s;
}
.fade-leave-active {
  opacity: 0;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
    


