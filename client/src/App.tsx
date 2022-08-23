import React, { useEffect, useState } from "react";
import "./css/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SocksPage from "./components/index/SocksPage";
import Template from "./components/Template";
import OfficersPage from "./components/index/OfficersPage";
import LocationsPage from "./components/index/LocationsPage";
import HistoryPage from "./components/index/HistoryPage";
import AddOfficer from "./components/add/AddOfficer";
import AddSock from "./components/add/AddSock";
import AddLocation from "./components/add/AddLocation";
import AddHistory from "./components/add/AddHistory";
import EditHistory from "./components/edit/EditHistory";
import EditLocation from "./components/edit/EditLocation";
import EditOfficer from "./components/edit/EditOfficer";
import EditSock from "./components/edit/EditSock";

export const PageContext = React.createContext<[string, Function]>([
  "history",
  () => {},
]);

function App() {
  const [currPage, setCurrPage] = useState("history");
  // function SetPage({ page }: { page: string }) {
  //   useEffect(() => {
  //     console.log("currPage", currPage);
  //     console.log("page", page);

  //     if (currPage !== page) setCurrPage(page);
  //   }, []);

  //   return <></>;
  // }

  function SetPage(page: string) {
    useEffect(() => {
      if (currPage !== page) setCurrPage(page);
    }, []);
  }

  return (
    <Router>
      <PageContext.Provider value={[currPage, SetPage]}>
        <Template>
          <Routes>
            <Route
              index
              element={
                <>
                  {/* <SetPage page="socks" /> */}
                  <SocksPage setPage={SetPage} />
                </>
              }
            />
            <Route path="socks">
              <Route
                path="add"
                element={
                  <>
                    {/* <SetPage page="socks" /> */}
                    <AddSock setPage={SetPage} />
                  </>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <>
                    {/* <SetPage page="socks" /> */}
                    <EditSock setPage={SetPage} />
                  </>
                }
              />
              <Route
                index
                element={
                  <>
                    {/* <SetPage page="socks" /> */}
                    <SocksPage setPage={SetPage} />
                  </>
                }
              />
            </Route>
            <Route path="officers">
              <Route
                path="add"
                element={
                  <>
                    {/* <SetPage page="officers" /> */}
                    <AddOfficer setPage={SetPage} />
                  </>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <>
                    {/* <SetPage page="officers" /> */}
                    <EditOfficer setPage={SetPage} />
                  </>
                }
              />
              <Route
                index
                element={
                  <>
                    {/* <SetPage page="officers" /> */}
                    <OfficersPage setPage={SetPage} />
                  </>
                }
              />
            </Route>
            <Route path="locations">
              <Route
                path="add"
                element={
                  <>
                    {/* <SetPage page="locations" /> */}
                    <AddLocation setPage={SetPage} />
                  </>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <>
                    {/* <SetPage page="locations" /> */}
                    <EditLocation setPage={SetPage} />
                  </>
                }
              />
              <Route
                index
                element={
                  <>
                    {/* <SetPage page="locations" /> */}
                    <LocationsPage setPage={SetPage} />
                  </>
                }
              />
            </Route>
            <Route path="history">
              <Route
                path="add"
                element={
                  <>
                    {/* <SetPage page="history" /> */}
                    <AddHistory setPage={SetPage} />
                  </>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <>
                    {/* <SetPage page="history" /> */}
                    <EditHistory setPage={SetPage} />
                  </>
                }
              />
              <Route
                index
                element={
                  <>
                    {/* <SetPage page="history" /> */}
                    <HistoryPage setPage={SetPage} />
                  </>
                }
              />
            </Route>
          </Routes>
        </Template>
      </PageContext.Provider>
    </Router>
  );
}

export default App;
