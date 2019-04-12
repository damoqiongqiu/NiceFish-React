import * as React from "react";
import OnlineContact from "../../components/online-contact";

import AppRoute from "../../router/approute";

function Home() {
  return (
    <div className="container mtb-16px ">
      <div className="row">
        <div className="col-md-7 col-lg-8 col-xl-9">
          <AppRoute/>
        </div>
        <div className="col-md-5 col-lg-4 col-xl-3">
          <OnlineContact />
        </div>
      </div>
    </div>
  );
}
export default Home;
