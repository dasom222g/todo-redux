import React from 'react'
import { Route, Switch } from 'react-router-dom'
import TodoHome from '../containers/TodoHome'
import TodoUpdate from '../containers/TodoUpdate'
// import PostContainer from '../containers/PostContainer'
// import PostDetailContainer from '../containers/PostDetailContainer'
// import CounterContainer from '../containers/CounterContainer'

function App(): JSX.Element {
  return (
    <div className="App">
      {/* <CounterContainer /> */}
      {/* <Route path="/" component={PostContainer} exact />
      <Route path="/:id" component={PostDetailContainer} /> */}
      <Switch>
        <Route path="/" render={() => <TodoHome />} exact />
        <Route path="/update/:itemId" render={() => <TodoUpdate />} />
        <Route path="/">Not found</Route>
      </Switch>
    </div>
  )
}

export default App
