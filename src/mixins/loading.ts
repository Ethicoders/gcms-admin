import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  protected isLoading = false;

  protected async executeWhileLoading(callback) {
    this.isLoading = true;
    const result = await callback();
    this.isLoading = false;
    return result;
  }
}
