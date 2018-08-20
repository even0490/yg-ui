<template>
  <div id="app">
    <img src="./assets/logo.png">
    <yg-transition>
      <router-view/>
    </yg-transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
