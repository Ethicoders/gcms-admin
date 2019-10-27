import ManageResource from './ManageResource.vue';
import gql from 'graphql-tag';
import { convertToGQLScalar } from '@/utils/graphql';
import Component from 'vue-class-component';

@Component
export default class UpdatePlugin extends ManageResource {
  public async created() {
    this.onInit();
  }
  protected async onInit() {
    const resourceName = 'Plugin';

    const name = this.$route.params.name;
    const resourceType = this.getTypeByName(resourceName);
    const resourceFields = resourceType.fields
      .filter((field) => field.name !== 'name')
      .map((field) => field.name)
      .join('\n');
    const response = await this.$apollo.query({
      fetchPolicy: 'no-cache',
      query: gql`
        {
          get${resourceName}(name: "${name}") {
            ${resourceFields}
          }
        }
      `,
    });

    this.resourceFields = resourceType.fields
      .filter((field) => field.name !== 'name')
      .map((field) => field.name);
    this.item = (response.data as any)['get' + resourceName];
  }

  protected async handleClickSubmit() {
    const name = this.$route.params.name;
    const resourceName = 'Plugin';
    const updatePayloadType = this.getTypeByName(resourceName + 'UpdatePayload');

    const resourceType = this.getTypeByName(resourceName);
    const resourceFields = resourceType.fields
      .filter((field) => field.name !== 'name')
      .map((field) => field.name);

    const resourceInput = resourceFields.map(
      (row) => `${row}: ${convertToGQLScalar(this.item[row])}`,
    );

    await this.$apollo.mutate({
      mutation: gql`
        mutation {
          update${resourceName}(input: {
            name: "${name}"
            ${resourceInput}
          }) {
            ${updatePayloadType.fields[0].name}  {
              ${resourceFields.join('\n')}
            }
          }
        }
      `,
    });

    this.$store.commit('app/notify', {
      message: 'Restart needed',
      onClick: () => {
        this.$router.push('/system');
      },
    });
  }

  protected getTypeByName(name: string) {
    return this.$store.state.app.schema.types.find((type: any) => type.name === name);
  }

  protected getFieldByName(fieldName: string) {
    const resourceName = 'Plugin';
    const resourceType = this.$store.state.app.schema.types.find(
      (type) => type.name === resourceName,
    );

    return resourceType.fields.find((field) => field.name === fieldName);
  }
}
