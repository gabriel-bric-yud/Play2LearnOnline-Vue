<template>
  <main id="main-container">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: 'MainContainer',
};
</script>

<style scoped>
#main-container {
  margin: auto;
  width: 380px;
}
</style>
