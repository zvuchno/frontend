export type TDeliveryOption = {
  id: number;
  name: string;
  delivery_type: string;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getDeliveryOptions(): Promise<TDeliveryOption[]> {
  const init: RequestInit = { method: "GET" };

  const response = await fetch(`${baseUrl}/v1/store/deliveries/`, {
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Ошибка получения вариантов доставки: ${response.status}`);
  }
  console.log()
  return response.json() as Promise<TDeliveryOption[]>;
}
