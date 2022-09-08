import { injectable } from "src/base/common/injector";
import Service from "src/base/common/Service";
@injectable("StorageService")
class StorageService extends Service {
  setKeyValue(key: string, val: any) {
    window.localStorage.setItem(key, val);
  }
  getKey(key: string) {
    return window.localStorage.getItem(key);
  }
  clearKey(key: string) {
    window.localStorage.removeItem(key);
  }
}

export default StorageService;
