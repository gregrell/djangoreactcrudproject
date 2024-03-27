import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import NotesListPage from "./pages/NotesListPage.jsx";
import NotePage from "./pages/NotePage.jsx";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" exact Component={NotesListPage} />
          <Route path="/note/:id" Component={NotePage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
