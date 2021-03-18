import React, { useState } from "react";
import {
  Page,
  Nav,
  NavList,
  NavItem,
  PageSidebar,
  Avatar,
  Brand,
  PageHeader,
  PageHeaderTools,
} from "@patternfly/react-core";
import imgBrand from "./assets/images/imgBrand.svg";
import imgAvatar from "./assets/images/imgAvatar.svg";
import { Link, useHistory, withRouter } from "react-router-dom";
import Demos from "./Demos";
import "./App.css";
import {
  QuickStartDrawer,
  QuickStartContext,
  useValuesForQuickStartContext,
  useLocalStorage,
} from "@cloudmosaic/quickstarts";
import { allQuickStarts } from "./quickstarts-data/quick-start-test-data";
const App: React.FunctionComponent = ({ children }) => {
  const history = useHistory();
  const [initialized, setInitialized] = React.useState(true);
  const [activeQuickStartID, setActiveQuickStartID] = useLocalStorage(
    "quickstartId",
    ""
  );
  const [allQuickStartStates, setAllQuickStartStates] = useLocalStorage(
    "quickstarts",
    {}
  );
  const isOnEditPage = () => {
    return (
      location.pathname.indexOf("quickstarts/edit/") !== -1 ||
      location.pathname.indexOf("quickstarts/add") !== -1
    );
  };
  const [isEditPage, setIsEditPage] = useState(isOnEditPage());
  const [isNavOpen, setIsNavOpen] = useState(false);
  React.useEffect(() => console.log(activeQuickStartID), [activeQuickStartID]);
  React.useEffect(() => {
    // callback on state change
  }, [allQuickStartStates]);
  React.useEffect(() => {
    setIsEditPage(isOnEditPage());
  }, [location.pathname]);
  const { pathname: currentPath } = window.location;
  const quickStartPath = "/quickstarts";
  const valuesForQuickstartContext = useValuesForQuickStartContext({
    allQuickStarts,
    activeQuickStartID,
    setActiveQuickStartID,
    allQuickStartStates,
    setAllQuickStartStates,
    footer: {
      showAllLink: currentPath !== quickStartPath,
      onShowAllLinkClick: () => {
        history.push(quickStartPath);
      },
    },
    global: {
      onEditLinkClick: (id: any) => {
        history.push(`/quickstarts/edit/${id}`);
        setIsEditPage(true);
        setIsNavOpen(false);
      },
      onAddLinkClick: () => {
        history.push("/quickstarts/add");
        setIsEditPage(true);
        setIsNavOpen(false);
      },
      onCloseLinkClick: () => {
        history.push("/quickstarts");
      },
    },
  });
  if (!initialized) return <div>Loading</div>;
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const AppToolbar = (
    <PageHeaderTools>
      <Avatar src={imgAvatar} alt="Avatar image" />
    </PageHeaderTools>
  );
  const AppHeader = (
    <PageHeader
      logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
      headerTools={AppToolbar}
      showNavToggle
      onNavToggle={onNavToggle}
      isNavOpen
    />
  );
  const AppNav = (
    <Nav aria-label="Nav">
      <NavList>
        {Demos.map((demo, index) => (
          <NavItem itemId={index} key={demo.id}>
            <Link id={`${demo.id}-nav-item-link`} to={`/`}>
              {demo.name}
            </Link>
          </NavItem>
        ))}
        <NavItem>
          <Link to="/quickstarts">Quick Starts</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
  const AppSidebar = <PageSidebar isNavOpen={isNavOpen} nav={AppNav} />;
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <QuickStartContext.Provider value={valuesForQuickstartContext}>
        <QuickStartDrawer>
          <Page
            header={AppHeader}
            sidebar={AppSidebar}
            isManagedSidebar={!isEditPage}
          >
            {children}
          </Page>
        </QuickStartDrawer>
      </QuickStartContext.Provider>
    </React.Suspense>
  );
};
export default withRouter(App);
