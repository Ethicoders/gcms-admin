import { Vue, Component } from 'vue-property-decorator';

@Component
export default class StoreMutationHandler extends Vue {
  private unsubscribeFunctions: Array<() => void> = [];

  protected onStoreMutationEvent(type: string, callback: () => void) {
    this.unsubscribeFunctions.push(
      this.$store.subscribe((mutation, state) => {
        if (mutation.type !== type) {
          return;
        }
        callback();
      }),
    );
  }

  protected destroyed() {
    this.unsubscribeFunctions.forEach((unsubscribeFunction) => {
      unsubscribeFunction();
    });
  }
}
