<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class App extends Vue {
  private heartbeatInterval?: any;

  public created() {
    this.lookForHeartbeats();
  }

  private lookForHeartbeats() {
    const ws = new WebSocket('ws://localhost:4001');

    ws.onopen = ev => {
      this.$store.commit('app/resurrectConnection');
      console.log('Websocket open', ev);
      this.heartbeatInterval = setInterval(() => {
        ws.send('ping');
      }, 200);
    };

    ws.onerror = () => {
      clearInterval(this.heartbeatInterval);
      ws.close();
    };

    ws.onclose = () => {
      this.$store.commit('app/killConnection');
      clearInterval(this.heartbeatInterval);
      this.lookForHeartbeats();
    };
  }
}
</script>