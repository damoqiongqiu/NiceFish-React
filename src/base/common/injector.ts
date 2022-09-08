import { Container, injectable } from "inversify";
import getDecorators from "inversify-inject-decorators";
import "reflect-metadata";

const container = new Container({
  defaultScope: "Singleton", // 使用单例模式
  autoBindInjectable: true, // 自动创建实例
});

const serviceMap = new Map();
const tagServices = new Set();
const enhancedInjectable =
  (serviceName = "") =>
  (target: any) => {
    if (serviceName) {
      tagServices.add(serviceName);
    }
    const name = serviceName || target.name;
    if (!serviceMap.has(name)) {
      serviceMap.set(name, target);
    }
    return injectable()(target);
  };

// 获取并自动创建实例
const useService = <T>(serviceIdentifier: (new () => T) | string): T => {
  if (typeof serviceIdentifier === "string") {
    if (!tagServices.has(serviceIdentifier)) {
      throw new Error(
        `service ${serviceIdentifier} dose use injectable with name`
      );
    }
    if (!serviceMap.has(serviceIdentifier)) {
      throw new Error(`can not use un injectable class ${serviceIdentifier}`);
    }
    serviceIdentifier = serviceMap.get(serviceIdentifier);
  }
  return container.get(serviceIdentifier);
};

if (typeof window !== "undefined") {
  window.__useService = useService;
}

const DECORATORS = getDecorators(container);

interface IBabelPropertyDescriptor extends PropertyDescriptor {
  initializer(): any;
}

// 解决react下无法注入的问题
const inject = function () {
  // the 'descriptor' parameter is actually always defined for class fields for Babel, but is considered undefined for TSC
  // so we just hack it with ?/! combination to avoid "TS1240: Unable to resolve signature of property decorator when called as an expression"
  return function (
    this: any,
    proto: any,
    key: string,
    descriptor?: IBabelPropertyDescriptor
  ): void {
    // 使用反射，在构造时自动获取依赖的原型
    const serviceIdentifier = Reflect.getMetadata("design:type", proto, key);
    // 使用延迟注入
    const original = DECORATORS.lazyInject(serviceIdentifier);

    // make it work as usual
    original.call(this, proto, key);
    // return link to proto, so own value wont be 'undefined' after component's creation
    descriptor!.initializer = function () {
      return proto[key];
    };
  };
};

function createInjectMiddleware(useService: any) {
  const reg = new RegExp(/\@([a-zA-Z]+)\/([a-zA-Z]+)/);
  return () => (next: any) => (action: any) => {
    // 先经过其他中间件，比如redux记录等
    next(action);

    const { type = "" } = action;
    const res = type.match(reg);
    if (res !== null) {
      const serviceName = res[1];
      const method = res[2];
      const instance = useService(serviceName);
      if (typeof instance[method] !== "function") {
        throw new Error(`can not find method ${serviceName}.${method}`);
      }
      const { payload = [] } = action;
      if (!Array.isArray(payload)) {
        throw new Error(`type ${type}'s payload should be array`);
      }

      return instance[method](...payload);
    }
  };
}

const injectMiddleware = createInjectMiddleware(useService);

export {
  container,
  useService,
  enhancedInjectable as injectable,
  inject,
  injectMiddleware,
};
