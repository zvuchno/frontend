type TempEntry = {
  provider: "vk" | "yandex";
  accessToken: string;
  expiresAt: number;
};

const store = new Map<string, TempEntry>();
const TTL = 5 * 60 * 1000; // 5 минут

export function generateState(): string {
  return crypto.randomUUID();
};

export function saveOAuthState(state: string, data: Omit<TempEntry, "expiresAt">) {
  store.set(state, { ...data, expiresAt: Date.now() + TTL });
};

export function getOAuthState(state: string): TempEntry | null {
  const entry = store.get(state);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(state);
    return null;
  }
  return entry;
};

export function deleteOAuthState(state: string) {
  store.delete(state);
};