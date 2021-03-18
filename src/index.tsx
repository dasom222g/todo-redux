import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './modules'
import { logger } from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./mocks/browser')
  worker.start()
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk, logger)))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
