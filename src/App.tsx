import * as React from "react";
import { Route, Switch, NavLink, useLocation } from "react-router-dom";

import "./App.css";
import CandidateList from "./components/CandidateList";
import CandidateSearch from "./components/CandidateSearch";
import CandidateDetails from "./components/CandidateDetails";

export interface Candidate {
  id: number;
  name: string;
  Image: string;
  status: "APPLIED" | "SHORTLISTED" | "REJECTED";
}

const App = () => {
  const location = useLocation();
  const [searchTerm, updateSearchTerm] = React.useState("");
  const [candidates, updateCandidates] = React.useState<Array<Candidate>>([]);

  React.useEffect(() => {
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json"
    )
      .then((res) => res.json())
      .then((res) => {
        if (res && Array.isArray(res)) {
          updateCandidates(res.map((c) => ({ ...c, status: "APPLIED" })));
        }
      });
  }, []);

  return (
    <div className="App">
      <aside className=" top-0 left-0 w-64 fixed h-full bg-white border-r-2	 ">
        <nav className="flex flex-col justify-start items-start p-4">
          <NavLink
            className="p-2"
            activeClassName="text-primary text-bold"
            exact
            to="/"
          >
            All candidates
          </NavLink>
          <NavLink
            className="p-2"
            activeClassName="text-primary text-bold"
            to="/shortlisted"
          >
            Shortlisted Candidates
          </NavLink>
          <NavLink
            className="p-2"
            activeClassName="text-primary text-bold"
            to="/rejected"
          >
            Rejected Candidates
          </NavLink>
        </nav>
      </aside>
      <main className="ml-64 p-8">
        {["/", "/shortlisted", "/rejected"].includes(location.pathname) && (
          <CandidateSearch
            inputValue={searchTerm}
            onInputChange={updateSearchTerm}
          />
        )}
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <CandidateList
                list={candidates.filter((c) =>
                  c.name.toLowerCase().includes(searchTerm)
                )}
              />
            )}
          />
          <Route
            path="/shortlisted"
            component={() => (
              <CandidateList
                list={candidates.filter(
                  (c) =>
                    c.status === "SHORTLISTED" &&
                    c.name.toLowerCase().includes(searchTerm)
                )}
              />
            )}
          />
          <Route
            path="/rejected"
            component={() => (
              <CandidateList
                list={candidates.filter(
                  (c) =>
                    c.status === "REJECTED" &&
                    c.name.toLowerCase().includes(searchTerm)
                )}
              />
            )}
          />
          <Route
            path="/:id"
            render={(routerProps) => (
              <CandidateDetails
                candidate={
                  routerProps.match.params.id &&
                  candidates.find((c) => c.id === routerProps.match.params.id)
                }
                onStatusChange={(status) => {
                  updateCandidates(
                    candidates.map((c) =>
                      c.id === routerProps.match.params.id
                        ? { ...c, status }
                        : c
                    )
                  );
                }}
              />
            )}
          />
          <Route component={() => <div>404 not found</div>} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
