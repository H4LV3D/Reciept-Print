import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formDataReducer from "./slices/formDataReducer";

const combinedReducers = combineReducers({
  formData: formDataReducer,
});

// This resets the entire store to its initial state
// when the user logs out
const rootReducer = (state: any, action: any) => {
  if (action.type === "user/logoutUser") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  // Disable redux devtools in production and staging
  // Enable redux devtools in development
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
