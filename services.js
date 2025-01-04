import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
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
    updateClassSize(classId);
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

const updateClassSize = async (classId) => {
  try {
    const docRef = doc(db, "Classes", classId);
    const docSnap = await getDoc(docRef);
    const selectedClass = docSnap.data();
    console.log(selectedClass);
    await updateDoc(docRef, {
      classSize: selectedClass.classSize + 1,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateGradesToDB = async (changes, classId) => {
  try {
    await Promise.all(
      changes.map(async (change) => {
        const docRef = doc(db, "Classes", classId, "Students", change.docId);
        await updateDoc(docRef, change);
        console.log("Student data successfully updated");
      })
    );
  } catch (error) {
    console.error(error);
  }
};
