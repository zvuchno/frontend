export {};

interface YooMoneyCheckoutWidgetConfig {
  confirmation_token: string;
  return_url: string;
  customization?: {
    modal?: boolean;
    colors?: {
      control_primary?: string;
      background?: string;
    };
  };
  error_callback?: (error: {
    type: string;
    description: string;
    params?: Record<string, string>;
  }) => void;
}

export interface YooMoneyCheckoutWidgetInstance {
  render: () => void;
  destroy: () => void;
}

declare global {
  interface Window {
    YooMoneyCheckoutWidget: new (
      config: YooMoneyCheckoutWidgetConfig
    ) => YooMoneyCheckoutWidgetInstance;
  }
}
