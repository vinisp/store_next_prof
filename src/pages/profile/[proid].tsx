/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios'
import { format } from 'date-fns'
import styles from './Profile.module.css'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const Profile = ({ dados }: any) => {
  const PostsToRender = dados.map((e: any) => ({
    post: e.post_content,
    date: format(new Date(e.createdAt), 'dd MMM yyyy H:mm:s')
  }))
  const [plansData, setPlansData] = useState<any[]>()

  PostsToRender.sort((a: any, b: any) => {
    //@ts-ignore
    return new Date(b.date) - new Date(a.date)
  })

  const { data: session } = useSession()
  const userEmail = session?.user?.email as string

  const route = useRouter()

  const query = route.query.proid

  function CheckProductId() {
    useEffect(() => {
      query
        ? axios
            .get(`http://localhost:3001/sub/prod/${query}`)
            .then((response) =>
              setPlansData(
                response.data.product.data.map((e: any) => ({
                  prod_id: e.id,
                  planName: e.name
                }))
              )
            )
            .catch((err) => console.error(err))
        : console.log('Não temos usuário')
    }, [query])
  }
  CheckProductId()

  const price = 'price_1LFiPAF3qA6CuccdgiSeIZMq'
  return (
    <>
      <div
        className={`container ${styles.timeline} `}
        style={{ minHeight: '100vh', marginTop: '2rem' }}
      >
        <div>
          <form action={`/api/sub/${price}/${userEmail}`} method="POST">
            <button type="submit">Inscrever</button>
          </form>
          {plansData?.map((e) => (
            <>
              <div>
                <button
                  onClick={() => {
                    console.log(e.planName)
                    const prodId = plansData?.filter(
                      (el) => el.planName === e.planName
                    )[0].prod_id
                    axios
                      .get(`http://localhost:3001/sub/${prodId}`)
                      .then((response) => console.log(response.data[0].id))
                  }}
                >
                  {e.planName}
                </button>
              </div>
            </>
          ))}
        </div>
        {PostsToRender.map((e: any) => (
          <>
            <div className={styles.timeline_entry}>
              <div className={styles.timeline_stat}>
                <div className={styles.timeline_icon}>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="Profile picture"
                  />
                </div>
                <div className={styles.timeline_time}>{e.date}</div>
              </div>
              <div className={styles.timeline_label}>
                <h4 className="mar-no pad-btm">Título da Postagem</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{e.post}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

Profile.getInitialProps = async (context: any) => {
  try {
    const { data } = await axios.get(
      `https://deppback.herokuapp.com/post/${context.query.proid}`
    )

    return { dados: data }
  } catch (error) {
    console.error(error)
  }
}

export default Profile
