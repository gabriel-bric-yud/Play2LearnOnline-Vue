<template>
  <GameCard title = "Anagram Hunt" redirect = "AnagramHuntConfig" fontSize = "2rem" :description = descriptionAnagrams></GameCard>
  <GameCard title = "Math Facts Practice" redirect = "MathFactsConfig" fontSize = "2rem" :description = descriptionMath></GameCard>
</template>

<script>
import GameCard from './GameCard.vue'

export default {
  name: "GameSelector",
  components: {
    GameCard
  },
  data: function () {
    return {
      descriptionAnagrams: [[0, "Do you Like Scrabble? Words with Friends?"], [1, "Improve how fast you can recognize anagrams in a word with this neat little game!"]],
      descriptionMath: [[0, "Imporve you mental math skills with this exciting game!"]]
    };
  },
}

</script>


<style>

</style>