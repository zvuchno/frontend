import { Meta, StoryObj } from "@storybook/nextjs-vite";
import RoleSelectBlock from "./RoleSelectBlock";
import { Text, Title } from "@/shared/ui/Typography/Typography";
import RoleCard from "@/shared/ui/RoleCard/RoleCard";

const meta: Meta<typeof RoleSelectBlock> = {
  title: 'features/auth/RoleSelectBlock',
  component: RoleSelectBlock,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof RoleSelectBlock>;

const cassetteImage = './src/shared/assets/images/cassette.png';
const shirtImage = './src/shared/assets/images/shirt.png';
const earpiecesImage = './src/shared/assets/images/earpieces.png';
const recordImage = './src/shared/assets/images/record.png';

export const RoleSelectBlockInModal: Story = {
  render: () => {
    return (
      <RoleSelectBlock
        renderTitle={() => (
          <Title 
            Tag='h5' 
            variant='title' 
            style={{fontSize: 24, textTransform: "none", lineHeight: '36px'}}
          >
            Войдите или зарегестрируйте новый аккаунт
          </Title>
        )}
        renderText={() => (
          <Text Tag="p" style={{ fontSize: 16, fontWeight: 500}}>
            У вас уже есть аккаунт? <a>Войдите</a>
          </Text>
        )}
      >
        <RoleCard
          path=""
          image={cassetteImage} 
          title="Как испольнитель" 
          description="Продавай мерч, делись новыми релизами и общайся со своими фанатами"
        />
        <RoleCard 
          path=""
          image={recordImage} 
          title="Как испольнитель" 
          description="Продавай мерч, делись новыми релизами и общайся со своими фанатами"
        />
        <RoleCard 
          path=""
          image={earpiecesImage} 
          title="Как испольнитель" 
          description="Продавай мерч, делись новыми релизами и общайся со своими фанатами"
        />
      </RoleSelectBlock>
    )
  }
};

export const RoleSelectBlockInPersonalAccount: Story = {
  render: () => {
    return (
      <RoleSelectBlock>
        <RoleCard 
          path=""
          image={shirtImage} 
          title="Загрузить мерч"
        />
        <RoleCard 
          path=""
          image={shirtImage} 
          title="Загрузить мерч"
        />
        <RoleCard 
          path=""
          image={shirtImage} 
          title="Загрузить мерч"
        />
      </RoleSelectBlock>
    )
  }
};