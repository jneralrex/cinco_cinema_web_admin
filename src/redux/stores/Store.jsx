import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { combineReducers } from "redux";
import adminReducer from "../slices/adminSlice";
import usersReducer from "../slices/usersSlice";
import theatreAdminsReducer from "../slices/TheatreAdminSlice";
// Logger middleware
const logger = createLogger({
  collapsed: true,
  diff: true,
});

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["admin", "users"], // Reducers you want to persist
};

// Combine reducers
const rootReducer = combineReducers({
  admin: adminReducer,
  users: usersReducer,
  theatreAdmins: theatreAdminsReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }).concat(logger), // Add logger middleware
});

export const persistor = persistStore(Store);
export default Store;
