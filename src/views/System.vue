<template>
  <q-page class="flex flex-center">
    <q-circular-progress
      v-if="isLoading"
      indeterminate
      color="primary"
    />
    <q-btn  @click="emitRestart" color="info">{{ 'Restart' }}</q-btn>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import gql from 'graphql-tag';
import Loading from '@/mixins/loading';
import Discover from '@/mixins/discover';

@Component
export default class System extends Mixins(Discover, Loading) {
  private async emitRestart() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'app/resurrectConnection') {
        this.discover();
        this.isLoading = false;
      }
    });

    this.isLoading = true;
    await this.$apollo.mutate({
      mutation: gql`
        mutation {
          restart
        }
      `
    });
  }
}
</script>

<style lang="stylus"></style>