import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Home from "./pages/home/home";
import Records from "./pages/records/records";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <div className="App font-sans ">
      <Provider store={store}>
        <MantineProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/records" element={<Records />} />
            </Routes>
          </Router>
        </MantineProvider>
      </Provider>
    </div>
  );
}

export default App;
