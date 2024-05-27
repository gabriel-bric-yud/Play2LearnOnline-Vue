<template>
  <div class="row mx-1 my-3 mx-auto">
    <button class="form-control btn btn-success" @click="$emit('play-button-click')">
      Play!
    </button>
  </div>
</template>

<script>
  export default {
    name: 'PlayButton'
  }
</script>