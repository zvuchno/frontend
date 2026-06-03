import { getGenresKinds } from "@/api/genresKinds/genresKindsApi";
import { Suspense } from "react";
import { FiltersProvider } from "./provider/FiltersProvider";

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