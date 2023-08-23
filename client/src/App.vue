<template>
  <Header />
  <main class="main">
    <router-view />
  </main>
</template>

<script setup>
import Header from './components/Header';
</script>

<style lang="scss">
body {
  background-color: #ededed;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background-color: lightblue;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: black;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px 20px 10px;
  @media only screen and (min-width: 1024px) {
    padding: 100px 20% 10px 20%;
  }
}
p {
  font-size: 16px;
}
</style>
