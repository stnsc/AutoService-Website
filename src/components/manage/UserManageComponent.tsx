export default function UserManageComponent() {
  function handleNameChange(e) {
    e.preventDefault();
  }
  function handleEmailChange(e) {
    e.preventDefault();
  }
  function handlePasswordChange(e) {
    e.preventDefault();
  }
  return (
    <>
      <div className="user-manage-component">
        <form className="user-manage-div" onSubmit={handleNameChange}>
          <h3>Numele actual:</h3>
          <p>nume</p>
          <div className="form-floating">
            <input
              type="name"
              className="form-control"
              name="name"
              placeholder="Popescu Ion"
            />
            <label htmlFor="floatingInput">Schimbare nume</label>
          </div>
          <button className="btn btn-primary">Modifica</button>
        </form>
        <form className="user-manage-div" onSubmit={handleEmailChange}>
          <h3>Email-ul actual:</h3>
          <p>email</p>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Schimbare Email</label>
          </div>
          <button className="btn btn-primary">Modifica</button>
        </form>
        <form className="user-manage-div" onSubmit={handlePasswordChange}>
          <h3>Parola:</h3>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="********"
            />
            <label htmlFor="floatingInput">Parola noua</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password_verify"
              placeholder="********"
            />
            <label htmlFor="floatingInput">Reintroducere parola noua</label>
          </div>
          <button className="btn btn-primary">Modifica</button>
        </form>
      </div>
    </>
  );
}
