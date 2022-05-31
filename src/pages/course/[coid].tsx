import axios from 'axios'

import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

const Course = () => {
  const route = useRouter()
  const [champtersName, setChamptersName] = useState<any[]>([])
  const [dataForRender, setDataForRender] = useState<any[]>([])

  const GetChampters = async () => {
    const query = route.query.coid

    useEffect(() => {
      query
        ? axios
            .get(`https://deppback.herokuapp.com/${query}/champters`)
            .then((response) => {
              setChamptersName(response.data)
              console.log(query)
            })
            .catch((err) => console.error(err))
        : console.log(false)

      return console.log(`https://deppback.herokuapp.com/course/${query}`)
    }, [query])
  }

  GetChampters()
  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh', gap: '2rem' }}>
        <ul style={{ display: 'flex', flexDirection: 'column' }}>
          {champtersName.map((e) => (
            <>
              <button
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
                <li key={e.id}>{e.name}</li>
              </button>
            </>
          ))}
        </ul>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
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
