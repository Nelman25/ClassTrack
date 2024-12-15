import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";

export const createClass = async (newClass) => {
  try {
    const docRef = await addDoc(collection(db, "Classes"), newClass);
    console.log("Class added with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

export const addStudentToDB = async (newStudent, classId) => {
  try {
    const docRef = await addDoc(
      collection(db, `Classes/${classId}/Students`),
      newStudent
    );
    console.log("Student added with ID : ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

export const saveAttendanceToDB = async (attendanceData, classId, docId) => {
  const docRef = doc(db, `Classes/${classId}/Attendance/${docId}`);
  try {
    const data = await updateDoc(docRef, attendanceData);
    console.log("Attendance saved! :", docRef.id);
  } catch (error) {
    console.error(error);
  }
};
