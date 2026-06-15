import { getGenresKinds } from "@/api/catalog/genresKindApi/getGenresKinds";
import { FiltersProvider } from "@/screens/catalog/category";
import { Suspense } from "react";

const CategoryLayout = async ({ children }: {children: React.ReactNode}) => {

  const genresKinds = await getGenresKinds();

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <FiltersProvider genresList={genresKinds}>
        {children}
      </FiltersProvider>
    </Suspense>
  )
};

export default CategoryLayout;