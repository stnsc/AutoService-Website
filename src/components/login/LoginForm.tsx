export default function LoginForm() {
  return (
    <>
      <h1 className="white-label">Logare</h1>

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Adresa Email</label>
      </div>

      <div className="form-floating">
        <input type="password" className="form-control" placeholder="pass" />
        <label htmlFor="floatingInput">Parola</label>
      </div>
      <button className="btn btn-primary py-2">Logare</button>
    </>
  );
}
