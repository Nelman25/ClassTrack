import { useEffect } from "react";
import { subscribeToStudents } from "../reducers/studentSlice";
import { useDispatch, useSelector } from "react-redux";

const useFetchStudents = ({ classId, uid }) => {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.students);

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToStudents({ classId, uid }));

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [classId, dispatch, uid]);
  return { students, loading };
};

export default useFetchStudents;
