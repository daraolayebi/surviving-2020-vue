<template>
    <div class="about-project">
        <div class="about-project-inner">
            <p class="close-about" @click="$emit('close-about')">
                <img src="@/assets/images/close.svg" alt="close" width="25">
            </p>
            <h1>About #Surviving2020</h1>
            <!-- <img src="@/assets/images/slideshow/4.jpeg" alt="" width="260"> -->
            <div class="about-project-text">
                <p>Surviving 2020 is a web project by
                    <a class="link" href="https://twitter.com/daraolayebi">Dara Olayebi</a> built to bring people together by connecting them during this very unusual year. With a few short starting phrases, each one carefully thought out, I invite you to express yourself by sharing your emotions, experiences and thoughts with other people around the world. <br><br>I hope that it brings you a little joy and a little peace knowing that you are not alone, and most importantly, we will survive this tough year together.</p>
                <small class="about-project-footnote">&copy; Dara Olayebi. 2020. Note: I do not own any of the
                    <span class="" @click="toggleSources">photographs</span> used.</small>
                <small v-if="showSources">In order of appearance: 1. Mark Blinch/The Canadian Press via AP / 2. 3. 4. Erik McGregor/Sipa USA / 6. CNN / 5. Hollie Adams 8. Bebeto Matthews/AP / 9. e / 10. </small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showSources: false,
    };
  },
  methods: {
    toggleSources() {
      this.showSources = !this.showSources;
    },
  },
};
</script>
