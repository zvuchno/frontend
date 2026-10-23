"use client";

import { FormProvider, useForm } from "react-hook-form";

import { EMPTY_PROFILE_FORM_VALUES } from "@/screens/artist/profile/form.utils";

import { AccountLayout } from "@/widgets/layout/account/AccountLayout";

import { type FieldValues } from "@/features/profile";

import { ArtistProfileEditModeProvider, useCurrentArtist } from "@/entities/profile";

import { Loader } from "@/shared/ui";

import s from "./layout.module.scss";

const ArtistLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useCurrentArtist();

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: EMPTY_PROFILE_FORM_VALUES,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.page}>
          <ArtistProfileEditModeProvider>
            <FormProvider {...methods}>
              <AccountLayout>{children}</AccountLayout>
            </FormProvider>
          </ArtistProfileEditModeProvider>
        </div>
      )}
    </>
  );
};

export default ArtistLayout;
