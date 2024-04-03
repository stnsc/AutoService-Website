export default function SignUpForm() {
  return (
    <>
      <h1 className="white-label">Inscriere</h1>

      <div className="form-floating">
        <input type="text" className="form-control" placeholder="Nume" />
        <label htmlFor="floatingInput">Nume</label>
      </div>

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          placeholder="nume@email.com"
        />
        <label htmlFor="floatingInput">Email</label>
      </div>

      <div className="form-floating">
        <input type="password" className="form-control" placeholder="pass" />
        <label htmlFor="floatingInput">Parola</label>
      </div>

      <div className="form-floating">
        <input type="password" className="form-control" placeholder="pass" />
        <label htmlFor="floatingInput">Reintroducere parola</label>
      </div>

      <div className="form-floating">
        <select className="form-select" id="floatingSelectGrid">
          <option selected>Alege</option>
          <option value="1">Masculin</option>
          <option value="2">Feminin</option>
          <option value="3">Prefer sa nu raspund</option>
        </select>

        <label htmlFor="floatingInput">Sex</label>
      </div>

      <button className="btn btn-primary py-2">Inscriere!</button>
    </>
  );
}
