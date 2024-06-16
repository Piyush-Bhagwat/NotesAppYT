import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    // {add yours here}
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const notesRef = collection(db, "notes");

const fetchDataFromDB = async () => {
    const snapshot = await getDocs(notesRef);
    const notes = [];

    snapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
    });

    return notes;
};

const addNoteToDB = async (newNote) => {
    await addDoc(notesRef, newNote);
    console.log("new note added");
};

const deleteNoteFromDB = async (id) => {
    const docRef = doc(db, "notes", id);

    await deleteDoc(docRef);
    console.log("Documnet deleted");
};

export { fetchDataFromDB, deleteNoteFromDB, addNoteToDB };
