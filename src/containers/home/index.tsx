import * as React from "react";
import OnlineContact from "../../components/online-contact";
import { Route, Redirect } from "react-router-dom";

import AppRoute from "../../router/approute";

function Home() {
  return (
    <div className="container mt-16px">
      <div className="row">
        <div className="col-md-9">
          <AppRoute/>
        </div>
        <div className="col-md-3">
          <OnlineContact />
        </div>
      </div>
    </div>
  );
}
export default Home;
