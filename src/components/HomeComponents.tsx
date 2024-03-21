function HomeComponents() {
  return (
    <>
      {/* HERO COMPONENT */}

      <div className="py-5 my-0 text-body-emphasis text-center" id="hero-section">
        <h1 className="display-5 fw-bold text-body-emphasis">
          Spune adio problemelor mașinii tale.
        </h1>
        <p className="lead">
          La service-ul nostru auto, punem accent pe calitate, siguranță și
          profesionalism în fiecare intervenție. Echipa noastră de mecanici
          experimentați și bine pregătiți este aici pentru a asigura că mașina ta
          primește tratamentul pe care-l merită.
        </p>
      </div>

      {/* SERVICES COMPONENT */}

      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <img
              src="../../public/assets/placeholder.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Serviciu 1</h5>
              <p className="card-text">Descriere serviciu</p>
              <a href="#" className="btn btn-primary">
                Mai multe
              </a>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card">
            <img
              src="../../public/assets/placeholder.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Serviciu 2</h5>
              <p className="card-text">Descriere serviciu</p>
              <a href="#" className="btn btn-primary">
                Mai multe
              </a>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card">
            <img
              src="../../public/assets/placeholder.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Serviciu 3</h5>
              <p className="card-text">Descriere serviciu</p>
              <a href="#" className="btn btn-primary">
                Mai multe
              </a>
            </div>
          </div>
        </div>
      </div>

    {/* STATISTICS COMPONENT */}

      <div className="stats-container">
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h1>10+</h1>
                <p>Statistica 1</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h1>20+</h1>
                <p>Statistica 2</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h1>30+</h1>
                <p>Statistica 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* CONTACT COMPONENT */}

      <div className="card contact-container">
        <div className="card-header">Contact</div>
        <div className="card-body">
          <h5 className="card-title">Ne pasă de mașina ta</h5>
          <p className="card-text">
            Vom lua toate măsurile necesare pentru a-ți face experiența cu noi
            cât mai plăcută și eficientă.
          </p>
          <a href="#" className="btn btn-primary">
            Contactează-ne
          </a>
        </div>
      </div>

    </>
  );
}

export default HomeComponents;

/**
 * navbar
 * hero
 * services
 * statistics
 * contact
 * */