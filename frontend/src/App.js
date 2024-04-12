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

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact Component={NotesListPage} name="notes" />
          <Route path="/note/:id" Component={NotePage} />
          <Route path="/login" Component={LoginPage} name="login" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
