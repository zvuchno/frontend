import { AuthModal } from "@/widgets/AuthModal";

import { RoleSelectBlock } from "@/entities/RoleSelectBlock";

import { Link, RoleCard, Text, Title } from "@/shared/ui";

import s from "./RolePage.module.scss";

export const RolePage = () => {
  return (
    <AuthModal>
      <RoleSelectBlock
        renderTitle={() => (
          <Title Tag='h5' variant='title' className={s.title}>
            Войдите или зарегестрируйте новый аккаунт
          </Title>
        )}
        renderText={() => (
          <Text Tag='p' className={s.text}>
            У вас уже есть аккаунт?{" "}
            <Link variant='basic' href='/signin' className={s.link} prefetch={false}>
              Войдите
            </Link>
          </Text>
        )}
      >
        <RoleCard
          path='/signup/fan'
          image='/images/earpieces.png'
          title='Как слушатель'
          description='Покупай мерч, слушай музыку, следи за новостями своих любимых артистов'
        />
        <RoleCard
          path='/signup/artist'
          image='/images/cassette.png'
          title='Как исполнитель'
          description='Продавай мерч, делись новыми релизами и общайся со своими фанатами'
        />
        <RoleCard
          path=''
          image='/images/vinyl_player.png'
          title='Как лейбл'
          description='Продвигай своих артистов, следи за их популярностью, анонсируй релизы'
        />
      </RoleSelectBlock>
    </AuthModal>
  );
};
