import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./config/firebase";

export const createClass = async (newClass, uid) => {
  try {
    await addDoc(collection(db, "Users", uid, "Classes"), newClass);
  } catch (error) {
    console.error(error);
  }
};

export const addStudentToDB = async (newStudent, classId, uid) => {
  try {
    await addDoc(
      collection(db, "Users", uid, "Classes", classId, "Students"),
      newStudent
    );
    updateClassSize(uid, classId);
  } catch (error) {
    console.error(error);
  }
};

export const saveAttendanceToDB = async (attendanceData, classId, docId) => {
  const docRef = doc(db, `Classes/${classId}/Attendance/${docId}`);
  try {
    await updateDoc(docRef, attendanceData);
    console.log("Attendance saved! :", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

const updateClassSize = async (uid, classId) => {
  try {
    const docRef = doc(db, "Users", uid, "Classes", classId);
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

export const updateGradesToDB = async (changes, classId, uid) => {
  try {
    await Promise.all(
      changes.map(async (change) => {
        const docRef = doc(
          db,
          "Users",
          uid,
          "Classes",
          classId,
          "Students",
          change.docId
        );
        await updateDoc(docRef, change);
        console.log("Student data successfully updated");
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateAttendanceToDB = async (uid, classId, dates, records) => {
  try {
    const docRef = doc(db, "Users", uid, "Classes", classId);
    await updateDoc(docRef, { records, dates });
    console.log("Successfully updated attendance!");
  } catch (err) {
    console.error(err);
  }
};

export const fetchUser = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in.");

  const docRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("User document not found.");
  }
};
