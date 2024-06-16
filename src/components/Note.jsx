import React, { useContext } from "react";
import { noteConext } from "../context/noteContext";

const Note = ({ text, date, id }) => {
    const { deleteNote } = useContext(noteConext);

    const getDate = () => {
        const d = new Date(date);

        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    };

    return (
        <div className="note">
            <div className="text">{text}</div>

            <div className="footer">
                <div className="date">{getDate()}</div>
                <button className="btn" onClick={() => deleteNote(id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default Note;
