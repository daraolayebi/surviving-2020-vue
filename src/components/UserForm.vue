<template>
    <div>
        <button v-if="selected.id" class="phrase-toggle" @click="showPhraseOptions('.inactive-overlay', '.phrase-dropdown')">
            <img src="@/assets/images/refresh.svg" alt="refresh" title="refresh" />
        </button>
        <div class="user-form">
            <form @submit.prevent="submitResponse" autocomplete="off">
                <input autocomplete="false" name="hidden" type="text" style="display:none;">
                <template v-if="!formLoading">
                    <transition name="fade">
                        <ul class="phrase-dropdown">
                            <li class="phrase-item" v-for="(phrase, key) in phraseListDisplay" :key="key" @click="updatePhrase(phrase, '.inactive-overlay', '.phrase-dropdown')">{{ phrase.message }}
                                <span class="phrase-dots">. . .</span>
                            </li>
                        </ul>
                    </transition>
                    <div class="form-body">
                        <div v-if="selected == 0" class="click-label">
                            <h1 class="animated-text" @click="showPhraseOptions('.inactive-overlay', '.phrase-dropdown')">Click to choose your starting phrase</h1>
                        </div>
                        <template v-else>
                            <div class="form-group-block" :class="{'error': nameError }">
                                <label>First Name:</label>
                                <input type="text" aria-label="First Name" class="form-input" placeholder="First Name" v-model="name" @focus="resetError" maxlength="20">
                                <small class="form-warning">* This field is mandatory</small>
                            </div>
                            <div class="form-group-block" :class="{'error': cityError }">
                                <label>City:</label>
                                <input type="text" aria-label="City" class="form-input" placeholder="City" v-model="city" @focus="resetError" maxlength="25">
                                <small class="form-warning">* This field is mandatory</small>
                            </div>
                            <div class="main-label">
                                <li class="active">{{selected.message}}
                                    <span class="phrase-dots">. . .</span>
                                </li>
                                <div class="main-label-toggle">
                                    <span @click="showPhraseOptions('.inactive-overlay', '.phrase-dropdown')">Switch</span>
                                    <span>{{selected.id}} / 4</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" v-model="response" id="response" @keypress="showSubmitButton('.submit-button', '.form-clause')" @keyup="showSubmitButton('.submit-button', '.form-clause')" @focus="showClause('.form-clause', '.submit-button')" @focusout="hideClause('.form-clause', '.submit-button')" placeholder="Your response goes here" class="main-input" maxlength="70" autocomplete="off">
                            </div>
                            <div class="form-footer">
                                <small class="form-clause">* Once you submit, your name, city and response will be displayed on the stories page.</small>
                                <button type="submit" class="button submit-button" aria-label="Submit" :disabled="formLoading">
                                    <span>Submit
                                        <img src="@/assets/images/arrow-navigation-white.svg" alt="" srcset="">
                                    </span>
                                </button>
                            </div>
                            <small v-if="formSubmitted == false" class="form-error">We are having some trouble submitting your response. Please try again.</small>
                        </template>
                    </div>
                </template>
                <div v-if="formLoading" class="submit-loading">
                    <img src="@/assets/images/loader.svg" alt="loading" width="26px">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      city: "",
      selected: "0",
      response: "",
      button: false,
      phrases: [
        { id: 1, message: "My 2020 has been" },
        { id: 2, message: "During self isolation, I" },
        { id: 3, message: "In this season, I have learnt" },
        { id: 4, message: "After the pandemic, I will" },
      ],
      phrasesVisible: false,
      nameError: false,
      cityError: false,
    };
  },
  created() {
    this.$store.commit("RESET_STATE");
  },
  computed: {
    formLoading() {
      return this.$store.getters.formLoading;
    },
    formSubmitted() {
      return this.$store.getters.formSubmitted;
    },
    phraseListDisplay() {
      let list = [];
      this.phrases.forEach(phrase => {
        list.push(phrase);
        //if (phrase.message !== this.selected.message) list.push(phrase);
      });
      return list;
    },
  },
  watch: {
    formSubmitted(value) {
      let response = this.selected.message + " " + this.response;
      if (value == true) this.$emit("form-submitted", response);
    },
  },
  methods: {
    showClause(clause, button) {
      let formClause = document.querySelector(clause);
      let formButton = document.querySelector(button);
      formClause.classList.add("show");
      formButton.classList.add("show");
    },
    hideClause(clause, button) {
      let formClause = document.querySelector(clause);
      let formButton = document.querySelector(button);
      if (this.response.length == "") {
        formClause.classList.remove("show");
        formButton.classList.remove("show");
      }
    },
    goToPrevious() {
      if (this.selected.id === 2) this.selected.id = 1;
      if (this.selected.id === 3) this.selected.id = 2;
      if (this.selected.id === 4) this.selected.id = 3;
    },
    goToNext() {
      if (this.selected.id === 1) this.selected.id = 2;
      if (this.selected.id === 2) this.selected.id = 3;
      if (this.selected.id === 3) this.selected.id = 4;
    },
    resetError() {
      this.nameError = false;
      this.cityError = false;
    },
    showSubmitButton(el, clause) {
      let formClause = document.querySelector(clause);
      let button = document.querySelector(el);
      if (this.response.length === 0) {
        button.classList.remove("show");
        formClause.classList.remove("show");
      } else {
        button.classList.add("show");
        formClause.classList.add("show");
      }
    },
    showPhraseOptions(el, dropdown) {
      let list = document.querySelector(dropdown);
      let body = document.querySelector(el);
      list.classList.add("show");
      body.classList.add("show");
      if (document.querySelector(".click-label")) {
        let clickPhrase = document.querySelector(".click-label");
        clickPhrase.classList.add("hide");
      }
      if (document.querySelector(".form-body")) {
        let formBody = document.querySelector(".form-body");
        formBody.classList.add("hidden");
      }
      this.phrasesVisible = true;
    },
    updatePhrase(phrase, el, dropdown) {
      this.response = "";
      this.nameError = false;
      this.cityError = false;
      this.selected = { id: phrase.id, message: phrase.message };
      let list = document.querySelector(dropdown);
      let body = document.querySelector(el);
      if (document.querySelector(".click-label")) {
        let clickPhrase = document.querySelector(".click-label");
        clickPhrase.classList.remove("hide");
      }
      if (document.querySelector(".form-body")) {
        let formBody = document.querySelector(".form-body");
        formBody.classList.remove("hidden");
      }
      list.classList.remove("show");
      body.classList.remove("show");
      this.phrasesVisible = false;
      this.$emit("updated-phrase", phrase.id);
    },
    submitResponse() {
      if (this.name == "") this.nameError = true;
      if (this.city == "") this.cityError = true;
      else {
        let payload = {
          name: this.name,
          city: this.city,
          response: this.selected.message + " " + this.response,
        };
        this.nameError = false;
        this.cityError = false;
        this.$store.dispatch("SubmitResponse", payload);
      }
    },
  },
  destroyed() {
    //   this.submitted = false
  },
};
</script>
