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
  function SetPage({ page }: { page: string }) {
    useEffect(() => {
      if (currPage !== page) setCurrPage(page);
    }, []);
    return <></>;
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
                  <SetPage page="socks" />
                  <SocksPage />
                </>
              }
            />
            <Route path="socks">
              <Route
                path="add"
                element={
                  <>
                    <SetPage page="socks" />
                    <AddSock />
                  </>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <>
                    <SetPage page="socks" />
                    <EditSock />
                  </>
                }
              />
              <Route
                index
                element={
                  <>
                    <SetPage page="socks" />
                    <SocksPage />
                  </>
                }
              />
            </Route>
            <Route path="officers">
              <Route
                path="add"
                element={
                  <>
                    <SetPage page="officers" />
                    <AddOfficer />
                  </>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <>
                    <SetPage page="officers" />
                    <EditOfficer />
                  </>
                }
              />
              <Route
                index
                element={
                  <>
                    <SetPage page="officers" />
                    <OfficersPage />
                  </>
                }
              />
            </Route>
            <Route path="locations">
              <Route
                path="add"
                element={
                  <>
                    <SetPage page="locations" />
                    <AddLocation />
                  </>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <>
                    <SetPage page="locations" />
                    <EditLocation />
                  </>
                }
              />
              <Route
                index
                element={
                  <>
                    <SetPage page="locations" />
                    <LocationsPage />
                  </>
                }
              />
            </Route>
            <Route path="history">
              <Route
                path="add"
                element={
                  <>
                    <SetPage page="history" />
                    <AddHistory />
                  </>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <>
                    <SetPage page="history" />
                    <EditHistory />
                  </>
                }
              />
              <Route
                index
                element={
                  <>
                    <SetPage page="history" />
                    <HistoryPage />
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
