import store from '@/store';

export const getNamedType = (input) => {
  if (input.ofType) {
    return getNamedType(input.ofType);
  }
  return input.name;
};

export const flattenType = (input): any[] =>
  input.ofType ? [input, ...flattenType(input.ofType)] : [input];

export const getSortedFlattenedType = (input) => flattenType(input).reverse();

export const getTypesFromInputType = (inputType) => {
  return inputType.args.map((arg) => getSortedFlattenedType(arg.type));
};

export const getTypeByName = (name) =>
  store.state.schema.types.find((type) => type.name === name);

export const getMutationFieldByName = (name) => {
  const mutationTypeName = store.state.schema.mutationType.name;
  const mutationType = getTypeByName(mutationTypeName);
  return mutationType.fields.find((field) => field.name === name);
};

export const convertToGQLScalar = (input: any) => {
  const types = {
    boolean: (scalar: boolean) => `${scalar}`,
    string: (scalar: string) => `"${scalar}"`,
    number: (scalar: number) => `${scalar}`,
  };

  return types[typeof input] ? types[typeof input](input) : input;
};
