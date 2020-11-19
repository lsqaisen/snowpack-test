import React from "react";

// import { useRouteMatch } from "react-router";
// import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

function Topics(props: any) {
  // let match = useRouteMatch();
  // console.log(props, match);

  return (
    <div>
      <h2>Topics</h2>

      {/* <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul> */}

      {/* <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch> */}
    </div>
  );
}

// function Topic() {
//   let { topicId }: any = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }

export default Topics;
