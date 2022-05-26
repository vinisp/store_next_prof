import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Img2 from 'assets/img/2.jpg'
import Link from 'next/link'
import { useState } from 'react'

const ProductPage = () => {
  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [title2, setTitle2] = useState<string>('')
  const [text2, setText2] = useState<string>('')
  const [title3, setTitle3] = useState<string>('')
  const [text3, setText3] = useState<string>('')
  const router = useRouter()
  const { pid } = router.query

  const CourseInfo = [
    {
      description: 'Descrição',
      descriptionText: 'texto de descrição'
    },
    {
      specification1: 'Especificação1',
      specificationText1: 'Texto de especificacao1'
    },
    {
      specification2: 'Especificação2',
      specificationText2: 'Texto de especificacao2'
    },
    {
      specification3: 'Especificação3',
      specificationText3: 'Texto de especificacao'
    }
  ]

  const Description = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /*@ts-ignore */
    setTitle(CourseInfo[0].description)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /*@ts-ignore */
    setText(CourseInfo[0].descriptionText)

    setTitle2('')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    setText2('')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    setTitle3('')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    setText3('')
  }

  const Details = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /*@ts-ignore */
    setTitle(CourseInfo[1].specification1)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /*@ts-ignore */
    setText(CourseInfo[1].specificationText1)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /*@ts-ignore */
    setTitle2(CourseInfo[2].specification2)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /*@ts-ignore */
    setText2(CourseInfo[2].specificationText2)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /*@ts-ignore */
    setTitle3(CourseInfo[3].specification3)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /*@ts-ignore */
    setText3(CourseInfo[3].specificationText3)
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
                  <a> Nome do produtor</a>
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
              <div style={{ display: 'flex', gap: '15px' }}>
                <button className="btn btn-success" onClick={Description}>
                  Descrição do Curso
                </button>
                <button className="btn btn-outline-secondary" onClick={Details}>
                  Detalhes
                </button>
              </div>
              <div className="mt-5">
                <h3>
                  {/*@ts-ignore */}
                  {title.length === 0
                    ? /*@ts-ignore */
                      setTitle(CourseInfo[0].description)
                    : title}
                </h3>
                <h3>
                  {/*@ts-ignore */}
                  {text.length === 0
                    ? /*@ts-ignore */
                      setText(CourseInfo[0].descriptionText)
                    : text}
                </h3>

                <h3>
                  {/*@ts-ignore */}
                  {title2.length === 0 ? false : title2}
                </h3>
                {/*@ts-ignore */}
                <p>
                  {/*@ts-ignore */}
                  {text2.length === 0 ? false : text2}
                </p>
                <h3>
                  {/*@ts-ignore */}
                  {title3.length === 0 ? false : title3}
                </h3>
                {/*@ts-ignore */}
                <p>
                  {/*@ts-ignore */}
                  {text3.length === 0 ? false : text3}
                </p>
              </div>
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
export default ProductPage
