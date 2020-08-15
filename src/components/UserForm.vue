<template>
    <div class="story-form">
        <button v-if="selected.id" class="phrase-toggle" @click="showPhraseOptions('body')">
            <img src="@/assets/images/refresh-sharp.svg" alt="refresh" title="refresh" />
            <!-- reset -->
        </button>
        <div class="story-form-container">
            <template v-if="!formLoading">
                <transition name="fade">
                    <ul class="phrase-dropdown">
                        <li class="phrase-item" v-for="(phrase, key) in phraseListDisplay" :key="key" @click="updatePhrase('body', phrase)">{{ phrase.message }}
                            <span class="phrase-dots">. . .</span>
                        </li>
                    </ul>
                </transition>
                <form @submit.prevent="submitResponse" autocomplete="off">
                    <input autocomplete="false" name="hidden" type="text" style="display:none;">

                    <div class="form-body">
                        <div v-if="selected == 0" class="click-label">
                            <h1 class="animated-text" @click="showPhraseOptions('body')">Click to choose your starting phrase</h1>
                        </div>
                        <template v-else>
                            <div class="form-group-block" :class="{'error': nameError }">
                                <label>First Name:</label>
                                <input type="text" aria-label="First Name" name="First Name" class="form-input" placeholder="First Name" v-model="name" @focus="resetError" maxlength="20">
                                <small class="form-warning">* This field is mandatory</small>
                            </div>
                            <div class="form-group-block" :class="{'error': cityError }">
                                <label>City:</label>
                                <input type="text" aria-label="City" name="City" class="form-input" placeholder="City" v-model="city" @focus="resetError" maxlength="25">
                                <small class="form-warning">* This field is mandatory</small>
                            </div>
                            <div class="main-label">
                                <div>{{selected.message}}
                                    <span class="phrase-dots">. . .</span>
                                </div>
                                <div class="main-label-toggle">
                                    <p class="phrase-switch" @click="showPhraseOptions('body')">Change Story</p>
                                    <!-- <p class="phrase-number">{{selected.id}} / 4</p> -->
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" v-model="response" id="response" @keypress="showSubmitButton('.submit-button', '.form-clause')" @keyup="showSubmitButton('.submit-button', '.form-clause')" @focus="showClause('.form-clause', '.submit-button')" @focusout="hideClause('.form-clause', '.submit-button')" placeholder="Your response goes here" class="main-input" maxlength="70" autocomplete="off" required>
                            </div>
                            <div class="form-footer">
                                <small class="form-clause">* Once you submit, your name, city and response will be displayed on the stories page.</small>
                            </div>
                            <small v-if="formSubmitted == false" class="form-error">We are having some trouble submitting your response. Please try again.</small>
                            <div class="form-button">
                                <button type="submit" class="button submit-button" aria-label="Submit" :disabled="formLoading">
                                    <span>Submit
                                        <img src="@/assets/images/arrow-navigation-white.svg" alt="" srcset="">
                                    </span>
                                </button>
                            </div>
                        </template>
                    </div>
                </form>
            </template>
            <div v-if="formLoading" class="loader-icon">
                <span class="saving">Saving your story
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </div>
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
      this.phrases.forEach(phrase => list.push(phrase));
      return list;
    },
  },
  watch: {
    formSubmitted(value) {
      let lowercaseResponse =
        this.response.charAt(0).toLowerCase() + this.response.slice(1);
      let response = this.selected.message + " " + this.lowercaseResponse;
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
    showPhraseOptions(body) {
      let appBody = document.querySelector(body);
      appBody.classList.add("has-phrases");
    },
    updatePhrase(body, phrase) {
      this.response = "";
      this.nameError = false;
      this.cityError = false;
      this.selected = { id: phrase.id, message: phrase.message };
      let appBody = document.querySelector(body);
      appBody.classList.remove("has-phrases");
      this.$emit("updated-phrase", phrase.id);
    },
    submitResponse() {
      if (this.name == "") this.nameError = true;
      if (this.city == "") this.cityError = true;
      else {
        let response =
          this.response.charAt(0).toLowerCase() + this.response.slice(1);
        let payload = {
          name: this.name,
          city: this.city,
          response: this.selected.message + " " + response,
        };
        this.nameError = false;
        this.cityError = false;
        this.$store.dispatch("SubmitResponse", payload);
      }
    },
  },
};
</script>
