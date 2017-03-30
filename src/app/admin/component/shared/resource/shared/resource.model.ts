
export interface IResource<T> {
  type: string;
  data: T;
}

export interface ILayoutResources {
  [index: string]: IResource<any>;
}
