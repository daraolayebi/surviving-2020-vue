<template>
    <div class="success-wrapper">
        <div class="success-headings">
            <h1>Here's to surviving 2020 together!</h1>
            <div class="success-cta">
                <h1 @click="$emit('refresh-form')">
                    <span class="animated-text">Share another story</span>
                    <img src="@/assets/images/plus.svg" alt="arrow" class="success-arrow">
                </h1>
                <h1 @click="goToStories">
                    <span class="animated-text">Explore other stories</span>
                    <img src="@/assets/images/arrow.svg" alt="arrow" class="success-arrow">
                </h1>
            </div>
        </div>

        <div class="share-wrapper">
            <span class="share-label">Share Project:</span>
            <div class="share-channels">
                <div class="share-network">
                    <ShareNetwork network="twitter" url="https://www.our2020stories.com/#/" title="Share your 2020 story in a sentence! And read stories from around the world!" description="" quote="" hashtags="surviving2020">
                        <img src="@/assets/images/twitter.svg" alt="twitter">
                        <span>Twitter</span>
                    </ShareNetwork>
                </div>
                <div class="share-network">
                    <ShareNetwork network="facebook" url="https://www.our2020stories.com/#/" title="Share your 2020 story in a sentence! And read stories from around the world!" description="" quote="" hashtags="surviving2020">
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
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
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
    goToStories() {
      this.$store.dispatch("FetchResponses");
      this.$router.push("/stories");
    },
  },
};
</script>
