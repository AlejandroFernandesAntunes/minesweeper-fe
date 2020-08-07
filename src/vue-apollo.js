import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import jwt from 'jsonwebtoken';

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
  headers: {
    authorization: `Bearer ${jwt.sign(
      { iss: process.env.VUE_APP_JWT_ISSUER },
      `${process.env.VUE_APP_JWT_SECRET}`
    )}`
  }
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  mode: 'no-cors',
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);

export default apolloProvider;