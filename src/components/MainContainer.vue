<template>
  <main id="main-container" class = "container-sm d-grid">
    <div class = "container-fluid justify-content-center d-flex">
      <router-view></router-view>
    </div>
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
  justify-content: center; 
  margin-bottom: 100px;
}

main div {
  max-width: 97vw;
}

</style>
