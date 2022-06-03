import Head from 'next/head'
import Image from 'next/image'
import Img2 from 'assets/img/2.jpg'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'

const ProductPage = ({ dados }: any) => {
  const router = useRouter()

  const DetailsInfo = () => {
    return (
      <>
        <div
          className="mt-2"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <span>{dados[0].name}</span>
          <span>{dados[0].main_resume}</span>
          <span>{dados[0].level} </span>
          <span>
            <sup> R$ </sup> <span className="h2"> {dados[0].price} </span>
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="h2">{dados[0].name}</span>
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
                <button
                  style={{ width: '250px' }}
                  className="btn btn-success ms-2"
                  onClick={() => router.push(`/checkout/${dados[0].course_id}`)}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <span className="h2 mb-4">Comentários</span>
          <div className="card mt-4" style={{ width: 'min(760px, 90vw)' }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src="..." className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Nome do Usuário</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">11/11/2021</small>
                  </p>
                </div>
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
