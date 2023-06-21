declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.wasm";
declare module "data:text/javascript,export default 'title'";
declare const AUTHOR: string;

interface Window {
  __useService: any;
}
