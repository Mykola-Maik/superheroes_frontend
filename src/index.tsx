import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import muiTheme from "@/styles/muiTheme";
import RouterProvider from "@/containers/providers/routerProvider/RouterProvider";
import ServiceModalProvider from "@/containers/providers/serviceModalProvider/ServiceModalProvider";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <ServiceModalProvider>
          <RouterProvider />
        </ServiceModalProvider>
      </MuiThemeProvider>
    </Provider>
  </StrictMode>
);
