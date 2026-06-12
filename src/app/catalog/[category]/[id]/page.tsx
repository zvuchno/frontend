import { getCardById } from "@/api/catalog/cardByIdApi/getCardById";
import { DetailPage } from "@/screens/catalog/product";
import { Suspense } from "react";
import s from "./page.module.scss";

async function Detail({ 
  params, 
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{kind: 'merch' | 'release' | 'artists'}>
}) {

  try {
    const { id } = await params;
    const kind = (await searchParams).kind;

    const card = await getCardById(kind, id);

    return (
      <Suspense fallback={<div>Загрузка...</div>}>
        <DetailPage card={card} kind={kind}/>
      </Suspense>
    )
  } catch {
    return (
      <div className={s.errorContainer}>
        <h2 className={s.errorContainer__title}>Произошла ошибка</h2>
        <p>Не удалось загрузить данные. Попробуйте обновить страницу.</p>
      </div>
    )
  }
};

export default Detail;