<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>Quasar App</q-toolbar-title>

        <div>
          <q-btn dense color="purple" round icon="notifications" class="q-ml-md">
            <q-badge color="red" floating>{{ $store.state.app.notifications.length }}</q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  v-for="(notification, index) in $store.state.app.notifications"
                  :key="index"
                  clickable
                  @click="notification.onClick"
                >
                  <q-item-section>{{ notification.message }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <div v-for="(resource, key) in resources" :key="key">
          <q-expansion-item expand-separator icon="folder" :label="key">
            <q-item
              v-for="(field, action) in getDisplayableActionsInMenu(resource)"
              :key="action"
              clickable
              @click="$router.push(`/${key}`)"
            >
              <q-item-section>
                <q-item-label>{{ $t(`resource${key}.${action}`) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </div>

        <q-item to="/Plugin/install">
          <q-item-section>
            <q-item-label>Install plugin</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/system" exact>
          <q-item-section avatar>
            <q-icon name="settings_applications" />
          </q-item-section>
          <q-item-section>
            <q-item-label>System</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
import StoreMutationHandler from '@/mixins/storeMutation';
import { AppModule } from '@/utils/vuex';
@Component
export default class LayoutDefault extends Mixins(StoreMutationHandler) {
  private leftDrawerOpen = this.$q.platform.is.desktop;

  private resources = {};

  @AppModule.State('schema')
  private schema;

  public async mounted() {
    this.initializeFromSchema();
    this.onStoreMutationEvent('app/setSchema', this.initializeFromSchema);
  }

  private initializeFromSchema() {
    const schema = this.schema;

    const queryTypeName = schema.queryType.name;
    const mutationTypeName = schema.mutationType.name;

    const queryType = schema.types.find(type => type.name === queryTypeName);

    const mutationType = schema.types.find(
      type => type.name === mutationTypeName
    );

    const resources: any = {};

    const mapCRUD = ['get', 'getListOf', 'update', 'create', 'delete'];

    const typeNames = schema.types.map(type => type.name);

    typeNames.forEach(typeName => {
      [queryType, mutationType].forEach(type => {
        type.fields.forEach(field => {
          mapCRUD.forEach(action => {
            if (action + typeName === field.name) {
              if (!resources[typeName]) {
                resources[typeName] = {};
              }
              resources[typeName][action] = field;
            }
          });
        });
      });
    });

    this.resources = resources;
  }

  // @Hook('displayActionInMenu')
  private getDisplayableActionsInMenu(resource) {
    const displayableActions = ['getListOf', 'create'];
    const actions: any = {};
    for (const action in resource) {
      if (displayableActions.includes(action)) {
        actions[action] = resource[action];
      }
    }
    return actions;
  }
}
</script>
