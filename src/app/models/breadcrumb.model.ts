export interface BreadcrumbItem {
  url: string;
  label: string;
  bgColor?: string;
  isBold?: boolean;
}

export type Breadcrumb = BreadcrumbItem[];
