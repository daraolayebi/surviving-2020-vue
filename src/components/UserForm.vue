<template>
    <form class="user-form" @submit.prevent="submitResponse">
        <div class="form-group">
            <input type="text" placeholder="Name" class="form-input" v-model="name" maxlength="30" required>
            <input type="text" placeholder="City" class="form-input" v-model="city" maxlength="30" required>
        </div>

        <div class="form-group main">
            <div class="main-label">
                <span class="main-label-counter">{{selected.id}} / 4</span>
                <li class="active" @click="showPhraseOptions('.inactive-overlay', '.phrase-dropdown')">{{selected.message}} . . .</li>
                <ul class="phrase-dropdown">
                    <li class="phrase-item" v-for="(phrase, key) in phraseListDisplay" :key="key" @click="updatePhrase(phrase, '.inactive-overlay', '.phrase-dropdown')">{{ phrase.message }} ...</li>
                </ul>
            </div>
            <div class="form-group">
                <input type="text" v-model="response" id="response" @focusin="showSubmitButton('.submit-button')" @keypress="showSubmitButton('.submit-button')" @keyup="checkCharacterLength('.submit-button')" placeholder="Fill in this space with your response" class="main-input" maxlength="50">
                <button type="submit" class="button submit-button" aria-label="Share" :disabled="loading">
                    <img src="@/assets/images/send.svg" alt="submit">
                </button>
            </div>
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
    // showAboutContent(about) {
    //   let aboutBody = document.getElementById(about);
    //   aboutBody.classList.remove("hidden");
    // },
    showSubmitButton(el) {
      let button = document.querySelector(el);
      button.classList.add("show");
    },
    hideSubmitButton(el) {
      if (this.response.length < 1) {
        let button = document.querySelector(el);
        button.classList.remove("show");
      }
    },
    checkCharacterLength(el) {
      let button = document.querySelector(el);
      if (!this.response) button.classList.remove("show");
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
      let payload = {
        name: this.name,
        city: this.city,
        response: this.selected.message + " " + this.response,
      };
      console.log(payload);
      this.error = false;
      this.loading = true;
      axios
        .post("http://localhost:3200/api/responses/submit", payload)
        .then(res => {
          this.loading = false;
          this.name = "";
          this.city = "";
          this.response = "";
          this.selected = { id: 1, message: "My 2020 has been" };
          console.log(res);
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
          console.log(err);
        });
    },
  },
};
</script>
