<template>
  <div :id = id class = "label container-sm justify-content-center d-grid p-2">
      <h2>{{text}}</h2>
  </div>

</template>

<script>
export default {
  name: "LabelComp",
  props: {
    id: String,
    text: String,
    fontSize: String,
  },
}

</script>


<style scoped>

h2 {
  font-size: v-bind(fontSize);
}


</style>