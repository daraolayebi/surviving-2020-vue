<template>
    <div>
        <form class="user-form" @submit.prevent="submitResponse" autocomplete="off">
            <input autocomplete="false" name="hidden" type="text" style="display:none;">
            <template v-if="!loading">
                <div class="flex">
                    <div class="form-group">
                        <div class="form-group-block" :class="{'error': nameError }">
                            <label>Name:</label>
                            <input type="text" aria-label="First Name" class="form-input" placeholder="Name" v-model="name" @focus="resetError" maxlength="20">
                            <small class="form-warning">* This field is compulsory</small>
                        </div>
                        <div class="form-group-block" :class="{'error': cityError }">
                            <label>City:</label>
                            <input type="text" aria-label="City" class="form-input" placeholder="City" v-model="city" @focus="resetError" maxlength="25">
                            <small class="form-warning">* This field is compulsory</small>
                        </div>
                    </div>
                    <!-- <span class="main-label-counter">{{selected.id}} / 4</span> -->
                </div>

                <div class="form-group main" :class="{'loading': loading}">
                    <div class="main-label">
                        <span class="main-label-arrow" :class="{ 'paused' : phrasesVisible }" @click="showPhraseOptions('.inactive-overlay', '.phrase-dropdown')"></span>
                        <!-- <div class="phrase-navigation">
                        <div @click="goToPrevious" class="phrase-arrow" tabindex="0" role="button" aria-label="Previous slide">←</div> 

                         <div @click="goToNext" class="phrase-arrow" tabindex="0" role="button" aria-label="Next slide">→</div> 
                    </div> -->

                        <li class="active" @click="showPhraseOptions('.inactive-overlay', '.phrase-dropdown')">{{selected.message}}
                            <span class="phrase-dots">. . .</span>
                        </li>

                        <ul class="phrase-dropdown">
                            <li class="phrase-item" v-for="(phrase, key) in phraseListDisplay" :key="key" @click="updatePhrase(phrase, '.inactive-overlay', '.phrase-dropdown')">{{ phrase.message }}
                                <span class="phrase-dots">. . .</span>
                            </li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="response" id="response" @keypress="showSubmitButton('.submit-button', '.form-clause')" @keyup="showSubmitButton('.submit-button', '.form-clause')" @focus="showClause('.form-clause')" @focusout="hideClause('.form-clause')" placeholder="Your response goes here" class="main-input" maxlength="50" autocomplete="off">
                        <button type="submit" class="button submit-button for-desktop" aria-label="Share" :disabled="loading">
                            <!-- <img src="@/assets/images/send.svg" alt="submit"> -->
                            <span>Submit</span>
                        </button>
                        <button type="submit" class="button submit-button for-mobile" aria-label="Share" :disabled="loading">Share</button>
                    </div>
                    <small class="form-clause">* Once you submit, your name, city and response will be displayed on the stories page.</small>
                    <small v-if="error" class="form-error">We are having some trouble submitting your response. Please try again.</small>
                </div>
            </template>
            <div v-if="loading" class="submit-loading">
                <img src="@/assets/images/loading.svg" alt="loading">
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      slides: 4,
      active: 1,
      /* added */
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
      phrasesVisible: false,
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
    move(amount) {
      let newActive;
      const newIndex = this.active + amount;
      if (newIndex > this.slides) newActive = 1;
      if (newIndex === 0) newActive = this.slides;
      this.active = newActive || newIndex;
    },
    jump(index) {
      this.active = index;
    },
    addSlide() {
      this.slides = this.slides + 1;
    },
    removeSlide() {
      this.slides = this.slides - 1;
    },
    showClause(clause) {
      let formClause = document.querySelector(clause);
      formClause.classList.add("show");
    },
    hideClause(clause) {
      let formClause = document.querySelector(clause);
      if (this.response.length == "") formClause.classList.remove("show");
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
        button.classList.remove("visible");
        formClause.classList.remove("show");
      } else {
        button.classList.add("visible");
        formClause.classList.add("show");
      }
    },
    showPhraseOptions(el, dropdown) {
      let list = document.querySelector(dropdown);
      list.classList.add("show");
      let body = document.querySelector(el);
      body.classList.add("show");
      this.phrasesVisible = true;
    },
    updatePhrase(phrase, el, dropdown) {
      this.response = "";
      this.nameError = false;
      this.cityError = false;
      this.selected = { id: phrase.id, message: phrase.message };
      let list = document.querySelector(dropdown);
      list.classList.remove("show");
      let body = document.querySelector(el);
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
        this.error = false;
        this.loading = true;
        axios
          .post("https://surviving-2020.herokuapp.com/", payload)
          .then(res => {
            this.loading = false;
            this.name = "";
            this.city = "";
            let userResponse = this.selected.message + " " + this.response;
            this.$emit("form-submitted", userResponse);
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
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
