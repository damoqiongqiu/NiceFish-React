import { injectable } from 'src/platform/injector';
import Service from 'src/platform/Service';

/**
 * 接口隔离原则 ：复用，低偶合，单一职责
 */
interface Reading {
  read(key: string): string | null;
}
interface Saving {
  save(key: string, val: any): void;
}
interface Clearing {
  clear(key: string): void;
}
@injectable('StorageService')
class StorageService extends Service implements Saving, Reading, Clearing {
  save(key: string, val: any) {
    window.localStorage.setItem(key, val);
  }
  read(key: string) {
    return window.localStorage.getItem(key);
  }
  clear(key: string) {
    window.localStorage.removeItem(key);
  }
}

export default StorageService;
