<template>
    <form class="user-form" @submit.prevent="submitResponse">
        <div class="form-group">
            <input type="text" placeholder="What's your name?" class="form-input" maxlength="50">
            <input type="text" placeholder="What city are you in?" class="form-input" maxlength="50">
        </div>
        <div class="form-group main">
            <small class="main-label-counter">{{selected}} / 4</small>
            <select class="main-label" v-model="selected" @click="showPhraseOptions('body')" @change="clearResponseAndUpdate('body')">
                <option v-for="(phrase, key) in phrases" :key="key" :value="phrase.id" :selected="phrase[key]">{{ phrase.message }} ...</option>
            </select>
            <input type="text" v-model="response" id="response" @focusin="showSubmitButton('.submit-button')" @keyup="checkCharacterLength('.submit-button')" @focusout="hideSubmitButton('.submit-button')" placeholder="Fill in this space with your thoughts" class="main-input" maxlength="50" autofocus>
        </div>
        <div class="button-holder">
            <button class="submit-button">Submit Response</button>
        </div>
    </form>
</template>

<script>
export default {
  data() {
    return {
      selected: "1",
      response: "",
      button: false,
      phrases: [
        { id: 1, message: "My 2020 has been" },
        { id: 2, message: "In this season, I have learnt" },
        { id: 3, message: "After the pandemic, I will" },
        { id: 4, message: "During self isolation, I" },
      ],
    };
  },
  //   created() {
  //     document.getElementById("response").focus();
  //   },
  methods: {
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
      button.classList.remove("show");
    },
    showPhraseOptions(el) {
      let body = document.querySelector(el);
      body.classList.add("faded");
    },
    clearResponseAndUpdate(el) {
      this.response = "";
      this.$emit("updated-phrase", this.selected);
      let body = document.querySelector(el);
      body.classList.remove("faded");
    },
    submitResponse() {},
  },
};
</script>
