<template>
  <div id = "game-container" class = "d-grid border-info">
    <GameHeader text = "Anagram Hunt" fontSize = "2.5rem" />
    <Transition name="fade">
      <template v-if="timeLeft === 0 || this.gameEnd">
        <div class = "d-grid justify-content-center endscreen">
          <h2 v-if="timeLeft === 0" class = "text-center">Time's Up!</h2>
          <h2 v-else class = "text-center">Anagrams Completed!</h2>
          <strong class="big text-center mx-0">You got</strong>
          <div class="huge text-center">{{ score }}</div>
          <strong class="big text-center">Anagrams</strong>

          <button
            class="btn btn-success form-control my-1 w-75 mx-auto justify-self-center"
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
    </Transition>
    <Transition name = "fade">
      <template v-if="timeLeft > 0">
        <div class = "border-info">
          
          <div class="row border-bottom d-flex" id="scoreboard">
            <div class="col">
              <GameScore :score="score" />
            </div>
            <div class="col d-grid justify-content-end">
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
            <input type = "text" class = "form-control w-75" placeholder = "type here" v-model = "currentAnswer">
          </div>

          <div className = "d-grid justify-content-left">
            <ol className = "text-center">
              <li v-for="answer of answerList" :key = "answer">{{ answer }}</li>
            </ol>
          </div>
        </div>
        
      </template>
    </Transition>
  </div>
</template>


<script>
import GameScore from './GameScore.vue';
import GameTimer from './GameTimer.vue';
import LabelComp from './LabelComp.vue';
import GameHeader from './GameHeader.vue';

export default {
  name: 'GamePlay',
  components: {
    GameScore,
    GameTimer,
    LabelComp,
    GameHeader
  },
  data: function () {
    return {
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
      },
      answered: false,
      score: 0,
      gameLength: 60,
      timeLeft: -1,
      word: "",
      availableIndexes: [],
      currentAnagramData: {},
      currentList: [],
      currentAnswer: "",
      answerList: [],
      gameEnd: false,
    };
  },

  props: {
    wordlength: String,
  },

  methods: {
    config() {
      this.$router.push('/');
    },

    changeSettings() {
      this.$router.push('/AnagramHuntConfig');
    },

    setIndexes() {
      let currentIndexes = []
      for (let i = 0; i < this.samesizeAnagrams.length; i++) {
        currentIndexes.push(i)
      }
      return currentIndexes
    },

    chooseAnagramList() {
      const randIndex = Math.floor(Math.random() * this.availableIndexes.length)
      return {list: this.samesizeAnagrams[this.availableIndexes[randIndex]], index: randIndex}
    },

    chooseWord() {
      const randIndex = Math.floor(Math.random() * this.currentList.length)
      return this.currentList[randIndex]
    },
    
    checkAnswer() {
      if (this.currentAnswer.length == 0 || this.currentAnswer == this.word) return false; // User hasn't answered
      for (const elem of this.currentList) {
        if (elem.toUpperCase() == this.currentAnswer.toUpperCase()) {
          this.score++
          this.answered = true;
          this.answerList.push(this.currentAnswer);
          this.currentList.splice(this.currentList.indexOf(elem), 1);

          this.currentAnswer = "";
        }
      }

      if (this.currentList.length == 1) {
        this.newQuestion();
      }
    },

    newQuestion() {
      if (this.availableIndexes.length != 0) {
        this.currentAnagramData = this.chooseAnagramList()
        this.currentList = this.currentAnagramData.list;
        this.availableIndexes.splice(this.currentAnagramData.index, 1)
        this.word = this.chooseWord();
        this.answer = "";
        this.answered = false;
      }
      else {
        this.timeLeft = -1;
        this.gameEnd = true;
      }
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
      this.newQuestion();

    },
    handleKeyUp(e) {
      e.preventDefault();
      if (e.keyCode === 13) {
        this.checkAnswer();
      }

    },
  },

  mounted() {
    this.startTimer();
    this.availableIndexes = this.setIndexes();
    this.newQuestion();
  },

  computed: {
    samesizeAnagrams: function() {
      return this.anagrams[this.wordlength];
    },
  },
};
</script>

<style scoped>
#game-container, .endscreen {
  width: 380px;
  max-width: 98vw;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
