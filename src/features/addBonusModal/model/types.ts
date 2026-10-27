type TBonusItem = {
  id: number;
  name: string;
};

export type TBonusList = TBonusItem[];

export type TBonusDetail = TBonusItem & {
  bonus_file: File;
  description?: string; 
};

export type TBonusFormValues = {
  bonus_file: File | null;
  name: string;
  description?: string;
};

export type TCreateBonusPayload = TBonusFormValues & {
  album: number
};

export type TCreateBonusResponse = TCreateBonusPayload & {
  id: number;
};

export type TUpdateBonusPayload = Partial<TCreateBonusPayload>