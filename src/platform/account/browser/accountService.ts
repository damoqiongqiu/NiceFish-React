import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import StorageService from "src/platform/storage/browser/storageService";
import { injectable, inject } from "src/base/common/injector";
import Service from "src/base/common/Service";

@injectable("AccountService")
class AccountService extends Service {
  @inject() storageService: StorageService;
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
