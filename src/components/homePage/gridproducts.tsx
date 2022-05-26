import styles from "styles/Home.module.css";

const GridProducts = () => {
  return (
    <>
      <h3 className="display-3 text-center"> Conheça nossos cursos </h3>
      <figure className="text-center">
        <blockquote className="blockquote">
          <p>A melhor plataforma para quem quer aprender apostar de verdade!</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </figcaption>
      </figure>
      <div className={`mx-auto ${styles.gridHomeProducts}`}>
        <div className="row row-cols-1 row-cols-md-3 g-12 mb-3">
          <div className="col mb-3">
            <div className={`card ${styles.cardWidth}`}>
              <div className={styles.imgFake}>1</div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div className={styles.buttonsCardWrapper}>
                  <button
                    type="button"
                    className={`${styles.CustombtnBuy} btn-success`}
                  >
                    Comprar
                  </button>
                  <button
                    type="button"
                    className={`${styles.CustombtnInfo} btn-secondary`}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-3">
            <div className={`card ${styles.cardWidth}`}>
              <div className={styles.imgFake}>2</div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div className={styles.buttonsCardWrapper}>
                  <button
                    type="button"
                    className={`${styles.CustombtnBuy} btn-success`}
                  >
                    Comprar
                  </button>
                  <button
                    type="button"
                    className={`${styles.CustombtnInfo} btn-secondary`}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-3">
            <div className={`card ${styles.cardWidth}`}>
              <div className={styles.imgFake}>3</div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div className={styles.buttonsCardWrapper}>
                  <button
                    type="button"
                    className={`${styles.CustombtnBuy} btn-success`}
                  >
                    Comprar
                  </button>
                  <button
                    type="button"
                    className={`${styles.CustombtnInfo} btn-secondary`}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-3">
            <div className={`card ${styles.cardWidth}`}>
              <div className={styles.imgFake}>4</div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div className={styles.buttonsCardWrapper}>
                  <button
                    type="button"
                    className={`${styles.CustombtnBuy} btn-success`}
                  >
                    Comprar
                  </button>
                  <button
                    type="button"
                    className={`${styles.CustombtnInfo} btn-secondary`}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-3">
            <div className={`card ${styles.cardWidth}`}>
              <div className={styles.imgFake}>5</div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div className={styles.buttonsCardWrapper}>
                  <button
                    type="button"
                    className={`${styles.CustombtnBuy} btn-success`}
                  >
                    Comprar
                  </button>
                  <button
                    type="button"
                    className={`${styles.CustombtnInfo} btn-secondary`}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-3">
            <div className={`card ${styles.cardWidth}`}>
              <div className={styles.imgFake}>6</div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div className={styles.buttonsCardWrapper}>
                  <button
                    type="button"
                    className={`${styles.CustombtnBuy} btn-success`}
                  >
                    Comprar
                  </button>
                  <button
                    type="button"
                    className={`${styles.CustombtnInfo} btn-secondary`}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridProducts;
