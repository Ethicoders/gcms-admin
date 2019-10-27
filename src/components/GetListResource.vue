<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import GetListAbstract from './GetListAbstract.vue';

@Component
export default class GetListResource extends GetListAbstract {
  public async created() {
    this.onResourceChange();
  }

  @Watch('$route.params.resource')
  protected onResourceChange() {
    this.list = [];
    this.resourceName = this.$route.params.resource;
    this.executeWhileLoading(() => this.fetchData());
  }
}
</script>
