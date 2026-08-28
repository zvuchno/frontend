"use client";

import { CheckboxUI } from "@/shared/ui";
import type { ArtistRegisterFormData } from "../../../model/ArtistRegisterForm.types";
import s from "./ArtistConsentsFields.module.scss";

export const ArtistConsentsFields = ({
  disabled,
  data,
  handleFieldChange,
}: {
  disabled: boolean;
  data: ArtistRegisterFormData;
  handleFieldChange: (
    field: keyof ArtistRegisterFormData
  ) => (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}
) => {

  return (
    <div className={s.consentsContainer}>

      <CheckboxUI 
        type="checkbox"
        name="artist_offer"
        isChecked={data.artist_offer}
        disabled={disabled}
        onChange={handleFieldChange("artist_offer")}
      >
        Я согласен с условиями{" "}
        <a 
          href="/legal/artist_offer" 
          target="_blank" 
          rel="noopener noreferrer"
          className={s.link}
        >
          оферты *
        </a>
      </CheckboxUI>

      <CheckboxUI 
        type="checkbox"
        name="privacy_policy"
        isChecked={data.artist_personal_data}
        disabled={disabled}
        onChange={handleFieldChange("artist_personal_data")}
      >
        Я даю{" "}
        <a 
          href="/legal/artist_personal_data" 
          target="_blank" 
          rel="noopener noreferrer"
          className={s.link}
        >
          согласие на обработку персональных данных
        </a>
        {" "}в соответствии с{" "}
        <a 
          href="/legal/privacy_policy" 
          target="_blank" 
          rel="noopener noreferrer"
          className={s.link}
        >
          политикой обработки персональных данных *
        </a>
      </CheckboxUI>

      <CheckboxUI 
        type="checkbox"
        name="artist_distribution"
        isChecked={data.artist_distribution}
        disabled={disabled}
        onChange={handleFieldChange("artist_distribution")}
      >
        Я даю согласие{" "}
        <a 
          href="/legal/artist_distribution" 
          target="_blank" 
          rel="noopener noreferrer"
          className={s.link}
        >
          на распространение персональных данных *
        </a>
      </CheckboxUI>

      <CheckboxUI 
        type="checkbox"
        name="artist_newsletter"
        isChecked={data.artist_newsletter}
        disabled={disabled}
        onChange={handleFieldChange("artist_newsletter")}
      >
        Я даю {" "}
        <a 
          href="/legal/artist_newsletter" 
          target="_blank" 
          rel="noopener noreferrer"
          className={s.link}
        >
          согласие на рекламную и информационную рассылку
        </a>
      </CheckboxUI>
    </div>
  );
}