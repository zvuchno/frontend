import RoleSelectBlock from "@/features/auth/ui/RoleSelectBlock/RoleSelectBlock";
import RoleCard from "@/shared/ui/RoleCard/RoleCard";
import { Text, Title } from "@/shared/ui/Typography/Typography";
import { Link }from "@/shared/ui/Link/Link";
import s from "./RolePage.module.scss";
import ModalPage from "../ModalPage";

const RolePage = () => {

  return (
    <ModalPage>
      <RoleSelectBlock
        renderTitle={() => (
          <Title 
            Tag='h5' 
            variant='title' 
            className={s.title}
          >
            Войдите или зарегестрируйте новый аккаунт
          </Title>
        )}
        renderText={() => (
          <Text Tag="p" className={s.text}>
            У вас уже есть аккаунт? <Link variant="basic" href='/signin' className={s.link}>Войдите</Link>
          </Text>
        )}
      >
        <RoleCard
          path="/signup/fan"
          image="/earpieces.png" 
          title="Как слушатель" 
          description="Покупай мерч, слушай музыку, следи за новостями своих любимых артистов"
        />
        <RoleCard 
          path="/signup/artist"
          image="/cassette.png" 
          title="Как испольнитель" 
          description="Продавай мерч, делись новыми релизами и общайся со своими фанатами"
        />
        <RoleCard 
          path=""
          image="/recordPlayer.png" 
          title="Как лейбл" 
          description="Продвигай своих артистов, следи за их популярностью, анонсируй релизы"
        />
      </RoleSelectBlock>
    </ModalPage>
  )
};

export default RolePage;