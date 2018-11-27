import gql from "graphql-tag";

const nodeTypeInfo = gql`query getNodeTypeInfo($name: String!) {
    nodeTypeProps(name:$name) {
        name
        type
    }
}`;

const getDefinitions = gql`query getNodeTypeInfo($path: String!) {
  jcr {
    nodeByPath(path:$path) {
      property(name:"definitions") {
        value
      }
    }
  }
}`;

export { nodeTypeInfo, getDefinitions };