import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import md5 from "md5";

export default function Registro() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user, pswd, pswdAgain } = e.currentTarget.elements;

    if (user.value === "" || pswd.value === "" || pswdAgain === "") {
      alert("Completa todos los campos.");
      return;
    }

    if (pswd.value !== pswdAgain.value) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.value, pswd: md5(pswd.value) }),
    };

    fetch(process.env.NEXT_PUBLIC_URL_API + "/users", requestOptions).then(
      (response) => {
        if (response.status === 200) {
          alert("Usuario Registrado con Éxito");
          router.push("/");
        } else if (response.status === 400)
          alert("Usuario repetido, escribe otro nombre de usuario");
        else alert("Error en servidor");
      }
    );
  };

  return (
    <>
      <Head>
        <title>WebNotes | Registro</title>
        <meta name="description" content="Aplicacion de notas web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Registro</h1>
      <h2>Escribe un nombre de usuario y contraseña:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Usuario</span>
          <input id="user" type="text" />
        </label>
        <label>
          <span>Contraseña</span>
          <input id="pswd" type="password" />
        </label>
        <label>
          <span>Repite Contraseña</span>
          <input id="pswdAgain" type="password" />
        </label>
        <button type="submit">Registrar</button>
      </form>
      <span>
        ¿Ya tienes una cuenta? <Link href="/">Inicia sesión aquí</Link>
      </span>
    </>
  );
}
