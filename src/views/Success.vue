<template>
    <div class="success-wrapper">
        <div class="success-headings">
            <h1 data-title="A big thank you.">We have received
                <span class="count">{{count.toLocaleString()}}</span> responses so far.</h1>
            <br>
            <h1 data-title="Yours is now one of them!"> Yours is now one of them!</h1>
            <br>
            <h1 class="success-cta">Explore stories from the rest of the world <img src="@/assets/images/arrow-navigation.svg" alt="arrow" class="success-arrow"></h1>
        </div>

        <div class="share-wrapper">
            <span class="intro">Share this project:</span>
            <div class="share-channels">
                <div class="share-network">
                    <ShareNetwork network="twitter" url="https://www.our2020stories.com/#/" title="Explore Surviving 2020! A brand new, extremely fast development setup for Vue." description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You." quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="surviving2020">
                        <img src="@/assets/images/twitter.svg" alt="twitter">
                        <span>Twitter</span>
                    </ShareNetwork>
                </div>
                <div class="share-network">
                    <ShareNetwork network="facebook" url="https://www.our2020stories.com/#/" title="Say hi to Vite! A brand new, extremely fast development setup for Vue." description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You." quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="surviving2020">
                        <img src="@/assets/images/facebook.svg" alt="facebook" style="width:9px">
                        <span>Facebook</span>
                    </ShareNetwork>
                </div>

                <div class="share-network">
                    <ShareNetwork network="linkedin" url="https://www.our2020stories.com/#/" title="Say hi to Vite! A brand new, extremely fast development setup for Vue." description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You." quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="surviving2020">
                        <img src="@/assets/images/linkedin.svg" alt="linkedin" style=" margin-top: -4px;">
                        <span>Linkedin</span>
                    </ShareNetwork>
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
    responsesCount() {
      return "4,005";
    },
  },
};
</script>
