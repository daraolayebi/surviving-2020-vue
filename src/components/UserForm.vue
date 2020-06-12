<template>
    <form class="user-form" @submit.prevent="submitResponse">
        <template v-if="!loading">
            <div class="form-group">
                <div class="form-group-block" :class="{'error': nameError }">
                    <label>First Name</label>
                    <input type="text" aria-label="First Name" class="form-input" v-model="name" @focus="resetError" maxlength="20">
                    <small class="form-warning">* This field is compulsory</small>
                </div>
                <div class="form-group-block" :class="{'error': cityError }">
                    <label>City</label>
                    <input type="text" aria-label="City" class="form-input" v-model="city" @focus="resetError" maxlength="25">
                    <small class="form-warning">* This field is compulsory</small>
                </div>
            </div>
            <div>
                <span class="main-label-counter">{{selected.id}} / 4</span>
                <span class="main-label-arrow" @click="showPhraseOptions('.inactive-overlay', '.phrase-dropdown')"></span>
            </div>
            <div class="form-group main" :class="{'loading': loading}">
                <div class="main-label">
                    <li class="active">{{selected.message}} . . .</li>

                    <ul class="phrase-dropdown">
                        <li class="phrase-item" v-for="(phrase, key) in phraseListDisplay" :key="key" @click="updatePhrase(phrase, '.inactive-overlay', '.phrase-dropdown')">{{ phrase.message }} ...</li>
                    </ul>
                </div>
                <div class="form-group">
                    <input type="text" v-model="response" id="response" @keypress="showSubmitButton('.submit-button')" @keyup="showSubmitButton('.submit-button')" placeholder="Fill in this space with your response" class="main-input" maxlength="50">
                    <button type="submit" class="button submit-button" aria-label="Share" :disabled="loading">
                        <img src="@/assets/images/send.svg" alt="submit">
                    </button>
                </div>
                <small class="form-clause" v-if="response">* By submitting, you agree to have your data (your name, city and response) displayed on the responses page.</small>
                <small v-if="error" class="form-error">We are having some trouble submitting your response. Please try again.</small>
            </div>
        </template>
        <div v-if="loading">
            <img src="@/assets/images/loading.svg" alt="loading">
        </div>
    </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      city: "",
      selected: { id: 1, message: "My 2020 has been" },
      response: "",
      button: false,
      phrases: [
        { id: 1, message: "My 2020 has been" },
        { id: 2, message: "In this season, I have learnt" },
        { id: 3, message: "After the pandemic, I will" },
        { id: 4, message: "During self isolation, I" },
      ],
      loading: false,
      error: false,
      nameError: false,
      cityError: false,
    };
  },
  computed: {
    phraseListDisplay() {
      let list = [];
      this.phrases.forEach(phrase => {
        if (phrase.message !== this.selected.message) list.push(phrase);
      });
      return list;
    },
  },
  methods: {
    resetError() {
      this.nameError = false;
      this.cityError = false;
    },
    showSubmitButton(el) {
      let button = document.querySelector(el);
      if (this.response.length === 0) button.classList.remove("visible");
      else button.classList.add("visible");
    },
    showPhraseOptions(el, dropdown) {
      let list = document.querySelector(dropdown);
      list.classList.add("show");
      let body = document.querySelector(el);
      body.classList.add("show");
    },
    updatePhrase(phrase, el, dropdown) {
      this.response = "";
      this.selected = { id: phrase.id, message: phrase.message };
      let list = document.querySelector(dropdown);
      list.classList.remove("show");
      let body = document.querySelector(el);
      body.classList.remove("show");
      this.$emit("updated-phrase", phrase.id);
    },
    submitResponse() {
      if (this.name == "") return (this.nameError = true);
      if (this.city == "") return (this.cityError = true);
      else {
        let payload = {
          name: this.name,
          city: this.city,
          response: this.selected.message + " " + this.response,
        };
        this.nameError = false;
        this.cityError = false;
        this.error = false;
        this.loading = true;
        axios
          .post("https://surviving-2020.herokuapp.com/", payload)
          .then(res => {
            this.loading = false;
            this.name = "";
            this.city = "";
            this.response = "";
            this.selected = { id: 1, message: "My 2020 has been" };
            this.$emit("form-submitted");
          })
          .catch(err => {
            this.loading = false;
            this.error = true;
          });
      }
    },
  },
  destroyed() {
    //   this.submitted = false
    //   this.loading = false
  },
};
</script>
