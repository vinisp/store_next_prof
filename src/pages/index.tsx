import axios from 'axios'
import Slider from 'components/homePage/slider'
import styles from 'styles/Home.module.css'

const Index = ({ dados }: any) => (
  <>
    <Slider />

    <div className={`mx-auto ${styles.gridHomeProducts}`}>
      <div className={styles.cardsGrid}>
        {dados.map((e: any, index: number) => (
          <>
            <div className={styles.card}>
              <div className={styles.imgFake}>{index + 1}</div>
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <p className="card-text">{e.main_resume}</p>
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
          </>
        ))}
      </div>
    </div>
  </>
)

Index.getInitialProps = async () => {
  try {
    const response = await axios.get('https://deppback.herokuapp.com/courses')
    return { dados: response.data }
  } catch (error) {
    console.error(error)
  }
}

export default Index
