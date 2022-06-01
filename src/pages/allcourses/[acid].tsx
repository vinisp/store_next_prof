import { useRouter } from 'next/router'
import axios from 'axios'
import styles from 'styles/Home.module.css'
import { useState, useEffect } from 'react'

const AllCoures = ({ dados }: any) => {
  const router = useRouter()
  const [filterData, setFilterData] = useState<any[]>()
  const categorys = new Set(dados.map((e: any) => e.category))
  const listCategorys = Array.from(categorys)
  const [page, setPage] = useState<number>(0)
  const [indexPosition, setIndexPosition] = useState<number[]>([])
  //Item start e item end
  //page Length

  const NumberOfPages = Math.ceil(dados.length / 6)

  const listButtons = Array.from({ length: NumberOfPages }, (v, k) => k + 1)

  function GetPageNumber() {
    const query = router.query.acid
    useEffect(() => {
      query ? setPage(Number(router.query.acid)) : false
    }, [query])
    return null
  }

  GetPageNumber()

  function NextButton() {
    if (page === NumberOfPages) {
      return (
        <>
          <button className="btn btn-success" disabled>
            Next Page
          </button>
        </>
      )
    }

    if (page < NumberOfPages) {
      return (
        <>
          <button
            className="btn btn-success"
            onClick={() => router.push(`/allcourses/${page + 1}`)}
          >
            Next Page
          </button>
        </>
      )
    }
  }

  function PrevButton() {
    if (page === 1) {
      return (
        <>
          <button className="btn btn-success" disabled>
            Prev Page
          </button>
        </>
      )
    }

    if (page > 1) {
      return (
        <>
          <button
            className="btn btn-success"
            onClick={() => router.push(`/allcourses/${page - 1}`)}
          >
            Prev Page
          </button>
        </>
      )
    }
  }

  function ElementsToRender() {
    const pageSize = 6

    if (page === 1) {
      const positions = [page - 1, page + pageSize - 2]
      return (
        <>
          {dados.map((e: any, index: number) =>
            index <= positions[1] || index === positions[0] ? (
              <>
                <div key={e.course_id}>{e.name}</div>
              </>
            ) : (
              false
            )
          )}
        </>
      )
    }
    if (page > 1 && page % 2 === 0) {
      const first = page * page + 1 + 1
      const positions = [first, first + pageSize - 1]
      return (
        <>
          {dados.map((e: any, index: number) =>
            index === positions[1] || index >= positions[0] ? (
              <>
                <div key={e.course_id}>{e.name}</div>
              </>
            ) : (
              false
            )
          )}
        </>
      )
    }
    if (page > 1 && page % 2 !== 0) {
      const first = page * page + 1 + 1
      const positions = [first + 1, first + pageSize]
      return (
        <>
          {dados.map((e: any, index: number) =>
            index === positions[1] || index >= positions[0] ? (
              <>
                <div key={e.course_id}>{e.name}</div>
              </>
            ) : (
              false
            )
          )}
        </>
      )
    }
  }

  return (
    <>
      <div>
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
                <div className={styles.imgFake}>{index}</div>
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
      <div style={{ display: 'flex', justifyContent: 'center  ' }}>
        {PrevButton()}
        {listButtons.map((e) => (
          <>
            <button
              className={`btn btn-outline-success`}
              onClick={() => router.push(`/allcourses/${e}`)}
            >
              {e}
            </button>
          </>
        ))}
        {NextButton()}
      </div>

      {ElementsToRender()}
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
