// import store from '@/store';

export const getNamedType = (input: any): string => {
  if (input.ofType) {
    return getNamedType(input.ofType);
  }
  return input.name;
};

export const flattenType = (input: any): any[] =>
  input.ofType ? [input, ...flattenType(input.ofType)] : [input];

export const getSortedFlattenedType = (input: any) => flattenType(input).reverse();

export const getTypesFromInputType = (inputType: any) => {
  return inputType.args.map((arg: any) => getSortedFlattenedType(arg.type));
};

// export const getTypeByName = (name: string) =>
//   store.state.schema.types.find((type: any) => type.name === name);

// export const getMutationFieldByName = (name) => {
//   const mutationTypeName = store.state.schema.mutationType.name;
//   const mutationType = getTypeByName(mutationTypeName);
//   return mutationType.fields.find((field) => field.name === name);
// };

export const convertToGQLScalar = (input: any) => {
  const types: any = {
    boolean: (scalar: boolean) => `${scalar}`,
    string: (scalar: string) => `"${scalar}"`,
    number: (scalar: number) => `${scalar}`,
  };

  return types[typeof input] ? types[typeof input](input) : input;
};
