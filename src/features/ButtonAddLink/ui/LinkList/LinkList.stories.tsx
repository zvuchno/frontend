import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LinkList } from './LinkList';

const meta: Meta<typeof LinkList> = {
  title: 'Features/ButtonAddLink/LinkList',
  component: LinkList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof LinkList>;

// ─────────────────────────────────────────────
// 1. Базовый вид — Букинг
// ─────────────────────────────────────────────
export const Booking: Story = {
  args: {
    title: 'Букинг',
    links: [{ id: '1', value: 'booking@gmail.com' }],
    placeholder: 'booking@gmail.com',
    addLabel: '+ Добавить контакт',
    onAdd: () => {},
    onDelete: () => {},
  },
};

// ─────────────────────────────────────────────
// 2. Базовый вид — Вконтакте
// ─────────────────────────────────────────────
export const Vkontakte: Story = {
  args: {
    title: 'Вконтакте',
    links: [{ id: '1', value: 'vk.com/artist' }],
    placeholder: 'vk.com/artist',
    addLabel: '+ Добавить соцсеть',
    onAdd: () => {},
    onDelete: () => {},
  },
};

// ─────────────────────────────────────────────
// 3. Без заголовка
// ─────────────────────────────────────────────
export const NoTitle: Story = {
  args: {
    links: [{ id: '1', value: 'booking@gmail.com' }],
    addLabel: '+ Добавить',
    onAdd: () => {},
    onDelete: () => {},
  },
};

// ─────────────────────────────────────────────
// 4. Пустой список
// ─────────────────────────────────────────────
export const Empty: Story = {
  args: {
    title: 'Букинг',
    links: [],
    addLabel: '+ Добавить контакт',
    onAdd: () => {},
    onDelete: () => {},
  },
};

// ─────────────────────────────────────────────
// 5. Скролл — 5 элементов, видны 3, остальные под скроллом
// ─────────────────────────────────────────────
let scrollCounter = 6;

export const WithScroll: Story = {
  render: () => {
    const [links, setLinks] = useState([
      { id: '1', value: 'booking@gmail.com' },
      { id: '2', value: 'manager@gmail.com' },
      { id: '3', value: 'agent@gmail.com' },
      { id: '4', value: 'promo@gmail.com' },
      { id: '5', value: 'label@gmail.com' },
    ]);

    return (
      <LinkList
        title="Букинг"
        links={links}
        placeholder="new@gmail.com"
        addLabel="+ Добавить контакт"
        onAdd={() =>
          setLinks((prev) => [
            ...prev,
            { id: String(scrollCounter++), value: 'new@gmail.com' },
          ])
        }
        onDelete={(id) =>
          setLinks((prev) => prev.filter((l) => l.id !== id))
        }
      />
    );
  },
};

// ─────────────────────────────────────────────
// 6. Две секции как на макете — Букинг + Вконтакте
// ─────────────────────────────────────────────
let contactCounter = 2;
let socialCounter = 2;

export const FullProfileSection: Story = {
  render: () => {
    const [contacts, setContacts] = useState([
      { id: '1', value: 'booking@gmail.com' },
    ]);

    const [socials, setSocials] = useState([
      { id: '1', value: 'vk.com/artist' },
    ]);

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}
      >
        <LinkList
          title="Букинг"
          links={contacts}
          placeholder="booking@gmail.com"
          addLabel="+ Добавить контакт"
          onAdd={() =>
            setContacts((prev) => [
              ...prev,
              { id: String(contactCounter++), value: '' },
            ])
          }
          onDelete={(id) =>
            setContacts((prev) => prev.filter((c) => c.id !== id))
          }
        />

        <LinkList
          title="Вконтакте"
          links={socials}
          placeholder="vk.com/artist"
          addLabel="+ Добавить соцсеть"
          onAdd={() =>
            setSocials((prev) => [
              ...prev,
              { id: String(socialCounter++), value: '' },
            ])
          }
          onDelete={(id) =>
            setSocials((prev) => prev.filter((s) => s.id !== id))
          }
        />
      </div>
    );
  },
};