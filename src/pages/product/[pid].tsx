import Head from 'next/head'
import Image from 'next/image'
import Img2 from 'assets/img/2.jpg'
import Link from 'next/link'
import axios from 'axios'

const ProductPage = ({ dados }: any) => {
  console.log(dados)

  const DetailsInfo = () => {
    return (
      <>
        <div className="mt-5">
          <h3>{dados[0].name}</h3>
          <h3>{dados[0].main_resume}</h3>
          <h4>{dados[0].level} </h4>
          <span>
            <sup> R$ </sup> {dados[0].price}
          </span>

          <hr />

          <span>{dados[0].mais_detalhes}</span>

          <h3> {dados[0].titulo_competencia_um}</h3>
          <h3> {dados[0].text_competencia_um}</h3>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </Head>
      <div
        className="container mt-2"
        style={{ flexWrap: 'wrap', minHeight: '100vh' }}
      >
        <div className="row">
          <div className="col">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={0}
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={2}
                  aria-label="Slide 3"
                />
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <Image src={Img2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <Image src={Img2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <Image src={Img2} className="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col">
            <div>
              <h2 className="display-5">Title</h2>
              <span>
                Criado por
                <Link href="/username">
                  <a> Nome do produtors</a>
                </Link>
              </span>
              <div>
                <i className="fa fa-star fa-1x text-success"></i>
                <i className="fa fa-star fa-1x text-success"></i>
                <i className="fa fa-star fa-1x text-success"></i>
                <i className="fa fa-star fa-1x text-success"></i>
                <i className="fa fa-star fa-1x text-muted"></i>
                <span>
                  (109) Avaliações
                  <Link href="/username">
                    <a> 109 Comentários</a>
                  </Link>
                </span>
              </div>
              <hr className="mt-2 mb-2" />

              {DetailsInfo()}
              <hr className="mt-12 mb-12" />
              <div className="row">
                <button className="btn btn-success">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ProductPage.getInitialProps = async (context: any) => {
  try {
    const { data } = await axios.get(
      `https://deppback.herokuapp.com/course/${context.query.pid}`
    )

    return { dados: data }
  } catch (error) {
    console.error(error)
  }
}

export default ProductPage
