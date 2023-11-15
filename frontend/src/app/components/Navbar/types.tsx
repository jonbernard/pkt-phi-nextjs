export interface NavLinkProps {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

export interface MobileNavLinkProps extends NavLinkProps {
  closeMenu: () => void;
}
