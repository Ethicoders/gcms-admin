<template>
  <q-page class="flex flex-center">
    <q-btn @click="emitRestart" color="info">{{ 'Restart' }}</q-btn>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import gql from 'graphql-tag';
import Loading from '@/mixins/loading';

@Component
export default class System extends Mixins(Loading) {
  private async emitRestart() {
    await this.executeWhileLoading(async () =>
      this.$apollo.mutate({
        mutation: gql`
          mutation {
            restart
          }
        `
      })
    );
    // Refetch discover
  }
}
</script>

<style lang="stylus"></style>