import { Suspense } from "react";
import CatalogList from "../components/catalogList/CatalogList";
import { TRANSLATIONS } from "@/shared/utils/translations";

export async function generateMetaData({
  params
}: { params: Promise<{ category: string }> }) {

  const { category } = await params;
  return {
    title: TRANSLATIONS[category] || category,
    description: `Музыкальные товары в категории: "${TRANSLATIONS[category] || category}" магазина "Звучно"`
  }
};

// searchParams тоже получать в пропсах

const CategoryPage = async ({ 
  params 
}: {
  params: Promise<{ category: string }>
}) => {

  const { category } = await params;

  // const products = [
  //   {
  //     id: 1,
  //     image: '/artist-image.png',
  //     title: "ОДИН МАНУЛ",
  //     description: "Винил ОДИН МАНУЛ (LP, 2025)",
  //     price: "1000",
  //   },
  // ]

  return (
    <Suspense fallback={<div>Загрузка товаров...</div>}>
      <div>Страница категории: {category}</div>
      <CatalogList
        category={category} 
        //basePath={`/catalog/${category}`} 
      />
    </Suspense>
  )
}

export default CategoryPage;