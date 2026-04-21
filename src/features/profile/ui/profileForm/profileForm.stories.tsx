import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ProfileFormUI } from "./ProfileForm";
import { ProfileFormArtistUI } from "./profileFormArtist";
import { ProfileFormListenerUI } from "./profileFormListener";
import { FieldValues } from "./types";

const ARTIST_DISABLED_FIELDS = ["email"] as const;

const meta: Meta<typeof ProfileFormUI> = {
  title: "features/ProfileForm",
  component: ProfileFormUI,
  parameters: {
    layout: "centered",
    controls: { include: ["children"] },
  },
  argTypes: {
    children: {
      control: "radio",
      options: ["artist", "listener"],
      mapping: {
        artist: (
          <ProfileFormArtistUI
            fieldsDisabled={false}
            disabledFields={ARTIST_DISABLED_FIELDS}
            personalDataHref="/"
          />
        ),
        listener: (
          <ProfileFormListenerUI
            fieldsDisabled={false}
            showPublishHint={false}
          />
        ),
      },
    },
  },
  decorators: [
    (Story, { args }) => {
      const methods = useForm<FieldValues>({
        mode: "onChange",
        defaultValues: {
          name: "Иван Иванов",
          email: "ivan@yandex.ru",
          phone: "71111111111",
          password: "11111111",
          city: "Moscow",
          url: "http://ivanov-ivan.ru",
        },
      });

      useEffect(() => {
        if (args.values) {
          Object.entries(args.values).forEach(([name, value]) => {
            methods.setValue(
              name as keyof FieldValues,
              value as FieldValues[keyof FieldValues],
            );
          });

          if (args.isOnChange === true) {
            void methods.trigger();
          }
        }
      }, [args.isOnChange, args.values, methods]);

      return (
        <FormProvider {...methods}>
          <div
            style={{
              width: "clamp(280px, 58.2vw, 836px)",
              justifySelf: "center",
              border: "1px dotted #a3a3a3",
              fontFamily: "BetterVCR, monospace",
            }}
          >
            <Story args={{ ...args }} />
          </div>
        </FormProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof ProfileFormUI>;

export const ProfileFormNew: Story = {
  args: {
    children: (
      <ProfileFormArtistUI
        fieldsDisabled={false}
        disabledFields={ARTIST_DISABLED_FIELDS}
        personalDataHref="/"
      />
    ),
    values: {
      name: "",
      email: "",
      phone: "",
      password: "",
      city: "",
      url: "",
    },
  },
};

export const ProfileFormCurrent: Story = {
  args: {
    isOnChange: false,
  },
  render: (args) => {
    const [isEditMode, setIsEditMode] = useState(args.isOnChange);
    const handleChange = () => {
      setIsEditMode(true);
    };

    return (
      <ProfileFormUI {...args} isOnChange={isEditMode} onEdit={handleChange}>
        <ProfileFormArtistUI
          fieldsDisabled={!isEditMode}
          disabledFields={ARTIST_DISABLED_FIELDS}
          personalDataHref="/"
        />
      </ProfileFormUI>
    );
  },
};

export const ProfileFormWithErrors: Story = {
  args: {
    children: (
      <ProfileFormArtistUI
        fieldsDisabled={false}
        disabledFields={ARTIST_DISABLED_FIELDS}
        personalDataHref="/"
      />
    ),
    isOnChange: true,
    values: {
      name: "И",
      email: "bjkb",
      phone: "",
      password: "bkjb",
      city: "lbkjjjjbhgbjhmbhhhkhkjhkjhikjhkjhkjhjkbjkbjkbkjbmkk",
      url: "nkl@l",
    },
  },
};

export const ProfileFormWithoutErrors: Story = {
  args: {
    children: (
      <ProfileFormArtistUI
        fieldsDisabled={false}
        disabledFields={ARTIST_DISABLED_FIELDS}
        personalDataHref="/"
      />
    ),
    isChecked: true,
    onSubmit: (data) => {
      console.log(data);
      alert("Форма отправлена");
    },
  },
};

export const ProfileFormWithoutHint: Story = {
  args: {
    children: (
      <ProfileFormArtistUI
        fieldsDisabled={false}
        disabledFields={ARTIST_DISABLED_FIELDS}
        showPublishHint={false}
      />
    ),
    values: {
      name: "",
      email: "",
      phone: "",
      password: "",
      city: "",
      url: "",
    },
  },
};
