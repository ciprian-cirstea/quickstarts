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
  QuickStart,
  QuickStartDrawer,
  QuickStartContext,
  useValuesForQuickStartContext,
  useLocalStorage,
} from "@cloudmosaic/quickstarts";
import { allQuickStarts } from "./quickstarts-data/quick-start-test-data";

// get quickstarts from documentHub
const getQuickstartsFromDocumentHub = async () => {
  let documentHubUrl =
    "https://developer.ibm.com/edge/documenthub/api/catalogs/emqnkgHx/documents";

  const result = await fetch(documentHubUrl);
  const documents = await result.json();

  // return documents.map((q: any) => q.document)
  return documents;
};

// update quickstarts list from documentHub
const quickstartsWithDocumentHub = async (quickstarts: QuickStart[]) => {
  let quickstartsDocumentHub = (await getQuickstartsFromDocumentHub()) || {};

  quickstartsDocumentHub = quickstartsDocumentHub.map((obj: any, i: any) => {
    let doc = {
      format: "yaml",
      metadata: {
        name: obj.catalog.document.documentId,
      },
      spec: {
        displayName: obj.document.title,
        durationMinutes: obj.document.duration,
        icon: "",
        description: obj.document.description,
      },
    };

    return doc;
  });

  return quickstartsDocumentHub;
};

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

  const [updatedQuickstarts, setUpdatedQuickstarts] = useState(
    allQuickStarts || []
  );

  const isOnEditPage = () => {
    return (
      location.pathname.indexOf("/edit/") !== -1 ||
      location.pathname.indexOf("/add") !== -1
    );
  };
  const [isEditPage, setIsEditPage] = useState(isOnEditPage());
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [loaded, setLoaded] = useState(false);
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const caasCode = urlParams.get("caasCode");
    if (caasCode) {
      try {
        fetch(
          `https://developer.ibm.com/edge/documenthub/api/libraries/tokenbycode/${caasCode}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.token) {
              document.cookie = `caasToken=${data.token}`;
              window.location.href = `http://localhost:3000/quickstarts`;
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      if (
        !document.cookie
          .split(";")
          .some((item) => item.trim().startsWith("caasToken="))
      ) {
        console.log('The cookie "caasToken" exists (ES6)');
        console.log("no cookie");
        window.location.href = `https://developer.ibm.com/edge/documenthub/sso/w3id/login/LKKmTn3`;
      }
    }
  }, []);
  React.useEffect(() => console.log(activeQuickStartID), [activeQuickStartID]);
  React.useEffect(() => {
    // callback on state change
  }, [allQuickStartStates]);
  React.useEffect(() => {
    // Create an scoped async function in the hook
    async function getQuickstarts() {
      setUpdatedQuickstarts(await quickstartsWithDocumentHub(allQuickStarts));
      setLoaded(true);
    }

    if (location.pathname === quickStartPath) {
      setLoaded(false);

      // Execute the created function directly
      getQuickstarts();
    } else {
      setLoaded(true);
    }

    setIsEditPage(isOnEditPage());
  }, [location.pathname]);
  const { pathname: currentPath } = window.location;
  const quickStartPath = "/";
  const valuesForQuickstartContext = useValuesForQuickStartContext({
    // allQuickStarts: quickstartsWithLocalStorage(allQuickStarts),
    allQuickStarts: updatedQuickstarts,
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
        history.push(`/edit/${id}`);
        setIsEditPage(true);
        setIsNavOpen(false);
      },
      onAddLinkClick: () => {
        history.push(`/add`);
        setIsEditPage(true);
        setIsNavOpen(false);
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
      // showNavToggle
      // onNavToggle={onNavToggle}
      // isNavOpen
    />
  );
  // const AppNav = (
  //   <Nav aria-label="Nav">
  //     <NavList>
  //       {Demos.map((demo, index) => (
  //         <NavItem itemId={index} key={demo.id}>
  //           <Link id={`${demo.id}-nav-item-link`} to={`/`}>
  //             {demo.name}
  //           </Link>
  //         </NavItem>
  //       ))}
  //       <NavItem>
  //         <Link to="/quickstarts">Quick Starts</Link>
  //       </NavItem>
  //     </NavList>
  //   </Nav>
  // );
  // const AppSidebar = <PageSidebar isNavOpen={isNavOpen} nav={AppNav} />;
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      {loaded ? (
        <QuickStartContext.Provider value={valuesForQuickstartContext}>
          <QuickStartDrawer>
            <Page
              header={AppHeader}
              // sidebar={AppSidebar}
              // isManagedSidebar={!isEditPage}
            >
              {children}
            </Page>
          </QuickStartDrawer>
        </QuickStartContext.Provider>
      ) : null}
    </React.Suspense>
  );
};
export default withRouter(App);
