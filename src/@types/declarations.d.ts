
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module '*.json' {
  const content: Record<string, string>;
  export default content;
}
declare module '*.wasm' {
  const content: any;
  export default content;
}
declare module "data:text/javascript,export default 'title'" {
  const value: string;
  export default value
}
declare const AUTHOR: string;
