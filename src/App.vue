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

.btn-success {
  background-color: #28a745!important;
  border: none !important;
}

.card-footer {
  background-color: rgba(0, 0, 0, .03) !important;
  border-top: 1px solid rgba(0, 0, 0, .125) !important;
}

.card-header {
  background-color: rgba(0, 0, 0, .03) !important;
  border-bottom: 1px solid rgba(0, 0, 0, .125) !important;
}

.form-control {
  appearance: auto !important;
  -webkit-appearance: auto !important;
  min-height: 2.4rem !important;
}
</style>