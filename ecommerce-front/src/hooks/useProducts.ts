import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
    actGetProductsByCatPrefix,
    cleanUpProductsRecords,
} from "@store/products/productsSlice";
const useProducts = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const { loading, error, records } = useAppSelector((state) => state.products);
    const cartItems = useAppSelector((state) => state.cart.items);
    const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);

    useEffect(() => {
        const promis = dispatch(actGetProductsByCatPrefix(params.prefix as string));

        return () => {
            dispatch(cleanUpProductsRecords());
            promis.abort();
        };
    }, [dispatch, params]);

    const productsFullInfo = records.map((el) => ({
        ...el,
        quantity: cartItems[el.id],
        isLiked: wishListItemsId.includes(el.id),
    }));

    return {loading, error, productsFullInfo, params}
}

export default useProducts