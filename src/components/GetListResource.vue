<template>
  <div class="get-list-resource">
    <q-table
      :data="list"
      :columns="columns"
      selection="multiple"
      :selected.sync="selected"
      :loading="loading"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top="props">
        <q-select
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width>
            <q-checkbox dense v-model="props.selected" />
          </q-th>
          <q-th v-for="column in columns" :key="column.name">{{ column.label }}</q-th>
          <q-th>{{ $t('list.actions') }}</q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-checkbox dense v-model="props.selected" />
          </q-td>
          <q-td
            
            v-for="resourceField in resourceFields"
            :key="resourceField"
            :props="props"
          >{{ props.row[resourceField] }}</q-td>
          <q-td>
            <q-btn
              @click="goToItem(props.row)"
              dense
              color="primary"
              icon="edit"
            />
            <q-btn dense color="negative" icon="delete" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component
export default class GetListResource extends Vue {
  protected list: any[] = [];
  protected resourceFields = [];
  protected selected = [];
  protected loading = true;
  protected visibleColumns = [];

  public async created() {
    const resourceName = this.$route.params.resource;
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

  protected get columns() {
    return this.resourceFields.map(resourceField => ({
      name: resourceField,
      required: true,
      label: this.$t(`resource${this.$route.params.resource}.${resourceField}`),
      field: row => row[resourceField],
      // format: (val) => `${val}`,
      sortable: true
    }));
  }

  protected goToItem(row: any) {
    this.$router.push(this.$route.params.resource + '/' + row['id'])
  }
}
</script>
