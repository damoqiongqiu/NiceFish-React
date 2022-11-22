import { injectable } from "src/base/common/injector";
import Service from "src/base/common/Service";

interface Storage {
  setKeyValue(key: string, val: any): void;
  getKey(key: string): string | null;
  clearKey(key: string): void;
}

@injectable("StorageService")
class StorageService extends Service implements Storage {
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
