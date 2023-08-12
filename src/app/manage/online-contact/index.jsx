import React from 'react';

export default props => {
  // TODO:实现业务逻辑，与服务端对接。
  return (
    <div className="online-contact-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">QQ群-请勿加多个</h3>
        </div>
        <div className="list-group">
          <a target="_blank"
            href="//shang.qq.com/wpa/qunwpa?idkey=5d6b8c5296e4806142b8422ae7abca6f27b9b9b992a4dac80dc1392644e8970a"
            className="list-group-item"><i className="fa fa-qq" aria-hidden="true"></i> 脚本娃娃-桃花岛:83163037</a>
        </div>
      </div>
    </div>
  );
};
