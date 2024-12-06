import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { PaperProvider } from "react-native-paper";
import Navigation from "./src/components/navigation";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "react-native-toast-notifications";

const App = (): React.JSX.Element => (
    <>
        <ToastProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <PaperProvider>
                        <Navigation />
                    </PaperProvider>
                </PersistGate>
            </Provider>
        </ToastProvider>
    </>
);

export default App;
