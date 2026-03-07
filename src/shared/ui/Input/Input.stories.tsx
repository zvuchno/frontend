import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Input from "./Input";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  component: Input,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Input>;

export const SmallInput: Story = {
  render: () => {
    const [password, setPassword] = useState('');

    return (
      <div style={{ width: 440 }}>
        <Input
          value={password}
          id="1"
          isRequired
          label="Пароль"
          placeholder="Введите пароль"
          onChange={(e) => setPassword(e.target.value)}
          inputSize="small"
        />
      </div>
    )
  }
};

export const SmallInputWithError: Story = {
  render: () => {
    const [password, setPassword] = useState('123');
    
    return (
      <div style={{ width: 440 }}>
        <Input
          value={password}
          id="2"
          isRequired
          label="Пароль"
          error
          message='Длина пароля не меньше 4 символов'
          onChange={(e) => setPassword(e.target.value)}
          inputSize="small"
        />
      </div>
    )
  }
};

export const LargeInput: Story = {
  render: () => {
    const [name, setName] = useState('');
    
    return (
      <div style={{ width: 440 }}>
        <Input
          value={name}
          id="2"
          isRequired={false}
          label="Название"
          onChange={(e) => setName(e.target.value)}
          inputSize="large"
        />
      </div>
    )
  }
};

export const Textarea: Story = {
  render: () => {
    const [name, setName] = useState('');
    
    return (
      <div style={{ width: 950 }}>
        <Input
          value={name}
          id="3"
          placeholder="Это описание будут видеть ваши слушатели"
          isRequired={false}
          multiline
          label="Описание"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    )
  }
}