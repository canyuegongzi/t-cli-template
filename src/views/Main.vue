<template>
  <div id="main">
    <router-view />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {}
</script>

<style>
#main {
    height: 100%;
    width: 100%;
}
</style>
