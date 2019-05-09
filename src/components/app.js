import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Query } from "react-apollo";
import UserTreeExample from "./UserTreeExample";
import ResourceTreeExample from "./ResourceTreeExample";
import rename from "deep-rename-keys";
import { GET_USERS, GET_RESOURCES } from "./globlaQueries";
import { adopt } from "react-adopt";
import Navbar from "./Navbar";
import { reshapeResource } from "../helperFuncs/updateNodes";

const Composed = adopt({
  users: ({ render }) => <Query query={GET_USERS}>{render}</Query>,
  resources: ({ render }) => <Query query={GET_RESOURCES}>{render}</Query>
});

const App = props => (
  <Composed>
    {({ users, resources }) => {
      if (users.loading || resources.loading) return <p>Loading...</p>;
      if (users.error || resources.error) return <p>Error :(</p>;

      // Func formats data to match the format TREEBEARD npm package requires to build dropdown
      const usersFormatedData = rename(
        {
          name: "users",
          toggled: true,
          children: users.data.getUsers
        },
        key => (key === "users" ? "children" : key)
      );

      let { reshapedResources } = reshapeResource(
        rename(
          {
            data: resources.data.getResources
          },
          key => (key === "descendants" ? "children" : key)
        ).data
      );

      const resourceformatedData = {
        uri: "Root",
        name: "Root",
        partner: null,
        kind: null,
        advertiser: null,
        toggled: true,
        children: reshapedResources.children
      };

      return (
        <BrowserRouter>
          <Navbar />
          <div>
            <Route
              exact
              path="/"
              component={() => <UserTreeExample data={usersFormatedData} />}
            />
            <Route
              exact
              path="/resources"
              component={() => (
                <ResourceTreeExample data={resourceformatedData} />
              )}
            />
          </div>
        </BrowserRouter>
      );
    }}
  </Composed>
);

export default App;
