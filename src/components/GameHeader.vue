<template>
    <div class = "card-header">
      <LabelComp :text = "this.text" :fontSize = "this.fontSize"></LabelComp>
    </div>
</template>

<script>

import LabelComp from './LabelComp.vue'

export default {
  name: "GameHeader",
  components: {
    LabelComp
  },
  props: {
    text: String,
    fontSize: String
  }
}

</script>