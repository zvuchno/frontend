export type NavPanelDropdownItem = {
  id: string;
  href: string;
  label: string;
};

export type NavPanelItem = NavPanelDropdownItem & {
  dropdownItems?: readonly NavPanelDropdownItem[];
};

export type NavPanelProps = {
  className?: string;
  items?: readonly NavPanelItem[];
  defaultOpenItemId?: string;
};
