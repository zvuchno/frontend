import { useState } from "react";

import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { CustomInput } from "./CustomInput";

const meta: Meta<typeof CustomInput> = {
  title: "shared/Input",
  component: CustomInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CustomInput>;

export const SmallInput: Story = {
  render: () => {
    const [password, setPassword] = useState("");

    return (
      <div style={{ width: 440 }}>
        <CustomInput
          value={password}
          id='1'
          required
          label='Пароль'
          placeholder='Введите пароль'
          onChange={(e) => setPassword(e.target.value)}
          inputSize='small'
        />
      </div>
    );
  },
};

export const SmallInputWithError: Story = {
  render: () => {
    const [password, setPassword] = useState("123");

    return (
      <div style={{ width: 440 }}>
        <CustomInput
          value={password}
          id='2'
          required
          label='Пароль'
          error
          message='Длина пароля не меньше 4 символов'
          onChange={(e) => setPassword(e.target.value)}
          inputSize='small'
        />
      </div>
    );
  },
};

export const LargeInput: Story = {
  render: () => {
    const [name, setName] = useState("");

    return (
      <div style={{ width: 440 }}>
        <CustomInput
          value={name}
          id='2'
          label='Название'
          onChange={(e) => setName(e.target.value)}
          inputSize='large'
        />
      </div>
    );
  },
};

export const Textarea: Story = {
  render: () => {
    const [name, setName] = useState("");

    return (
      <div style={{ width: 950 }}>
        <CustomInput
          value={name}
          id='3'
          placeholder='Это описание будут видеть ваши слушатели'
          multiline
          label='Описание'
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    );
  },
};
