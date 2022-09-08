import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import StorageService from "src/platform/storage/browser/storageService";
import { injectable, inject, useService } from "src/base/common/injector";
import Service from "src/base/common/Service";
@injectable("AccountService")
class AccountService extends Service {
  useLogin() {
    const storageService = useService(StorageService);
    const isLogin = storageService.getKey("user");
    return isLogin;
  }
  useHome() {
    const isLogin = this.useLogin();
    const navigate = useNavigate();
    useEffect(() => {
      if (isLogin) navigate("/");
    }, []);
  }
}
export default AccountService;
