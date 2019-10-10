<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="../assets/logo.png">
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Home extends Vue {
  public async created() {
    console.log('in');
    
  }
}
</script>
