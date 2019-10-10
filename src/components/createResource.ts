import ManageResource from './ManageResource.vue';
import FieldResolver from './fieldResolver';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    FieldResolver,
  },
})
export default class CreateResource extends ManageResource {
  

  protected handleClickSubmit() {
    console.log('creating...');
  }
}
