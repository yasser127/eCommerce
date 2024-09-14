import CategorySkeleton from "@components/skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "@components/skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "@components/skeletons/CartSkeleton/CartSkeleton";
import { TLoading } from "@types";
import TableSkeleton

const skeletonTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof skeletonTypes;
};

const Loading = ({
  status,
  error,
  children,
  type = "category",
}: LoadingProps) => {
  const Component = skeletonTypes[type];
  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return <div>{error}</div>;
  }
  return <div>{children}</div>;
};

export default Loading;
