import "./App.css";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  const observerErrorHandler = () => {
    // Silently ignore the ResizeObserver warning
  };

  window.addEventListener("error", (e) => {
    if (
      e.message ===
        "ResizeObserver loop completed with undelivered notifications." ||
      e.message === "ResizeObserver loop limit exceeded"
    ) {
      observerErrorHandler();
      e.stopImmediatePropagation();
    }
  });

  return (
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Home />
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
