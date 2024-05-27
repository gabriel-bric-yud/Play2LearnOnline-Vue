<template>
  <div id="game-container" class="text-center">
    <GameHeader text = "Math Facts Practice" fontSize = "2.5rem" />
    <LabelComp :text = "this.operationName" fontSize = "2rem" />
    <transition name="slide">
      <template v-if="timeLeft === 0">
        <div>
          <h2>Time's Up!</h2>
          <strong class="big">You Answered</strong>
          <div class="huge">{{ score }}</div>
          <strong class="big">Questions Correctly</strong>
          <button
            class="btn btn-success form-control m-1 w-75 mx-auto"
            v-on:click="restart()"
          >
            Play Again
          </button>
          <div class = "d-flex flex-fill justify-content-center">
            <button
              class="btn btn-secondary form-control m-1 w-50"
              v-on:click="changeSettings()"
            >
              Change Settings
            </button>
            <button
              class="btn btn-secondary form-control m-1 w-50 justify-self-end"
              v-on:click="config()"
            >
              Change Game
            </button>
          </div>
        </div>
      </template>
    </transition>
    <transition name="slide">
      <template v-if="timeLeft > 0">
        <div>
          <div class="row border-bottom" id="scoreboard">
            <div class="col px-3 text-left">
              <GameScore :score="score" />
            </div>
            <div class="col px-3 text-right">
              <GameTimer :timeLeft="timeLeft" />
            </div>
          </div>
          <div :class="equationClass" id="equation">
            <GameEquation
              :question="question"
              :answer="input"
              :answered="answered"
            />
          </div>
          <div class="row" id="buttons">
            <div class="col">
              <button
                class="btn btn-primary number-button"
                v-for="button in buttons"
                :key="button"
                @click="setInput(button)"
              >
                {{ button }}
              </button>
              <button class="btn btn-primary" id="clear-button" @click="clear">
                Clear
              </button>
            </div>
          </div>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
import GameScore from './GameScore';
import GameTimer from './GameTimer';
import GameEquation from './GameEquation';
import GameHeader from './GameHeader.vue';
import LabelComp from './LabelComp.vue';
import { randInt } from '../helpers/helpers';
export default {
  name: 'MathFactsGame',
  components: {
    GameScore,
    GameTimer,
    GameEquation,
    GameHeader,
    LabelComp
  },
  data: function () {
    return {
      buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      input: '',
      operands: { num1: '1', num2: '1' },
      answered: false,
      score: 0,
      gameLength: 2,
      timeLeft: -1,
    };
  },
  props: {
    operation: String,
    maxNumber: String,
  },
  methods: {
    config() {
      this.$router.push('/');
    },

    changeSettings() {
      this.$router.push('/MathFactsConfig');
    },

    setInput(value) {
      this.input += String(value);
      this.input = String(Number(this.input));
      this.answered = this.checkAnswer(
        this.input,
        this.operation,
        this.operands
      );
      if (this.answered) {
        setTimeout(this.newQuestion, 300);
        this.score++;
      }
    },
    clear() {
      this.input = '';
    },
    getRandNumbers(operator, low, high) {
      let num1 = randInt(low, high);
      let num2 = randInt(low, high);
      const numHigh = Math.max(num1, num2);
      const numLow = Math.min(num1, num2);

      if (operator === '-') {
        // Make sure higher num comes first
        num1 = numHigh;
        num2 = numLow;
      }

      if (operator === '/') {
        if (num2 === 0) {
          // No division by zero
          num2 = randInt(1, high);
        }
        num1 = num1 * num2;
      }
      return { num1, num2 };
    },
    checkAnswer(userAnswer, operation, operands) {
      if (isNaN(userAnswer)) return false; // User hasn't answered

      let correctAnswer;
      switch (operation) {
        case '+':
          correctAnswer = operands.num1 + operands.num2;
          break;
        case '-':
          correctAnswer = operands.num1 - operands.num2;
          break;
        case 'x':
          correctAnswer = operands.num1 * operands.num2;
          break;
        default: // division
          correctAnswer = operands.num1 / operands.num2;
      }
      return parseInt(userAnswer) === correctAnswer;
    },
    newQuestion() {
      this.input = '';
      this.answered = false;
      this.operands = this.getRandNumbers(this.operation, 0, this.maxNumber);
    },
    startTimer() {
      window.addEventListener('keyup', this.handleKeyUp);
      this.timeLeft = this.gameLength;
      if (this.timeLeft > 0) {
        this.timer = setInterval(() => {
          this.timeLeft--;
          if (this.timeLeft === 0) {
            clearInterval(this.timer);
            window.removeEventListener('keyup', this.handleKeyUp);
          }
        }, 1000);
      }
    },
    restart() {
      this.score = 0;
      this.startTimer();
      this.newQuestion();
    },
    handleKeyUp(e) {
      e.preventDefault(); // prevent the normal behavior of the key
      if (e.keyCode === 32 || e.keyCode === 13) {
        // space/Enter
        this.clear();
      } else if (e.keyCode === 8) {
        // backspace
        this.input = this.input.substring(0, this.input.length - 1);
      } else if (!isNaN(e.key)) {
        this.setInput(e.key);
      }
    },
  },
  mounted() {
    this.newQuestion();
    this.startTimer();
  },
  computed: {
    question: function () {
      const num1 = this.operands.num1;
      const num2 = this.operands.num2;
      const equation = `${num1} ${this.operation} ${num2}`;
      return equation;
    },
    equationClass: function () {
      if (this.answered) {
        return 'row text-primary my-2 fade';
      } else {
        return 'row text-secondary my-2';
      }
    },
    operationName: function () {
      let opp
      switch(this.operation) {
        case "+":
          opp = "ADDITION";
          break;
        case "/":
          opp = "DIVISION";
          break;
        case "-":
          opp = "SUBTRACTION";
          break;
        default:
          opp = "MULTIPLICATION" 
          break;
      }
      return opp
    }
  },
};
</script>
<style scoped>
#game-container {
  width: 380px;
}

button.number-button {
  border-radius: .25em;
  font-size: 2em;
  padding: 0px;
  height: 50px;
  margin: .1em;
  text-align: center;
  width: 100px;
}

#clear-button {
  border-radius: .25em;
  font-size: 2em;
  padding: 0px;
  height: 50px;
  margin: .1em;
  text-align: center;
  width: 200px;
}

#scoreboard {
  font-size: 1.5em;
}

.big {
  font-size: 1.5em;
}

.huge {
  font-size: 5em;
}

.slide-leave-active,
.slide-enter-active {
  position: absolute;
  top: 253px;
  transition: 1s;
  width: 380px;
}

.slide-enter-from {
  transform: translate(-100%, 0);
  transition: opacity 0.5s;
}

.slide-leave-to {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-right-leave-active,
.slide-right-enter-active {
  position: absolute;
  top: 253px;
  transition: 1s;
  width: 380px;
}

.slide-right-enter-from {
  transform: translate(100%, 0);
  transition: opacity 0.5s;
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate(-100%, 0);
}
</style>
