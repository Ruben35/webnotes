import Head from "next/head";
import Link from "next/link";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { user, pswd } = e.currentTarget.elements;

    if (user.value === "" || pswd.value === "") {
      alert("Completa todos los campos.");
      return;
    }
  };
  return (
    <>
      <Head>
        <title>WebNotes</title>
        <meta name="description" content="Aplicacion de notas web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>WebNotes</h1>
      <h2>Ingresa tus credenciales para ver tus notas!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Usuario</span>
          <input id="user" type="text" />
        </label>
        <label>
          <span>Contraseña</span>
          <input id="pswd" type="password" />
        </label>
        <button type="submit">Ingresar</button>
      </form>
      <span>
        ¿Sin cuenta? <Link href="/registro">Registrate aquí</Link>
      </span>
    </>
  );
}
