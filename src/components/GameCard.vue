<template>
  
  <div class = "gamecard border border-info m-1 d-grid card">
      <LabelComp :text = title :fontSize = fontSize />
      <p v-for="line in description" :key = "line[0]" class = "p-1">{{line[1]}}</p>
      <div class = "card-footer align-self-end mt-2 d-grid mx-0">
        <button class = "btn btn-success mx-0" @click = play() >Play now!</button>
      </div>
  </div>
</template>


<script>
import LabelComp from './LabelComp.vue'

export default {
  name: "GameCard",
  components: {
    LabelComp
  },

  props: {
    title: String,
    description: Array,
    fontSize: String,
    redirect: String
  },

  methods: {
    play() {
      this.$router.push(
        this.redirect
      );
    },
  },
}
</script>



<style>
  .gamecard {
    text-align: center;
    width: 50%;
  }

</style>
