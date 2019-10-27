<template>
  <div class="q-pa-md">
    <div class="row" v-for="row in rowCount" :key="row">
      <div class="col-4 q-col-gutter-sm" v-for="(item, index) in itemCountInRow(row)" :key="index">
        <q-card>
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom">
              <div class="text-h6">{{ item.title }}</div>
              <div class="text-subtitle2">by John Doe</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat icon="arrow_downward" v-if="checkIfAlreadyInstalled(item)"></q-btn>
            <div v-else>Already installed</div>
            <!-- <q-btn flat icon=""></q-btn> -->
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import gql from 'graphql-tag';
import Loading from '@/mixins/loading';

@Component
export default class RemotePluginList extends Mixins(Loading) {
  private installedPlugins = [];
  private itemsPerRow = 3;

  private plugins: any[] = [];

  public created() {
    this.executeWhileLoading(async () =>
      Promise.all([this.fetchPlugins(), this.fetchInstalledPlugins()])
    );
  }

  private async fetchPlugins() {
    const promise: Promise<{ data: any[] }> = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: [
            {
              name: 'blog',
              title: 'Blog',
              image: '',
              link: '',
              description: 'Add a blog system to your website'
            },
            {
              name: 'seo',
              title: 'SEO',
              image: '',
              link: '',
              description: 'Improve your site SEO with tools and reports'
            }
          ]
        });
      }, 1000);
    });
    const response = await promise;
    this.plugins = response.data;
  }

  private async fetchInstalledPlugins() {
    const resourceName = 'Plugin';
    const resourceType = this.$store.state.app.schema.types.find(
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

    this.installedPlugins = response.data.getListOfPlugin;
  }

  private get rowCount() {
    return Math.ceil(this.plugins.length / this.itemsPerRow);
  }

  private itemCountInRow(index) {
    return this.plugins.slice(
      (index - 1) * this.itemsPerRow,
      index * this.itemsPerRow
    );
  }

  private checkIfAlreadyInstalled(item) {
    return !this.installedPlugins.find(plugin => plugin.name === item.name);
  }
}
</script>

<style lang="scss">
</style>