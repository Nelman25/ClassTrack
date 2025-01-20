import { useEffect } from "react";
import { subscribeToClasses } from "../reducers/classSlice";
import { useDispatch, useSelector } from "react-redux";

const useClassManagement = (uid) => {
  const dispatch = useDispatch();
  const { classes, loading } = useSelector((state) => state.classes);

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToClasses(uid));

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch, uid]);

  return { classes, loading };
};

export default useClassManagement;
