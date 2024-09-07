import ReactDOM from "react-dom/client";
import AppRouter from "@routes/AppRouter";
// redux
import { Provider } from "react-redux";
import { store, persistor } from "@store";
import { PersistGate } from "redux-persist/integration/react";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";
import "./services/axios-global.js"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
