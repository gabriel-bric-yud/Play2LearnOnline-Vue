<template>
  <div id="config-container">
    <h1>Math Facts Practice</h1>
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
    <PlayButton @play-button-click="play" />
  </div>
</template>

<script>
import SelectInput from './SelectInput';
import PlayButton from './PlayButton';
export default {
  name: 'GameConfig',
  components: {
    SelectInput,
    PlayButton,
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
    };
  },
  methods: {
    play() {
      this.$router.push(
        '/play/' + encodeURIComponent(this.operation) + '/' + this.maxNumber
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
