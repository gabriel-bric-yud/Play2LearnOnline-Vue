<template>
   <div className = "game-container d-grid justify-content-center">
      <div class="row border-bottom" id="scoreboard">
        <div class="col px-3 text-left">
          <GameScore :score="score" />
        </div>
        <div class="col px-3 text-right">
          <GameTimer :timeLeft="timeLeft" />
        </div>
      </div>

      <div className = "row justify-content-center">
        <div class = 'd-grid align-items-center'>
          <LabelComp :text = "word" fontSize = "3rem" />
          <LabelComp  fontSize = "1.5rem" />
        </div>
      </div>

      <div className = "row justify-content-center m-2">
        <input type = "text" class = "form-control w-75" placeholder = "type here" v-model = "answer">
      </div>

      <div className = "d-grid justify-content-left">
        <ol className = "text-center">
        </ol>
      </div>
    </div>

</template>



<script>
import GameScore from './GameScore.vue';
import GameTimer from './GameTimer.vue';
import LabelComp from './LabelComp.vue';

export default {
  name: 'GamePlay',
  components: {
    GameScore,
    GameTimer,
    LabelComp
  },
  data: function () {
    return {
      input: '',
      answered: false,
      score: 0,
      gameLength: 60,
      timeLeft: 0,
      word: "",
      availableIndexes: [],
      currentList: [],
      currentAnswer: "",
      answers: [],
      anagrams: {
        5 : [
          [
            "abets",
            "baste",
            "betas",
            "beast",
            "beats"
          ],
          [
            "acres",
            "cares",
            "races",
            "scare"
          ],
          [
            "alert",
            "alter",
            "later"
          ],
          [
            "angel",
            "angle",
            "glean"
          ],
          [
            "baker",
            "brake",
            "break"
          ],
          [
            "bared",
            "beard",
            "bread",
            "debar"
          ],
          [
            "dater",
            "rated",
            "trade",
            "tread"
          ],
          [
            "below",
            "bowel",
            "elbow"
          ],
          [
            "caret",
            "cater",
            "crate",
            "trace",
            "react"
          ]
        ],
        6 : [
          [
            "arrest",
            "rarest",
            "raster",
            "raters",
            "starer"
          ],
          [
            "carets",
            "caters",
            "caster",
            "crates",
            "reacts",
            "recast",
            "traces"
          ],
          [
            "canter",
            "nectar",
            "recant",
            "trance"
          ],
          [
            "danger",
            "gander",
            "garden",
            "ranged"
          ],
          [
            "daters",
            "trades",
            "treads",
            "stared"
          ]
        ],
        7 : [
          [
            "allergy",
            "gallery",
            "largely",
            "regally"
          ],
          [
            "aspired",
            "despair",
            "diapers",
            "praised"
          ],
          [
            "claimed",
            "decimal",
            "declaim",
            "medical"
          ],
          [
            "dearths",
            "hardest",
            "hatreds",
            "threads",
            "trashed"
          ],
          [
            "detains",
            "instead",
            "sainted",
            "stained"
          ]
        ],
        8 : [
          [
            "parroted",
            "predator",
            "prorated",
            "teardrop"
          ],
          [
            "repaints",
            "painters",
            "pantries",
            "pertains"
          ],
          [
            "restrain",
            "retrains",
            "strainer",
            "terrains",
            "trainers"
          ],
          [
            "construe",
            "counters",
            "recounts",
            "trounces"
          ]
        ]
      }
    };
  },
  props: {
    wordlength: String,
  },
  methods: {
    config() {
      this.$router.push('/');
    },

    setIndexes() {
      let currentIndexes = []
      for (let i = 0; i < this.samesizeAnagrams.length; i++) {
        currentIndexes.push(i)
        console.log(i)
      }
      return currentIndexes
    },

    chooseAnagramList() {
      const randIndex = Math.floor(Math.random() * this.availableIndexes.length)
      this.availableIndexes.slice(randIndex, 1)
      return this.samesizeAnagrams[randIndex]
    },

    chooseWord() {
      const randIndex = Math.floor(Math.random() * this.currentList.length)
      return this.currentList[randIndex]
    },

    clear() {
      this.input = '';
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
      this.currentList = this.chooseAnagramList();
      this.word = this.chooseWord();
      this.input = '';
      this.answered = false;
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
      this.availableIndexes = this.setIndexes();
      this.currentList = this.chooseAnagramList();
      this.word = this.chooseWord();
    },
    handleKeyUp(e) {
      e.preventDefault(); // prevent the normal behavior of the key
      if (e.keyCode === 13) {
        // space/Enter
        this.clear();
      }

    },
  },
  mounted() {
    //this.availableIndexes = this.indexes;
    //this.newQuestion();
    this.startTimer();
    this.availableIndexes = this.setIndexes();
    this.currentList = this.chooseAnagramList();
    this.word = this.chooseWord();
  },
  computed: {
    samesizeAnagrams: function() {
      return this.anagrams[this.wordlength];
    },
  },
};
</script>

<style scoped>
#game-container {
  width: 380px;
}

button.number-button {
  border-radius: 0.25em;
  font-size: 3em;
  height: 2em;
  margin: 0.1em;
  text-align: center;
  width: 2em;
}

#clear-button {
  border-radius: 0.25em;
  font-size: 3em;
  height: 2em;
  margin: 0.1em;
  text-align: center;
  width: 4.2em;
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
  top: 56px;
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
  top: 56px;
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
