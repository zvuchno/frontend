import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { BaseForm } from "./BaseForm";
import { Typography } from "@/shared/ui/Typography/Typography";
import { ButtonUI } from "@/shared/ui/button/ButtonUI";

const meta: Meta<typeof BaseForm> = {
  title: "Shared/BaseForm",
  component: BaseForm,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    className: { control: "text" },
    isLoading: { control: "boolean", defaultValue: false },
  },
  args: {
    onSubmit: fn(),
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof BaseForm>;

export const Default: Story = {
  args: {
    title: "Заголовок формы",
  },
};


export const WithFields: Story = {
  args: {
    title: "Вход",
    isLoading: false,
  },
  render: (args) => (
    <BaseForm
      {...args}
      renderFields={() => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>
              Пароль
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>
        </div>
      )}
    />
  ),
};

export const WithButtons: Story = {
  args: {
    title: "Подтверждение",
    isLoading: false,
  },
  render: (args) => (
    <BaseForm
      {...args}
      renderFields={() => (
        <Typography variant="normal">
          Вы уверены, что хотите продолжить?
        </Typography>
      )}
      renderPrimaryButton={(loading) => (
        <ButtonUI size="small" type="submit" variant="primary" disabled={loading}>
           {loading ? (
            <>
              {}
              <svg 
                className="animate-spin -ml-1 mr-2 h-4 w-4" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Обработка...
            </>
          ) : (
            "Подтвердить"
          )}
        </ButtonUI>
      )}
      renderSecondaryButton={() => (
        <ButtonUI size="small" type="button" variant="secondary">
          Отмена
        </ButtonUI>
      )}
    />
  ),
};

export const WithClose: Story = {
  args: {
    title: "Модальное окно",
    onClose: fn(),
  },
  render: (args) => (
    <div style={{ 
      padding: "24px", 
      background: "#fff", 
      borderRadius: "12px", 
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      maxWidth: "400px",
      margin: "0 auto"
    }}>
      <BaseForm {...args} />
    </div>
  ),
};

