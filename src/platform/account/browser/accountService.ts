import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import StorageService from 'src/platform/storage/browser/storageService';
import { injectable, inject } from 'src/platform/injector';
import Service from 'src/platform/Service';

interface Account {
  storageService: StorageService;
  useLogin(): string | null;
  useHome(): void;
}
@injectable('AccountService')
class AccountService extends Service implements Account {
  @inject()
  storageService!: StorageService;
  useLogin() {
    return this.storageService.read('user');
  }
  useHome() {
    const isLogin = this.useLogin();
    const navigate = useNavigate();
    useEffect(() => {
      if (isLogin) navigate('/');
    }, []);
  }
}
export default AccountService;
