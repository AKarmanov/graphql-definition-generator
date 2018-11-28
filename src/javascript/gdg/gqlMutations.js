import gql from "graphql-tag";

const storeDefinitions = gql`mutation storeDefinitions($definitions: String!, $definitionsPath: String!) {
  jcr {
    mutateNode(pathOrId:$definitionsPath) {
      mutateProperty(name:"definitions") {
        setValue(value:$definitions)
      }
    }
  }
}`;

export { storeDefinitions };