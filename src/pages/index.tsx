import axios from 'axios'
import Slider from 'components/homePage/slider'
import styles from 'styles/Home.module.css'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Index = ({ dados }: any) => {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <>
      <Slider />
      <div className="row justify-content-center mt-5">
        {session ? (
          <span
            style={{
              width: '100%',
              marginInline: 'auto'
            }}
            className="display-6 text-center"
          >
            Olá {session.user?.name}, seja bem-vindo!
          </span>
        ) : (
          'usuário não está logado'
        )}

        <h3 className="display-3 text-center"> Conheça nossos cursos </h3>
        <figure className="text-center">
          <blockquote className="blockquote">
            <p>
              A melhor plataforma para quem quer aprender apostar de verdade!
            </p>
          </blockquote>
          <figcaption className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
      </div>

      <div className={`mx-auto ${styles.gridHomeProducts}`}>
        <div className={styles.cardsGrid}>
          {dados.map((e: any, index: number) =>
            index < 6 ? (
              <>
                {' '}
                <div
                  className="card"
                  style={{
                    width: 'min(250px, 90vw)',
                    height: '450px'
                  }}
                >
                  <div className={styles.imgFake}>{index + 1}</div>
                  <div
                    className="card-body"
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <h5
                      className="card-title text-center"
                      style={{ flex: '0 0 50%', maxHeight: '100px !important' }}
                    >
                      {e.name}
                      <hr />
                    </h5>
                    <p className="card-text h2 fw-light text-center">
                      <sup> R$ </sup> {e.price}
                    </p>
                  </div>
                  <div
                    className={`${styles.buttonsCardWrapper} mb-2`}
                    style={{
                      bottom: '10px'
                    }}
                  >
                    <button
                      type="button"
                      className={`btn btn-success`}
                      onClick={() => router.push(`/checkout/${e.course_id}`)}
                      style={{ height: '40px' }}
                    >
                      Comprar
                    </button>
                    <button
                      type="button"
                      className={`btn btn-secondary`}
                      onClick={() => router.push(`/product/${e.course_id}`)}
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </>
            ) : (
              false
            )
          )}
        </div>
      </div>
      <div
        className="row mt-4"
        style={{ width: 'min(350px, 90vw)', marginInline: 'auto' }}
      >
        <Link href={'/allcourses/1'}>
          <a className="btn btn-success">Ver todos</a>
        </Link>
      </div>
    </>
  )
}

Index.getInitialProps = async () => {
  try {
    const response = await axios.get('https://deppback.herokuapp.com/courses')
    return { dados: response.data }
  } catch (error) {
    console.error(error)
  }
}

export default Index
