import React from 'react';
import { Route } from 'react-router-dom'
import { Home, About, Posts } from 'pages';
import Menu from 'components/Menu';

const App = () => {
  return (
    <div>
      <Menu/>
      {/* exact를 넣으면 반드시 그 경로여야만 넘어감 */}
      <Route exact path="/" component={Home} />
      {/*<Route exact path="/about" component={About} /> */}
      {/* param을 선택적으로 받는다. */}
      <Route path="/about/:name?" component={About} />
      <Route path="/posts" component={Posts} />
    </div>
  );
};

export default App;
