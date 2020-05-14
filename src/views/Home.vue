<template>
    <div class="main-body" :style="{ background: `${backgroundColor}` }">
        <div class="main-body-inner">
            <user-form @updated-phrase="updateBackground" />
        </div>
    </div>
</template>

<script>
import UserForm from "../components/UserForm";
export default {
  components: {
    UserForm,
  },
  data() {
    return {
      phraseId: "1",
    };
  },
  computed: {
    backgroundColor() {
      if (this.phraseId == 1) return "#5C6996";
      else if (this.phraseId == 2) return "#A96767";
      else if (this.phraseId == 3) return "#C1AF7E";
      else if (this.phraseId == 4) return "#5C9688";
    },
  },
  methods: {
    updateBackground(id) {
      this.phraseId = id;
    },
  },
};
</script>
    


