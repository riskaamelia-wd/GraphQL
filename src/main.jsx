import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Layout from './templates/Layout'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ApolloProvider } from '@apollo/client'
import client from './apollo-client'
// import {ProductList} from './components/ProductList/ProductList'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
          {/* <ProductList/> */}
          <Layout/>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
  // </React.StrictMode>,
)
