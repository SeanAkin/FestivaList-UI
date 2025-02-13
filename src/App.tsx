import { ThemeProvider } from "@mui/material";
import './App.css'
import ShoppingListPage from "@/pages/ShoppingList/ShoppingList";
import darkTheme from "@/theme/darkTheme.ts";

function App() {
  return(
      <ThemeProvider theme={darkTheme}>
        <ShoppingListPage />
      </ThemeProvider>
  );
}
export default App
