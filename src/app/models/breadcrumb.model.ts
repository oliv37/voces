export interface BreadcrumbItem {
  url: string;
  label: string;
  bgColor?: string;
  isBold?: boolean;
  isTrackingWidest?: boolean;
}

export type Breadcrumb = BreadcrumbItem[];
