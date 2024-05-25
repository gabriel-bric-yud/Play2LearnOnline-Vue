<template>
  <div>
    <HeaderNavBar />
    <MainContainer />
    <FooterBar />
  </div>
</template>

<script>
import HeaderNavBar from "./components/HeaderNavBar";
import MainContainer from "./components/MainContainer";
import FooterBar from "./components/FooterBar";
export default {
  name: "App",
  components: {
    HeaderNavBar,
    MainContainer,
    FooterBar,
  },
};
</script>

<style>
footer,
header {
  background-color: #3f7cad;
}
#app {
  overflow-x: hidden;
}
</style>