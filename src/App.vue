<template>
  <div>
    <HeaderNavBar />
    <LabelComp id = "Play2Learn" text = "Play2Learn" fontSize = "2em"></LabelComp>
    <MainContainer />
    <FooterBar />
  </div>
</template>

<script>
import HeaderNavBar from "./components/HeaderNavBar";
import MainContainer from "./components/MainContainer";
import FooterBar from "./components/FooterBar";
import LabelComp from "./components/LabelComp.vue";
export default {
  name: "App",
  components: {
    HeaderNavBar,
    LabelComp,
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