import fadwaImg from "../images/dev4.jpg";
import marwaImg from "../images/dev5.jpg";

function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-hero position-relative overflow-hidden px-4 py-5 text-center">
        <div className="col-md-8 col-lg-6 mx-auto position-relative fadeUp pb-3">
          <i className="bi bi-activity icon-animated text-primary fw-bold"></i>
          <h1 className="fw-bold display-5">RH Management</h1>
          <p className="lead fw-normal">
            Simplifiez la gestion de vos ressources humaines : suivez vos employés,
            calculez automatiquement leur ancienneté et accédez à des indicateurs RH clairs et fiables.
          </p>
          <a className="btn btn-primary btn-lg px-4 mt-3" href="/dashboard">
            Accéder à l’application
          </a>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="section-team container-fluid py-5 bg-light">
        <h2 className="fw-bold mb-4 text-center">Notre Équipe</h2>
        <p className="lead mb-5 col-12 col-md-10 col-lg-8 mx-auto text-center">
          Porté par deux techniciennes passionnées en développement digital Full Stack,
          déterminées à créer une solution moderne et intuitive pour la gestion des ressources humaines.
        </p>

        <div className="row mb-2 justify-content-center">

          {/* Fadwa */}
          <div className="col-md-5 mb-4 fadeUp">
            <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">Full Stack</strong>
                <h3 className="mb-0">Fadwa Mars</h3>
                <div className="mb-1 text-muted">Développeuse digitale</div>
                <p className="card-text mb-auto">
                  Spécialisée en solutions digitales modernes, création d’applications intuitives et performantes.
                </p>
                <div>
                  <span className="badge bg-primary text-white mt-2">
                  <i className="bi bi-geo me-1"></i> Casablanca
                </span>
                </div>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img
                  src={fadwaImg}
                  alt="Fadwa Mars"
                  className="bd-placeholder-img"
                  style={{ width: "200px", height: "250px", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            </div>
          </div>

          {/* Marwa */}
          <div className="col-md-5 mb-4 fadeUp">
            <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">Full Stack</strong>
                <h3 className="mb-0">Marwa Hilali</h3>
                <div className="mb-1 text-muted">Développeuse digitale</div>
                <p className="card-text mb-auto">
                  Spécialisée en solutions digitales innovantes, création d’applications modernes et intuitives.
                </p>
                <div>
                  <span className="badge bg-primary text-white mt-2">
                  <i className="bi bi-geo me-1"></i> Casablanca
                </span>
                </div>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img
                  src={marwaImg}
                  alt="Marwa Hilali"
                  className="bd-placeholder-img"
                  style={{ width: "200px", height: "250px", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default LandingPage;
