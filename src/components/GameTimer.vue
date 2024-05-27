<template>
  <strong>Time: {{timeLeft}}</strong>
</template>

<script>
  export default {
    name: 'GameTimer',
    props: {
      timeLeft: Number
    }
  }
</script>