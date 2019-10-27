import { Vue, Component } from 'vue-property-decorator';
import discover from '@/discover';
import { namespace } from 'vuex-class';

const AppModule = namespace('app');

@Component
export default class Discover extends Vue {
  @AppModule.Mutation('setSchema')
  public setSchema;

  protected async discover() {
    const schemaResponse = await this.$axios.post('/graphql', {
      query: discover,
    });
    return this.setSchema(schemaResponse.data.data.discover);
  }
}
