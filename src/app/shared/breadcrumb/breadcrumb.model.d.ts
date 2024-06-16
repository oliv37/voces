export interface BreadCrumbItem {
  url: string;
  label: string;
}

export type BreadCrumb = BreadCrumbItem[];

export interface BreadCrumbProvider {
  match: (url: string) => boolean;
  get: (url: string) => BreadCrumb;
}
