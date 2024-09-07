import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import useCategories from "@hooks/useCategories";
import { TCategory } from "@types";

const Categories = () => {
  const { error, loading, records } = useCategories();
  return (
    <>
      <Heading title="Categories"></Heading>
      <Loading error={error} status={loading} type="category">
        <GridList<TCategory>
          records={records}
          renderItem={(records) => <Category {...records} />}
          emptyMessage="There are no categories"
        />
      </Loading>
    </>
  );
};

export default Categories;
