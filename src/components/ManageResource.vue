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

@Component({
  components: {
    FieldResolver
  }
})
export default class ManageResource extends Vue {
  protected resourceFields = [];
  protected resourceType = {};
  protected item: any = {};
  protected loading = true;
  public async created() {
    console.log(this);

    const resourceName = this.$route.params.resource;
    const id = this.$route.params.id;
    const resourceType = this.getCurrentResourceType();

    this.onInit();
    this.loading = false;
  }

  protected abstract onInit();

  protected getCurrentResourceType() {
    return this.$store.state.schema.types.find(
      type => type.name === this.$route.params.resource
    );
  }

  protected getFieldByName(fieldName) {
    const resourceName = this.$route.params.resource;
    const resourceType = this.$store.state.schema.types.find(
      type => type.name === resourceName
    );

    return resourceType.fields.find(field => field.name === fieldName);
  }
}
</script>

<style lang="stylus"></style>