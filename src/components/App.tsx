import React from 'react'
import PostContainer from '../containers/PostContainer'
// import CounterContainer from '../containers/CounterContainer'
import { Route } from 'react-router-dom'
import PostDetailContainer from '../containers/PostDetailContainer'

function App() {
  return (
    <div className="App">
      {/* <CounterContainer /> */}
      <Route path="/" component={PostContainer} exact />
      <Route path="/:id" component={PostDetailContainer} exact />
    </div>
  )
}

export default App
