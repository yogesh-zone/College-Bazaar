import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
const element = document.getElementById("root");

ReactDom.render(
  <Provider store={store}>
    <ChakraProvider>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </Provider>,
  element
);
