import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import StorageService from "src/platform/storage/browser/storageService";
import { injectable, inject, useService } from "src/base/common/injector";
import Service from "src/base/common/Service";
@injectable("AccountService")
class AccountService extends Service {
  storageService = useService(StorageService);
  useLogin() {
    return this.storageService.getKey("user");
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
