import reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
    key: "root",
    storage: AsyncStorage
};

export const store = configureStore({
    reducer: persistReducer(config, reducer),
    middleware: (fn) =>
        fn({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
