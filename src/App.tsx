import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./router/index";
import Protected from "./components/common/Protected";
import HotToaster from "./components/common/HotToaster";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {routes.map((route) => (
              <Route
                key={`${route.path}_key`}
                path={route.path}
                element={
                  <Protected isProtected={route.isProtected}>
                    <route.component />
                    {/* <route.component {...route.meta} /> */}
                  </Protected>
                }
              />
            ))}
          </Routes>
        </Router>
        <HotToaster />
      </PersistGate>
    </Provider>
  );
};

export default App;
