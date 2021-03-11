import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './modules'
import myLogger from './middleware/myLogger'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
