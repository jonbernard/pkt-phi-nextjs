export interface FooterLinkData {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

export interface CategoryLinkData {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}
