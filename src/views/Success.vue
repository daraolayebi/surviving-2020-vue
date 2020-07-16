<template>
    <div class="success-wrapper">
        <div class="success-headings">
            <h1 data-title="A big thank you.">Thank you for sharing your 2020 story!<br></h1>

            <!--<h1 data-title="Yours is now one of them!">We have received
                <span class="count">{{count.toLocaleString()}}</span> responses so far.</h1>
            <h1 data-title="Yours is now one of them!">Yours is now one of them!</h1>-->
            <h1 data-title="Explore stories from the rest of the world" class="success-cta" @click="$router.push('/stories')">Explore others from around the world <img src="@/assets/images/arrow-navigation.svg" alt="arrow" class="success-arrow"></h1>
        </div>

        <div class="share-wrapper">
            <span class="intro">Share this project:</span>
            <div class="share-channels">
                <div class="share-network">
                    <ShareNetwork network="twitter" url="https://www.our2020stories.com/#/" :title="`${userResponse}. Share your 2020 story in a sentence! And read stories from around the world!`" description="" quote="" hashtags="surviving2020">
                        <img src="@/assets/images/twitter.svg" alt="twitter">
                        <span>Twitter</span>
                    </ShareNetwork>
                </div>
                <div class="share-network">
                    <ShareNetwork network="facebook" url="https://www.our2020stories.com/#/" :title="`${userResponse}. Share your 2020 story in a sentence! And read stories from around the world!`" description="" quote="" hashtags="surviving2020">
                        <img src="@/assets/images/facebook.svg" alt="facebook" style="width:9px">
                        <span>Facebook</span>
                    </ShareNetwork>
                </div>

                <div class="share-network">
                    <a class="share-network-copy">
                        <button v-clipboard="value" v-clipboard:success="copySuccess" v-clipboard:error="copyError">
                            <img src="@/assets/images/copy.svg" alt="linkedin" style="width:19px;margin-top: -4px;">
                            <span>Copy Link</span>
                        </button>
                        <!-- <input type="text" :value="URLToCopy" id="copy-link" style="display:none">
                        <img src="@/assets/images/copy.svg" alt="linkedin" style="width:19px;margin-top: -4px;">
                        <span>Copy Link</span> -->
                    </a>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["userResponse"],
  data() {
    return {
      count: 0,
      value: "www.our2020stories.com",
    };
  },
  methods: {
    copySuccess({ value, event }) {
      console.log("success", value);
    },

    copyError({ value, event }) {
      console.log("error", value);
    },
  },
};
</script>
