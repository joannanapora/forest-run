import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../src/store-redux/store";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient, gql } from "apollo-boost";


const httpLink = createHttpLink(
  {
    uri: 'https://forest-back.herokuapp.com/graphql'
  }
);

const cache = new InMemoryCache();


const client = new ApolloClient({
  link: httpLink,
  cache
});


ReactDOM.render(
  <ApolloProvider client ={client}>
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
