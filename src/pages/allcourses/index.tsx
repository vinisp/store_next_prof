import { useRouter } from 'next/router'
import axios from 'axios'
import styles from 'styles/Home.module.css'
import { useState, useEffect } from 'react'

const AllCoures = ({ dados }: any) => {
  const router = useRouter()
  const [filterData, setFilterData] = useState<any[]>()
  const categorys = new Set(dados.map((e: any) => e.category))
  const listCategorys = Array.from(categorys)

  return (
    <>
      <div>
        {filterData?.length === 0 ? 'sim' : 'não'}
        <ul className="btn-group">
          {listCategorys.map((e: any, index) => (
            <li key={index}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setFilterData(
                    dados.filter((element: any) => element.category === e)
                  )
                  console.log(filterData)
                }}
              >
                {e}
              </button>
            </li>
          ))}
        </ul>
      </div>
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
          ))}
        </div>
      </div>
    </>
  )
}

AllCoures.getInitialProps = async () => {
  try {
    const response = await axios.get('https://deppback.herokuapp.com/courses')
    return { dados: response.data }
  } catch (error) {
    console.error(error)
  }
}

export default AllCoures
