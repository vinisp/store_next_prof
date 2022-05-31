import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Loading from 'components/Loading'
import Head from 'next/head'

const App = ({ dados }: any) => {
  const { data: session } = useSession()
  const [courseNames, SetCourseNames] = useState<Array<any>>([])

  function GetCourseName() {
    useEffect(() => {
      if (dados.length === courseNames.length) {
        return console.log('atualizado')
      }

      dados.map((e: string) => {
        axios
          .get(`https://deppback.herokuapp.com/course/${e}`)
          .then((response) => {
            //console.log(index)
            SetCourseNames((coursesNames) => [
              ...coursesNames,
              ...response.data
            ])
          })
          .catch((err) => console.error(err))
      })
    }, [dados])
    return
  }

  GetCourseName()

  return (
    <>
      <div>
        <Head>
          <title>Área do usuário</title>
        </Head>
      </div>
      <div style={{ minHeight: '100vh', display: 'flex' }}>
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
          style={{ width: '280px', minHeight: '100vh' }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <svg className="bi me-2" width={40} height={32}>
              <use xlinkHref="#bootstrap" />
            </svg>
            <span className="fs-4">Sidebar</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi me-2" width={16} height={16}>
                  <use xlinkHref="#speedometer2" />
                </svg>
                Cursos
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi me-2" width={16} height={16}>
                  <use xlinkHref="#table" />
                </svg>
                Tipster
              </a>
            </li>
          </ul>
          <hr />
        </div>

        <div
          className="mt-5"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            alignItems: 'center'
          }}
        >
          <table className="table table-responsive table-striped table-hover">
            <thead className="table-success">
              <th>Nome</th>
              <th>Categoria</th>
              <th>Dificuldade</th>
              <th>Acesso</th>
            </thead>
            <tbody>
              {courseNames?.length > 0 ? (
                courseNames.map((e, index) =>
                  index + 1 <= dados.length ? (
                    <>
                      <tr>
                        <th scope="row">{e.name}</th>
                        <td className="">{e.category}</td>
                        <td>{e.level}</td>
                        <td>
                          <button
                            onClick={() => {
                              console.log(``)
                              axios
                                .get(
                                  `https://deppback.herokuapp.com/${e.course_id}/champters`
                                )
                                .then((response) => console.log(response.data))
                                .catch((err) => console.error(err))
                            }}
                          >
                            Acessar o curso
                          </button>
                        </td>
                      </tr>
                    </>
                  ) : (
                    false
                  )
                )
              ) : (
                <Loading />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

App.getInitialProps = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5000/courses/test_user_42899768@testuser.com'
    )
    const courseList = response.data.body
    const course_id = courseList.map((e: any) => e.description)
    return { dados: course_id }
  } catch (error) {
    console.error(error)
  }
}

export default App
