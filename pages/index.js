import Head from "next/head";
import { useEffect, useState } from "react";
import * as yup from "yup";

export default function Home() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    const requestOptions = {
      method: "GET",
    };

    fetch(process.env.NEXT_PUBLIC_URL_API + "/notes", requestOptions)
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user, note } = e.currentTarget.elements;

    let schema = yup.object().shape({
      user: yup.string().required(),
      note: yup.string().required(),
    });

    schema.isValid({ user: user.value, note: note.value }).then((valid) => {
      if (!valid) {
        alert("Completa todos los campos.");
        return;
      }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.value, note: note.value }),
      };
      fetch(process.env.NEXT_PUBLIC_URL_API + "/notes", requestOptions).then(
        (response) => {
          if (response.status === 200) {
            alert("Nota agregada con éxito");
            fetchNotes();
            user.value = "";
            note.value = "";
          } else alert("Error en servidor");
        }
      );
    });
  };
  return (
    <>
      <Head>
        <title>WebNotes</title>
        <meta name="description" content="Aplicacion de notas web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>WebNotes</h1>
      <div className="container">
        <section className="addNotes">
          <h2>Nueva Nota</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Usuario</span>
              <input id="user" type="text" maxLength="20" />
            </label>
            <label>
              <span>Nota</span>
              <textarea id="note" />
            </label>
            <button type="submit">Agregar +</button>
          </form>
        </section>
        <section className="notes">
          <h2>Notas</h2>
          <div className="notes__grid">
            {notes.map((note) => (
              <div key={note.id} className="notes__note">
                <span>Nota de {note.username}</span>
                <p>{note.note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
