import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Header from "./components/Header.jsx";
import NotesListPage from "./pages/NotesListPage.jsx";
import NotePage from "./pages/NotePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import MyContext from "./context/MyContext.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
//<Route path="/note/:id" Component={NotePage} />

/* The router is set up to provide context (MyContext) to all children including Route components
  MyContext has app context data with a default value as string, as well as an AuthContext to provide
  user authorization and logged in status information. A PrivateRoute component wraps all routes
  that require the user to be logged in for access. PrivateRoute uses auth context to determine
  where to send the user based on their login status.
*/

function App() {
  return (
    <>
      <Router>
        <MyContext>
          <Header />
          <Routes>
            <Route path="/" exact Component={NotesListPage} name="notes" />
            <Route path="/login" Component={LoginPage} name="login" />
            <Route path="/logout" Component={LogoutPage} name="logout" />

            <Route element={<PrivateRoute />}>
              <Route path="/note/:id" Component={NotePage} />
            </Route>
          </Routes>
        </MyContext>
      </Router>
    </>
  );
}

export default App;
