import React, { FC } from 'react';
import OnlineContact from './online-contact';
import Read from 'src/containers/read';

const Home: FC = () => {
  return (
    <div className="container-xl mtb-16px ">
      <div className="row">
        <div className="col-md-7 col-lg-8 col-xl-9">
          <Read />
        </div>
        <div className="col-md-5 col-lg-4 col-xl-3">
          <OnlineContact />
        </div>
      </div>
    </div>
  );
};
export default Home;
