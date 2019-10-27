<template>
  <div class="get-list-resource">
    <q-table
      :data="list"
      :columns="getColumns()"
      selection="multiple"
      :selected.sync="selected"
      :loading="isLoading"
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
          :options="getColumns()"
          option-value="name"
          style="min-width: 150px"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width>
            <q-checkbox dense v-model="props.selected" />
          </q-th>
          <q-th v-for="column in getColumns()" :key="column.name">{{ column.label }}</q-th>
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
            <q-btn-dropdown split color="info" icon="edit" @click="goToItem(props.row)">
              <q-list>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon name="delete" color="negative" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Delete</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Mixins } from 'vue-property-decorator';
import gql from 'graphql-tag';
import Loading from '@/mixins/loading';

@Component
export default class GetListResource extends Mixins(Loading) {
  protected list: any[] = [];
  protected resourceFields = [];
  protected selected = [];
  protected visibleColumns = [];
  protected resourceName = '';
  // @AppModule.State('schema')
  // protected schema: any;

  protected async fetchData() {
    console.log(this.resourceName);

    const resourceType = this.$store.state.app.schema.types.find(
      type => type.name === this.resourceName
    );

    const resourceFields = resourceType.fields
      .map(field => field.name)
      .join('\n');
    const response = await this.$apollo.query({
      fetchPolicy: 'no-cache',
      query: gql`
        {
          getListOf${this.resourceName} {
            ${resourceFields}
          }
        }
      `
    });

    this.resourceFields = resourceType.fields.map(field => field.name);
    this.list = (response.data as any)['getListOf' + this.resourceName];
  }

  protected getColumns() {
    return this.resourceFields.map(resourceField => ({
      name: resourceField,
      required: true,
      label: this.$t(`resource${this.resourceName}.${resourceField}`),
      field: row => row[resourceField],
      // format: (val) => `${val}`,
      sortable: true
    }));
  }

  protected goToItem(row: any) {
    this.$router.push(this.resourceName + '/' + row['id']);
  }
}
</script>
