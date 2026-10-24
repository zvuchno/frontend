"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { type SubmitHandler, get, useFormContext } from "react-hook-form";

import { useAccountActions } from "@/features/AccountActions/context/useAccountActions";

import { useUpdateArtistLegalData } from "@/entities/Artist";
import { useArtistLegalDataStore } from "@/entities/Artist/store/useArtistLegalDataStore";

import { setServerErrors } from "@/shared/utils/serverErrorsHandler";

//import { parseDateFromApi } from "@/shared/utils/formatDate";

import styles from "./artistFormPersonal.module.scss";
import { LegalEntityFieldset } from "./components/LegalEntityFieldset/LegalEntityFieldset";
import { PassportFieldset } from "./components/PassportFieldset/PassportFieldset";
import { PaymentFieldset } from "./components/PaymentFieldset/PaymentFieldset";
import { PersonalFieldset } from "./components/PersonalFieldset/PersonalFieldset";
import {
  artistEntityPaymentFields,
  artistIndividualPaymentFields,
  artistLegalEntityFields,
  artistPasportFields,
  artistPersonalFields,
} from "./utils/constants";
import type { FieldValues, TArtistFormPersonalProps } from "./utils/types";

const formatPhoneForApi = (phone: string | undefined): string => (phone ? `+${phone}` : "");

const isLegalEntity = (
  ...values: Array<FieldValues["legal_profile"]["recipient_type"] | undefined>
): boolean => values.includes("legal_entity");

const areFormValuesEqual = (current: unknown, initial: unknown): boolean => {
  if ((current == null || current === "") && (initial == null || initial === "")) return true;
  if (Object.is(current, initial)) return true;
  if (
    current === null ||
    initial === null ||
    typeof current !== "object" ||
    typeof initial !== "object"
  ) {
    return false;
  }

  if (Array.isArray(current) || Array.isArray(initial)) {
    return (
      Array.isArray(current) &&
      Array.isArray(initial) &&
      current.length === initial.length &&
      current.every((value, index) => areFormValuesEqual(value, initial[index]))
    );
  }

  const currentRecord = current as Record<string, unknown>;
  const initialRecord = initial as Record<string, unknown>;
  const keys = new Set([...Object.keys(currentRecord), ...Object.keys(initialRecord)]);

  return [...keys].every((key) => areFormValuesEqual(currentRecord[key], initialRecord[key]));
};

const normalizePhone = (value: unknown): string => {
  const digits = typeof value === "string" ? value.replace(/\D/g, "") : "";
  return digits.length === 11 && digits.startsWith("7") ? digits.slice(1) : digits;
};

export const ArtistFormPersonal = ({ values }: TArtistFormPersonalProps) => {
  const { mutate, isPending } = useUpdateArtistLegalData();

  const { setAccountActions } = useAccountActions();

  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const artistTypeFromServer = values?.legal_profile?.recipient_type;
  const artistTypeFromStore = useArtistLegalDataStore((state) => state.artistLegalData)
    ?.legal_profile?.recipient_type;

  const isCompany = isLegalEntity(artistTypeFromServer, artistTypeFromStore);

  const methods = useFormContext<FieldValues>();

  const {
    trigger,
    handleSubmit,
    watch,
    setError,
    formState: { isValid },
  } = methods;
  const currentValues = watch();
  const editableFields = [
    ...artistPersonalFields,
    ...artistPasportFields,
    ...artistIndividualPaymentFields,
    ...artistLegalEntityFields,
    ...artistEntityPaymentFields,
  ];
  const hasChanges = editableFields.some(({ name }) => {
    const currentValue = get(currentValues, name);
    const initialValue = get(values, name);

    if (name === "legal_profile.phone") {
      return normalizePhone(currentValue) !== normalizePhone(initialValue);
    }

    return !areFormValuesEqual(currentValue, initialValue);
  });

  useEffect(() => {
    if (values && values !== null) {
      void trigger();
    }
  }, [values, trigger]);

  const recipientType = currentValues.legal_profile?.recipient_type;

  useEffect(() => {
    void trigger("legal_profile.recipient_type");
  }, [recipientType, trigger]);

  const onHandleSubmit = useCallback<SubmitHandler<FieldValues>>(
    (data: FieldValues) => {
      const currentRecipientType = methods.getValues("legal_profile.recipient_type") ?? "";
      const currentRecipientTypeForServer =
        currentRecipientType === "individual_temporary" ? "" : currentRecipientType;
      const formattedData = {
        ...data,
        legal_profile: {
          ...data.legal_profile,
          phone: formatPhoneForApi(data.legal_profile?.phone),
          recipient_type: currentRecipientTypeForServer,
        },
      };

      mutate(formattedData, {
        onSuccess: () => {
          setServerErrorMessage("");
        },

        onError: (error) => {
          setServerErrors(
            [
              ...artistPasportFields,
              ...artistPersonalFields,
              ...artistIndividualPaymentFields,
              ...artistEntityPaymentFields,
            ],
            error,
            setError,
            setServerErrorMessage
          );
        },
      });
    },
    [methods, mutate, setError]
  );

  const onSubmit = useCallback(() => {
    void handleSubmit(onHandleSubmit)();
  }, [handleSubmit, onHandleSubmit]);

  useLayoutEffect(() => {
    setAccountActions({
      dataStatus: values?.legal_profile?.is_verified
        ? "is-confirmed"
        : values?.legal_profile?.is_ready_for_verification
          ? "on-review"
          : "not-completed",
      dataStatusComment: values?.legal_profile?.comment,
      primaryButtonTitle: "Coхранить",
      primaryDisabled: !(hasChanges && isValid) || isPending,
      onClickPrimaryBtn: onSubmit,
    });
    return () => setAccountActions(null);
  }, [
    onSubmit,
    setAccountActions,
    values?.legal_profile?.is_verified,
    values?.legal_profile?.is_ready_for_verification,
    values?.legal_profile?.comment,
    hasChanges,
    isValid,
    isPending,
  ]);

  return (
    <form className={styles.form} onSubmit={(e) => void handleSubmit(onHandleSubmit)(e)}>
      <fieldset className={styles.fieldsetWrapper}>
        <div className={styles.formContentWrapper}>
          {isCompany && (
            <>
              <LegalEntityFieldset methods={methods} />
              <PaymentFieldset methods={methods} isCompany={isCompany} />
            </>
          )}

          <PersonalFieldset methods={methods} isCompany={isCompany} />

          <PassportFieldset methods={methods} isCompany={isCompany} />

          {!isCompany && <PaymentFieldset methods={methods} isCompany={!isCompany} />}
        </div>
      </fieldset>

      {serverErrorMessage.length > 0 && <p className={styles.formError}>{serverErrorMessage}</p>}
    </form>
  );
};
