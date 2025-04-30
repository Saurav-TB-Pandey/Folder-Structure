import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userDetailsReducer from "../reducers/userDetailsReducer";

const persistConfig = {
  key: "root",
  storage,
  // You can add blacklist or whitelist if needed to add or skip some reducer
  // blacklist: ['someReducerToSkip'],
  // whitelist: ['onlySomeReducer'],
};

const persistedReducer = persistReducer(persistConfig, userDetailsReducer);

const store = configureStore({
  reducer: {
    userDetails: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
