import React, { FC } from 'react';
const OnlineContact: FC = () => {
  return (
    <div className="online-contact-container sm-mt-16px">
      <div className="card">
        <div className="card-header">
          <h3 className="font-size-18 m-0">QQ群-请勿加多个</h3>
        </div>
        <div className="list-group">
          <a
            target="_blank"
            href="//shang.qq.com/wpa/qunwpa?idkey=5d6b8c5296e4806142b8422ae7abca6f27b9b9b992a4dac80dc1392644e8970a"
            className="list-group-item border-width-1-0 pd-lr-1rem"
          >
            <i className="fa fa-qq" aria-hidden="true" /> 脚本娃娃-桃花岛:83163037
          </a>
        </div>
      </div>
    </div>
  );
};
export default OnlineContact;
