import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import SearchPage from "./pages/Search/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/shopping-list/:id" element={<ShoppingList />} />
      </Routes>
    </Router>
  );
}

export default App;
