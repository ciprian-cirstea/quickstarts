import "@patternfly/patternfly/base/patternfly-shield-inheritable.css";
import "@patternfly/patternfly/patternfly.min.css";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import "@cloudmosaic/quickstarts/dist/quickstarts.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import App from "./App";
import { QuickStartCatalogPage, QuickStartEditPage } from "@cloudmosaic/quickstarts";
import { Home } from "./Home";

ReactDOM.render(
  <Router>
    <App>
    <Switch>
      {/* <Route exact path="/">
          <Home />
      </Route> */}
      <Route exact path="/">
          <QuickStartCatalogPage showFilter />
      </Route>
      <Route exact path="/edit/:quickstartsId" component={QuickStartEditPage}/>
      <Route exact path="/add" component={QuickStartEditPage}/>
      <Redirect from="*" to="/" />
    </Switch>
    </App>
  </Router>,
  document.getElementById("root")
);
