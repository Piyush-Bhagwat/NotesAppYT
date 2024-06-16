import { createContext, useEffect, useState } from "react";
import { notes as noteData } from "../data/notesData";
import { addNoteToDB, deleteNoteFromDB, fetchDataFromDB } from "../db/firebase";

export const noteConext = createContext(null);

export default function ContextProvider(props) {
    const [notes, setNotes] = useState(null);

    const fetchData = async () => {
        const ar = await fetchDataFromDB();
        setNotes(ar);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (notes) {
            saveToLocal();
        }
    }, [notes]);

    const addNote = (newNote) => {
        setNotes((prev) => {
            if (prev) {
                return [newNote, ...prev];
            }

            return [newNote];
        });

        addNoteToDB(newNote);
    };

    const deleteNote = (idx) => {
        deleteNoteFromDB(notes[idx].id)

        setNotes((prev) => {
            const temp = [...prev];

            temp.splice(idx, 1);

            return temp;
        });
    };

    const saveToLocal = () => {
        localStorage.setItem("notes", JSON.stringify(notes));
    };

    const fetchFromLoacl = () => {
        return JSON.parse(localStorage.getItem("notes"));
    };

    const val = {
        notes,
        addNote,
        deleteNote,
    };

    return (
        <noteConext.Provider value={val}>{props.children}</noteConext.Provider>
    );
}
