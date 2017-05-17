
export interface IResource<T> {
  type: string;
  data: T;
  show?: boolean;
  enabled?: boolean;
}

export interface ILayoutResources {
  [index: string]: IResource<any>;
}
