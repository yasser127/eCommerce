import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, resetOrderStatus } from "@store/orders/ordersSlice";
import { TProduct } from "@types";

const useOrders = () => {
    const dispatch = useAppDispatch();
    const { loading, error, orderList } = useAppSelector((state) => state.orders);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

    const viewDetailsHandler = (id: number) => {
        const productDetails = orderList.find((order) => order.id === id);
        setShowModal(true);
        const newItems = productDetails?.items ?? [];
        setSelectedProduct((prev) => [...prev, ...newItems]);
    };

    const closeMdoalHandler = () => {
        setShowModal(false);
        setSelectedProduct([]);
    };

    useEffect(() => {
        const promis = dispatch(actGetOrders());
        return () => {
            promis.abort();
            dispatch(resetOrderStatus());
        };
    }, [dispatch]);
    return { loading, error, showModal, viewDetailsHandler, closeMdoalHandler, orderList, selectedProduct }
}

export default useOrders