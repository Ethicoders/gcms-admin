import ManageResource from './ManageResource.vue';
import { Component } from 'vue-property-decorator';
import gql from 'graphql-tag';
import FieldResolver from './fieldResolver';
import {
  getSortedFlattenedType,
  // getMutationFieldByName,
  getTypesFromInputType,
  flattenType,
  getTypeByName,
} from '@/utils/graphql';

@Component({
  components: {
    FieldResolver,
  },
})
export default class UpdateResource extends ManageResource {
  protected async onInit() {
    const resourceName = this.$route.params.resource;

    // const updateType = getMutationFieldByName('update' + resourceName);

    const id = this.$route.params.id;
    const resourceType = this.getCurrentResourceType();
    
    const resourceFields = resourceType.fields
      .filter((field) => field.name !== 'id')
      .map((field) => field.name)
      .join('\n');
    const response = await this.$apollo.query({
      fetchPolicy: 'no-cache',
      query: gql`
        {
          get${resourceName}(id: "${id}") {
            ${resourceFields}
          }
        }
      `,
    });

    this.resourceFields = resourceType.fields
      .filter((field) => field.name !== 'id')
      .map((field) => field.name);
    this.item = (response.data as any)['get' + resourceName];
  }

  protected async handleClickSubmit() {
    const id = this.$route.params.id;
    const resourceName = this.$route.params.resource;
    const updatePayloadType = getTypeByName(resourceName + 'UpdatePayload');

    const resourceType = this.getCurrentResourceType();
    const resourceFields = resourceType.fields
      .filter((field) => field.name !== 'id')
      .map((field) => field.name);

    const resourceInput = resourceFields.map(
      (row) => `${row}: "${this.item[row]}"`,
    );

    await this.$apollo.mutate({
      mutation: gql`
        mutation {
          update${resourceName}(input: {
            id: "${id}"
            ${resourceInput}
          }) {
            ${updatePayloadType.fields[0].name}  {
              ${resourceFields.join('\n')}
            }
          }
        }
      `,
    });
  }
}
