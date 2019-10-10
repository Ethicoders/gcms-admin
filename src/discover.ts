export default `
fragment FullType on Type {
  kind

  name

  description

  fields(includeDeprecated: true) {
    name

    description

    args {
      ...GetInputValue
    }

    type {
      ...TypeRef
    }

    isDeprecated

    deprecationReason
  }

  inputFields {
    ...GetInputValue
  }

  interfaces {
    ...TypeRef
  }

  enumValues(includeDeprecated: true) {
    name

    description

    isDeprecated

    deprecationReason
  }

  possibleTypes {
    ...TypeRef
  }
}

fragment GetInputValue on InputValue {
  name

  description

  type {
    ...TypeRef
  }

  defaultValue
}

fragment TypeRef on Type {
  kind

  name

  ofType {
    kind

    name

    ofType {
      kind

      name

      ofType {
        kind

        name

        ofType {
          kind

          name

          ofType {
            kind

            name

            ofType {
              kind

              name

              ofType {
                kind

                name
              }
            }
          }
        }
      }
    }
  }
}

query IntrospectionQuery {

  discover {

    queryType {

      name

    }

    mutationType {

      name

    }

    types {

      ...FullType

    }

    directives {

      name

      description

      locations

      args {

        ...GetInputValue

      }

    }

  }

}
`;
