import { getSortedFlattenedType } from '@/utils/graphql';
import { TypeKind, GraphQLString, GraphQLBoolean } from 'graphql';

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
  HTML: {
    component: 'q-editor',
    attribute: 'value',
    event: 'input',
  },
};
const defaultField = fields[GraphQLString.name];

export default {
  props: {
    value: {
      type: undefined,
    },
    config: {
      type: Object,
    },
  },
  render(h) {
    const type = getSortedFlattenedType(this.config.type);
    const field = fields[type[0].name] || defaultField;

    const props: any = {
      [field.attribute]: this.value,
      label: this.$t(''),
    };

    if (type[1] && type[1].kind === TypeKind.NON_NULL) {
      props.rules = [
        (value: any) => (value && value.length) || this.$t('field.required'),
      ];
    }

    return h(field.component, {
      props,
      class: 'field',
      on: {
        input: (value: any) => {
          this.$emit('change', value);
        },
      },
    });
  },
} as any;
