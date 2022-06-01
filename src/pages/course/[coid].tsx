import axios from 'axios'

import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import Head from 'next/head'

const Course = () => {
  const route = useRouter()
  const [champtersName, setChamptersName] = useState<any[]>([])
  const [dataForRender, setDataForRender] = useState<any[]>([])
  const [courseName, setCourseName] = useState<string>()

  const GetChampters = async () => {
    const query = route.query.coid

    useEffect(() => {
      query
        ? axios
            .get(`https://deppback.herokuapp.com/${query}/champters`)
            .then((response) => {
              setChamptersName(response.data)
            })
            .catch((err) => console.error(err))
        : console.log(false)
      query
        ? axios
            .get(`https://deppback.herokuapp.com/course/${query}`)
            .then((response) => {
              const { name } = response.data[0]
              setCourseName(name)
            })
            .catch((err) => console.error(err))
        : console.log(false)

      return console.log(`https://deppback.herokuapp.com/course/${query}`)
    }, [query])
  }

  GetChampters()
  return (
    <>
      <Head>
        <title>{courseName ? courseName : 'Profteam Cursos'} </title>
      </Head>
      <div style={{ display: 'flex', minHeight: '100vh', gap: '2rem' }}>
        <div
          className="flex-shrink-0 p-3 bg-white"
          style={{ width: 'min(280px, 20vw)' }}
        >
          <a
            href=""
            className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
          >
            <svg className="bi me-2" width={30} height={24}>
              <use xlinkHref="#bootstrap" />
            </svg>
            <span className="fs-5 fw-semibold">
              {courseName ? courseName : 'loadding'}
            </span>
          </a>
          <ul className="list-unstyled ps-0">
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded"
                data-bs-toggle="collapse"
                data-bs-target="#home-collapse"
                aria-expanded="true"
              >
                Capítulos
              </button>
              <div className="collapse show" id="home-collapse" style={{}}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  {champtersName.map((e) => (
                    <>
                      <li className="link-dark rounded " key={e.id}>
                        <button
                          className="lead ms-4 mb-2"
                          onClick={() =>
                            axios
                              .get(
                                `https://deppback.herokuapp.com/elements/${e.course_id}/${e.champter_id}/get`
                              )
                              .then((response) => {
                                setDataForRender(response.data)
                                console.log(response.data)
                              })
                              .catch((err) => console.error(err))
                          }
                        >
                          {e.name}
                        </button>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div
          className="mt-5"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            textAlign: 'center',
            gap: '0.4rem',
            backgroundColor: 'white',
            marginInline: 'auto',
            width: 'min(1080px, 80vw)',
            paddingTop: '60px'
          }}
        >
          {dataForRender
            .sort((a, b) => a.order - b.order)
            .map((e) => (
              <>
                <span> {e.content} </span>
              </>
            ))}
        </div>
      </div>
    </>
  )
}

export default Course
