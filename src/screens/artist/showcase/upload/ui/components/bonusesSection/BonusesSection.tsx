import { useBonusInfiniteQuery } from "@/entities/Artist";
import { ButtonUI, Text, Title } from "@/shared/ui";
import { ShowcaseBonusList } from "@/widgets/ShowcaseBonusList";
import s from "./BonusesSection.module.scss";

type BonusesSectionProps = {
  releaseId: number | null;
  isSubmitting: boolean;
  onUploadBonus: () => void;
  onEditBonus: (id: number) => void;
  onChangeBonusesOrder: (ids: number[]) => void;
  onDeleteBonus: (id: number) => void;
};

export const BonusesSection = ({ 
  releaseId, 
  isSubmitting,
  onUploadBonus, 
  onEditBonus,
  onChangeBonusesOrder,
  onDeleteBonus,
}: BonusesSectionProps) => {

  const {
    data: bonuses,
    error: bonusesError,
    fetchNextPage,
    isLoading: bonusesLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useBonusInfiniteQuery("release", releaseId);
  const bonusesList = bonuses?.pages.flatMap((page) => page.results) ?? [];

  const handleDeleteBonus = async (id: number) => {
    onDeleteBonus(id);
  };

  const handleOnUploadBonusClick = () => {
    onUploadBonus();
  };

  const handleOnEditClick = (id: number) => {
    onEditBonus(id);
  };

  const handleOnChangeBonusesOrder = (ids: number[]) => {
    onChangeBonusesOrder(ids);
  };

  return (
    <section className={s.uploadContainer}>
      <Title Tag="h4" className={s.uploadContainer__title}>Добавление бонуса (опционально)</Title>
      <Text className={s.uploadContainer__hint}>
        Файлы получат фанаты, купившие релиз целиком. Обложка в высоком разрешении добавляется автоматически.
      </Text>
  
        <ButtonUI
          variant="primary"
          type="button"
          onClick={handleOnUploadBonusClick}
          disabled={isSubmitting}
          className={s.uploadContainer__uploadButton}
        >
          Добавить бонус
        </ButtonUI>

      <div className={s.uploadContainer__list}>
        <ShowcaseBonusList 
          bonusList={bonusesList} 
          bonusError={bonusesError}
          isLoading={bonusesLoading}
          isFetching={isFetchingNextPage}
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          onDeleteBonus={handleDeleteBonus}
          onEditBonus={handleOnEditClick}
          onOrderChange={handleOnChangeBonusesOrder}
        />
      </div>
    </section>
  )
};