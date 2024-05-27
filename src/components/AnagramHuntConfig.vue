<template>
  <div id="config-container">
    <GameHeader text = "Anagram Hunt" fontSize = "2.5rem" />
    <SelectInput
      :currentValue= "wordlength"
      label="Word Length"
      id="wordlength"
      v-model="wordlength"
      :options="wordlengths"
      @input="(o) => (this.wordlength = o)"
    />
    <ol>
      <li v-for="line in description" :key = "line[0]">{{line[1]}}</li>
    </ol>
    <PlayButton @play-button-click="play" />
  </div>
</template>

<script>
import SelectInput from './SelectInput';
import PlayButton from './PlayButton';
import GameHeader from './GameHeader.vue';
export default {
  name: 'GameConfig',
  components: {
    SelectInput,
    PlayButton,
    GameHeader
  },
  data: function () {
    return {
      wordlengths: [
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"],
      ],
      wordlength: "5",
      description: [[0, "Choose Word Length"], [1, "Press Play!"], [2, "How many anagrams can you find in a minute?"]]
    };
  },
  methods: {
    play() {
      this.$router.push(
        '/AnagramHuntGame/' + encodeURIComponent(this.wordlength)
      );
    },
  },
  computed: {
    numbers: function () {
      const numbers = [];
      for (let number = 2; number <= 100; number++) {
        numbers.push([number, number]);
      }
      return numbers;
    },
  },
};
</script>