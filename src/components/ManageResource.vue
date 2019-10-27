<template>
  <div class="manage-resource">
    <q-form>
      <field-resolver
        v-for="resourceField in resourceFields"
        :key="resourceField"
        :value="item[resourceField]"
        @change="item[resourceField] = $event"
        :config="getFieldByName(resourceField)"
      />
      <q-btn
        @click="handleClickSubmit"
        color="primary"
        icon="check"
        :value="$t('manageResource.submit')"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';
import FieldResolver from './fieldResolver';
import { AppModule } from '@/utils/vuex';

@Component({
  components: {
    FieldResolver
  }
})
export default class ManageResource extends Vue {
  protected resourceFields = [];
  protected resourceType = {};
  protected resourceName = '';
  protected item: any = {};
  @AppModule.State('schema')
  protected schema: any;

  public async created() {
    const resourceName = this.$route.params.resource;
    const id = this.$route.params.id;
    const resourceType = this.getCurrentResourceType();

    this.onInit();
  }

  protected abstract onInit();

  protected getCurrentResourceType() {
    return this.schema.types.find(
      type => type.name === this.$route.params.resource
    );
  }

  protected getFieldByName(fieldName) {
    const resourceName = this.$route.params.resource;
    const resourceType = this.schema.types.find(
      type => type.name === resourceName
    );

    return resourceType.fields.find(field => field.name === fieldName);
  }
}
</script>

<style lang="stylus"></style>