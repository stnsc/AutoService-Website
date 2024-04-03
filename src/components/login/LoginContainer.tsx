export default function LoginContainer() {
  return (
    <>
      <main className="form-signin w-100 m-auto login-input-container">
        <form>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Adresa Email</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="pass"
            />
            <label htmlFor="floatingInput">Parola</label>
          </div>
          <button className="btn btn-primary w-100 py-2">Logare</button>
        </form>
      </main>
    </>
  );
}
