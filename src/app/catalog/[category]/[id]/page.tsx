import { fetchCardById } from "@/api/catalog/fetchCardById";
import { DetailPage } from "@/screens/catalog/product";
import { Suspense } from "react";

async function Detail({ 
  params, 
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{kind: 'merch' | 'release' | 'artists'}>
}) {

  const { id } = await params;
  const kind = (await searchParams).kind;

  const card = await fetchCardById(kind, id);

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <DetailPage card={card} kind={kind}/>
    </Suspense>
  )
}

export default Detail;