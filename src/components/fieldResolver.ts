import { Vue, Component, Prop } from 'vue-property-decorator';
import { getSortedFlattenedType } from '@/utils/graphql';
import { TypeKind, GraphQLString, GraphQLBoolean } from 'graphql';
// import * as fields from './fields';

// GraphQL types map
const fields = {
  [GraphQLString.name]: {
    component: 'q-input',
    attribute: 'value',
    event: 'input',
  },
  [GraphQLBoolean.name]: {
    component: 'q-toggle',
    attribute: 'value',
    event: 'input',
  },
};
const defaultField = fields[GraphQLString.name];

@Component({
  render(h) {
    const type = getSortedFlattenedType(this.config.type);
    const field = fields[type[0].name] || defaultField;

    console.log(type);

    const props: any = {
      [field.attribute]: this.value,
      label: this.$t(''),
    };

    if (type[1].kind === TypeKind.NON_NULL) {
      props.rules = [
        (value) => (value && value.length) || this.$t('field.required'),
      ];
    }

    return h(field.component, {
      props,
      class: 'field',
      on: {
        input: (value) => {
          this.$emit('change', value);
        },
      },
    });
  },
})
export default class FieldResolver extends Vue {
  @Prop({
    type: undefined, // From VueJS documentation: in order to pass any type
  })
  private value?: any;

  @Prop({
    type: Object,
  })
  private config?: any;
}
