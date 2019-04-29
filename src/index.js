import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

client
  .query({
    query: gql`
      {
        getUsers {
          ... on Group {
            label
            name
            users {
              name
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result));

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
