import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArtistFormPersonal } from "./ArtistFormPersonal";
import type { FieldValues } from "./utils/types";

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
      }, [args.values, methods, args.isOnChange]);

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
