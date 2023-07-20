//tsconfig.json 会使用此类型定义文件

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.wasm';
declare module "data:text/javascript,export default 'title'";
declare const AUTHOR: string;

interface Window {
  __useService: any;
}
