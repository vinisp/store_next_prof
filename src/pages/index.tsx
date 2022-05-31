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
            className="display-5 text-center"
          >
            Olá {session.user?.name}, seja bem-vindo!
          </span>
        ) : (
          'usuário não está logado'
        )}
      </div>

      <div className={`mx-auto ${styles.gridHomeProducts}`}>
        <div className={styles.cardsGrid}>
          {dados.map((e: any, index: number) =>
            index < 6 ? (
              <>
                <div className={styles.card}>
                  <div className={styles.imgFake}>{index + 1}</div>
                  <div className="card-body">
                    <h5 className="card-title">{e.name}</h5>
                    <p className="card-text">{e.main_resume}</p>
                    <div className={styles.buttonsCardWrapper}>
                      <button
                        type="button"
                        className={`btn btn-success`}
                        onClick={() => router.push(`/checkout/${e.course_id}`)}
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
                </div>
              </>
            ) : (
              false
            )
          )}
        </div>
      </div>
      <div className="row">
        <Link href={'/allcourses'}>
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
