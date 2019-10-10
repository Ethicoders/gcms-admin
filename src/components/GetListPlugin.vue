<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';
import GetListResource from './GetListResource.vue';

@Component
export default class GetListPlugin extends GetListResource {

  public async created() {
    const resourceName = 'Plugin';
    const resourceType = this.$store.state.schema.types.find(
      type => type.name === resourceName
    );

    const resourceFields = resourceType.fields
      .map(field => field.name)
      .join('\n');
    const response = await this.$apollo.query({
      fetchPolicy: 'no-cache',
      query: gql`
        {
          getListOf${resourceName} {
            ${resourceFields}
          }
        }
      `
    });
    this.resourceFields = resourceType.fields.map(field => field.name);
    this.list = (response.data as any)['getListOf' + resourceName];
    this.loading = false;
  }

  protected goToItem(row: any) {
    this.$router.push('Plugin/' + row['name'])
  }
}
</script>
