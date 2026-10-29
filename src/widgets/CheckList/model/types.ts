export type TCheckListResponse = {
  add_first_product: boolean;
  payout_details: boolean;
  cdek_integration: boolean;
  telegram_bot: boolean;
  publish_first_product: boolean;
  email_verified: boolean;
  artist_cover: boolean;
}

export type TCheckListActionMap = Partial<{
  [K in keyof TCheckListResponse]: () => Promise<void> | void;
}>;

export type CheckListProps = {
  artistSlug: string;
  hasProducts: boolean;
  title?: string;
  icon?: React.ReactNode;
  actions?: TCheckListActionMap;
};

export type CheckListItemProps = {
  itemKey: keyof TCheckListResponse
  index: number;
  isDone: boolean;
  hasProduct: boolean;
  actions?: TCheckListActionMap;
};

export type ActionType = "button" | "link" | "none";

export interface ConfigItem {
  label: string;
  actionType: ActionType;
  href?: string;
};