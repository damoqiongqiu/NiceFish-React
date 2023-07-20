import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import StorageService from 'src/app/manage/platform/storage/browser/storageService';
import { injectable, inject } from 'src/app/manage/platform/injector';
import Service from 'src/app/manage/platform/Service';

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