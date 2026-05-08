import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArtistFormPersonal } from "./ArtistFormPersonal";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import type { FieldValues } from "./utils/types";

const MOCK_DATA: FieldValues = {
  legal_profile: {
    recipient_type: "individual_entrepreneur",
  },
  identity_data: {
    first_name: "Иван",
    last_name: "Иванов",
    middle_name: "Иванович",
    birth_date: new Date("1995-05-08"),
    registration_address: "г. Москва, ул. Пушкина, д. 10, кв. 45",
    passport_series: "4510",
    passport_number: "123456",
    passport_issued_by: "123-123",
    passport_issue_date: new Date("2015-05-20"),
    inn: "770102030405",
    email: "ivanov@ivanov.ru",
    phone: "79991234567",
  },
  bank_data: {
    bank_name: "Банк всея Руси",
    bik: "123456789",
    checking_account: "40802810000000001234",
    correspondent_account: "30101810000000000225",
  },
  company_data: {
    company_name: 'ООО "Рога и копыта"',
    company_address: "г. Москва, ул. Ленина, д. 1",
    inn: "770102030405",
    ogrn: "1234567890123",
  },
};

const FormWithLogic = (args: any) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => setIsEditMode(true);

  const handleSubmit = (data: FieldValues) => {
    console.log("Данные отправлены:", data);
    alert("Данные успешно отправлены");
    setIsEditMode(false);
  };

  return (
    <ArtistFormPersonal
      {...args}
      isOnChange={!isEditMode}
      onEdit={handleEdit}
      onSubmit={handleSubmit}
      isChecked={true}
    />
  );
};

const meta: Meta<typeof ArtistFormPersonal> = {
  title: "features/ArtistFormPersonal",
  component: ArtistFormPersonal,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story, { args }) => {
      const methods = useForm<FieldValues>({
        mode: "onChange",
        defaultValues: undefined,
      });

      useEffect(() => {
        if (args.values) {
          methods.reset(args.values);
          methods.trigger();
          if (args.isOnChange === true) methods.trigger();
        }
      }, [args.values, methods]);

      return (
        <FormProvider {...methods}>
          <div
            style={{
              width: "clamp(280px, 58.2vw, 836px)",
              justifySelf: "center",
              border: "1px dotted #a3a3a3",
              fontFamily: "BetterVCR, monospace",
              backgroundColor: "#ffffff",
            }}
          >
            <Story />
          </div>
        </FormProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof ArtistFormPersonal>;

export const ArtistLegalDataInteractiveForm: Story = {
  render: (args) => <FormWithLogic {...args} />,
};
