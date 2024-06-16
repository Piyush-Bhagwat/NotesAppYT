import { useContext, useState } from "react";
import "./App.css";
import Note from "./components/Note";
import { noteConext } from "./context/noteContext";

function App() {
    const [showCard, setSetShowCard] = useState(false);
    const [newText, setNewText] = useState("");
    const { notes, addNote } = useContext(noteConext);

    const renderNotes = () => {
        return notes?.map((note, idx) => (
            <Note text={note.text} date={note.date} id={idx} />
        ));
    };

    const handleAdd = () => {
        const newCard = {
            text: newText,
            date: Date.now(),
        };

        setNewText("");
        setSetShowCard(false);

        addNote(newCard);
    };

    return (
        <div className="app">
            <div className="sidebar">
                <h3>Notepal</h3>

                <button
                    className="btn"
                    onClick={() => setSetShowCard(!showCard)}
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>

            <div className="content">
                <h1>Notes</h1>

                <div className="notes-container">
                    {showCard && (
                        <div className="new-note note">
                            <textarea
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                cols={50}
                                rows={20}
                            ></textarea>

                            <button className="btn" onClick={handleAdd}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                        </div>
                    )}

                    {renderNotes()}
                </div>
            </div>
        </div>
    );
}

export default App;
