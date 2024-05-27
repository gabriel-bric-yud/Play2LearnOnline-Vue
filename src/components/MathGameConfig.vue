<template>
  <div id="config-container">
    <GameHeader text = "Math Facts Practice" fontSize = "2.5rem" />
    <SelectInput
      :currentValue="operation"
      label="Operation"
      id="operation"
      v-model="operation"
      :options="operations"
      @input="(o) => (this.operation = o)"
    />
    <SelectInput
      :currentValue="maxNumber"
      label="Maximum Number"
      id="max-number"
      v-model="maxNumber"
      :options="numbers"
      @input="(m) => (this.maxNumber = m)"
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
import GameHeader from './GameHeader';

export default {
  name: 'GameConfig',
  components: {
    SelectInput,
    PlayButton,
    GameHeader
  },
  data: function () {
    return {
      operations: [
        ['Addition', '+'],
        ['Subtraction', '-'],
        ['Multiplication', 'x'],
        ['Division', '/'],
      ],
      operation: 'x',
      maxNumber: '10',
      description: [[0, "Choose Operation."], [1, "Choose Max Number."], [2, "Press Go."], [4, "How many problems can you solve in 30 seconds?"]]
    };
  },
  methods: {
    play() {
      this.$router.push(
        '/MathFactsGame/' + encodeURIComponent(this.operation) + '/' + this.maxNumber
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
