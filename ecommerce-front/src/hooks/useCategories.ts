import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
    actGetCategories,
    categoriesRecordsCleanUp,
} from "@store/categories/categoriesSlice";

const useCategories = () => {
    const dispatch = useAppDispatch();
    const { loading, error, records } = useAppSelector(
        (state) => state.categories
    );

    useEffect(() => {
        const promis = dispatch(actGetCategories());

        return () => {
            dispatch(categoriesRecordsCleanUp());
            promis.abort();
        };
    }, [dispatch]);
    return { loading, error, records }
}

export default useCategories