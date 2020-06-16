<template>
    <div class="success-wrapper">
        <div class="success-headings">
            <h1 data-title="A big thank you.">Thank you!<br></h1>
            <h1 data-title="Yours is now one of them!">We have received
                <span class="count">{{count.toLocaleString()}}</span> responses so far.</h1>
            <h1 data-title="Yours is now one of them!">Yours is now one of them!</h1>
        </div>

        <div class="share-wrapper">
            <span class="intro">Share this project:</span>
            <div class="share-channels">
                <div class="share-network">
                    <ShareNetwork network="twitter" url="https://www.our2020stories.com/#/" :title="`${userResponse}. Join me in sharing your story in a sentence with the rest of the world!`" description="" quote="" hashtags="surviving2020">
                        <img src="@/assets/images/twitter.svg" alt="twitter">
                        <span>Twitter</span>
                    </ShareNetwork>
                </div>
                <div class="share-network">
                    <ShareNetwork network="facebook" url="https://www.our2020stories.com/#/" :title="`${userResponse}. Join me in sharing your story in a sentence with the rest of the world!`" description="" quote="" hashtags="surviving2020">
                        <img src="@/assets/images/facebook.svg" alt="facebook" style="width:9px">
                        <span>Facebook</span>
                    </ShareNetwork>
                </div>

                <div class="share-network">
                    <ShareNetwork network="linkedin" url="https://www.our2020stories.com/#/" :title="`${userResponse}. Join me in sharing your story in a sentence with the rest of the world!`" description="" quote="" hashtags="surviving2020">
                        <img src="@/assets/images/linkedin.svg" alt="linkedin" style=" margin-top: -4px;">
                        <span>Linkedin</span>
                    </ShareNetwork>
                </div>
            </div>
        </div>
        <h1 data-title="Explore stories from the rest of the world" class="success-cta" @click="$router.push('/stories')">Explore stories from the rest of the world <img src="@/assets/images/arrow-navigation.svg" alt="arrow" class="success-arrow"></h1>
    </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["userResponse"],
  data() {
    return {
      count: 0,
    };
  },
  beforeMount() {
    this.getResponsesCount();
  },
  methods: {
    getResponsesCount() {
      axios
        .get("https://surviving-2020.herokuapp.com/count")
        .then(res => {
          this.count = res.data.data;
        })
        .catch(err => {
          this.error = true;
        });
    },
  },
  computed: {
    countMinusOne() {
      return this.count - 1;
    },
  },
};
</script>
