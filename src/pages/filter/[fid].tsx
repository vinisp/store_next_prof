import { useRouter } from 'next/router'
import axios from 'axios'
import styles from 'styles/Home.module.css'
import { useState, useEffect } from 'react'

const FilterPage = ({ dados }: any) => {
  const router = useRouter()
  const [filterData, setFilterData] = useState<any[]>([])
  const categorys = new Set(dados.map((e: any) => e.category))
  const listCategorys = Array.from(categorys)
  const [page, setPage] = useState<number>(0)

  //Item start e item end
  //page Length

  const NumberOfPages = Math.ceil(dados.length / 6)

  const listButtons = Array.from({ length: NumberOfPages }, (v, k) => k + 1)

  function GetPageNumber() {
    const query = router.query.fid
    useEffect(() => {
      query ? setPage(Number(router.query.fid)) : false
    }, [query])
    return null
  }

  GetPageNumber()

  function ShowItems() {
    useEffect(() => {
      dados ? setFilterData(dados) : false
    }, [dados])
    return null
  }

  ShowItems()

  function NextButton() {
    console.log(page, NumberOfPages)
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
            onClick={() => router.push(`/filter/${page + 1}`)}
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
            onClick={() => router.push(`/filter/${page - 1}`)}
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
          {filterData.map((e: any, index: number) =>
            index <= positions[1] || index === positions[0] ? (
              <>
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
                      style={{ flex: '0 0 50%' }}
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
        </>
      )
    }
    if (page > 1 && page % 2 === 0) {
      const first = page * page + 1 + 1
      const positions = [first, first + pageSize - 1]
      return (
        <>
          {filterData.map((e: any, index: number) =>
            index === positions[1] || index >= positions[0] ? (
              <>
                <div
                  className="card"
                  style={{
                    width: 'min(250px, 90vw)',
                    height: '450px',
                    position: 'relative'
                  }}
                >
                  <div className={styles.imgFake}>{index + 1}</div>
                  <div className="card-body">
                    <h5 className="card-title">{e.name}</h5>
                    <p className="card-text">{e.price}</p>
                    <div
                      className={styles.buttonsCardWrapper}
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '2px'
                      }}
                    >
                      <button
                        type="button"
                        className={`btn btn-success`}
                        onClick={() => router.push(`/checkout/${e.course_id}`)}
                        style={{ width: '100px' }}
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
        </>
      )
    }
    if (page > 1 && page % 2 !== 0) {
      const first = page * page + 1 + 1
      const positions = [first + 1, first + pageSize]
      return (
        <>
          {filterData.map((e: any, index: number) =>
            index === positions[1] || index >= positions[0] ? (
              <>
                <div
                  className="card"
                  style={{
                    width: 'min(250px, 90vw)',
                    height: '450px',
                    position: 'relative'
                  }}
                >
                  <div className={styles.imgFake}>{index + 1}</div>
                  <div className="card-body">
                    <h5 className="card-title">{e.name}</h5>
                    <p className="card-text">{e.price}</p>
                    <div
                      className={styles.buttonsCardWrapper}
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '2px'
                      }}
                    >
                      <button
                        type="button"
                        className={`btn btn-success`}
                        onClick={() => router.push(`/checkout/${e.course_id}`)}
                        style={{ width: '100px' }}
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
        </>
      )
    }
  }

  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <div>
          <ul
            className="btn-group"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <li>
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setFilterData(dados.filter((e: any) => e))
                }}
              >
                Ver Todos
              </button>
            </li>
            {listCategorys.map((e: any, index) => (
              <li key={index}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setFilterData(
                      dados.filter((element: any) => element.category === e)
                    )
                  }}
                >
                  {e}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={`mx-auto ${styles.gridHomeProducts}`}>
          <div className={styles.cardsGrid}>{ElementsToRender()}</div>
        </div>
        <div
          className="mt-5"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {PrevButton()}

          {listButtons.map((e) => (
            <>
              <button
                className={`btn btn-outline-success`}
                onClick={() => router.push(`/filter/${e}`)}
              >
                {e}
              </button>
            </>
          ))}
          {NextButton()}
        </div>
      </div>
    </>
  )
}

FilterPage.getInitialProps = async () => {
  try {
    const response = await axios.get('https://deppback.herokuapp.com/courses')
    return { dados: response.data }
  } catch (error) {
    console.error(error)
  }
}

export default FilterPage
