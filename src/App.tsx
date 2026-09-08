import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping-list/:id" element={<ShoppingList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
