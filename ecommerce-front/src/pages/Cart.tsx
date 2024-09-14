import useCart from "@hooks/useCart";
import { Heading } from "@components/common";
import { Loading, LottieHandler } from "@components/feedback";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";

const Cart = () => {
  const {
    loading,
    error,
    products,
    changeQuantityHandler,
    removeItemHandler,
    userAccessToken,
    placeOrderStatus,
  } = useCart();
  return (
    <>
      <Heading title="Your Cart" />
      <Loading status={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler
            message="Your order hase been placed successfuly"
            type="success"
          />
        ) : (
          <LottieHandler message="Your cart is empty" type="empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
