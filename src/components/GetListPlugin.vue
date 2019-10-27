<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';
import GetListAbstract from './GetListAbstract.vue';

@Component
export default class GetListPlugin extends GetListAbstract {
  protected resourceName = 'Plugin';

  public async created() {
    this.executeWhileLoading(() => this.fetchData());
  }

  protected goToItem(row: any) {
    this.$router.push(`${this.resourceName}/` + row['name']);
  }
}
</script>
