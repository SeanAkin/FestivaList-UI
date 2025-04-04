import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./theme/darkTheme";
import "./App.css";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import SearchPage from "./pages/Search/Search";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/shopping-list/:id" element={<ShoppingList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
