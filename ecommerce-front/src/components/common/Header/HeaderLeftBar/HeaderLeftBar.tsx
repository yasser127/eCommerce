import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import { useAppSelector } from "@store/hooks";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import WishListIcon from "@assets/svg/wishlist.svg?react";
import CartIcon from "@assets/svg/cart.svg?react";
import styles from "./style.module.css";

const { headerLeftBar } = styles;

const HeaderLeftBar = () => {
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        to="wishlist"
        totalQuantity={wishlistTotalQuantity}
        title="wishlist"
        svgIcon={<WishListIcon title="wishlist" />}
      />
      <HeaderCounter
        to="cart"
        title="cart"
        totalQuantity={cartTotalQuantity}
        svgIcon={<CartIcon title="cart" />}
      />
    </div>
  );
};

export default HeaderLeftBar;
