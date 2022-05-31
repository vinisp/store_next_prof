import axios from 'axios'

import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

const Course = () => {
  const route = useRouter()
  const [champtersName, setChamptersName] = useState<any[]>([])

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
      <h1>Finalmente a página do curso</h1>
      <ul>
        {champtersName.map((e) => (
          <>
            <button
              onClick={() =>
                axios
                  .get(
                    `https://deppback.herokuapp.com/elements/${e.course_id}/${e.champter_id}/get`
                  )
                  .then((response) => console.log(response.data))
                  .catch((err) => console.error(err))
              }
            >
              <li key={e.id}>{e.name}</li>
            </button>
          </>
        ))}
      </ul>
    </>
  )
}

export default Course
