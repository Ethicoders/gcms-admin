<template>
  <div class="login">
    <q-form>
      <q-input v-model="consumer.login" />
      <q-input type="password" v-model="consumer.password" />
      <q-btn @click="onClickToLogin" />
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import Loading from '@/mixins/loading';
import gql from 'graphql-tag';

@Component
export default class Login extends Mixins(Loading) {
  private consumer = {
    login: 'test23',
    password: 'test'
  };

  private async onClickToLogin() {
    await this.executeWhileLoading(async () => {
      const response = await this.$apollo.mutate({
        mutation: gql`
          mutation {
            signIn(login: "${this.consumer.login}", password: "${this.consumer.password}") {
              token
            }
          }
        `
      });
      return this.$store.dispatch('login', response.data.signIn.token);
    });

    this.$router.push({ path: '/' });
  }
}
</script>

<style lang="stylus"></style>