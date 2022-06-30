/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios'
import { format } from 'date-fns'
import styles from './Profile.module.css'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { hide } from '@popperjs/core'
import { ColumnFour } from 'components/Card/styles'

const Profile = ({ dados }: any) => {
  const PostsToRender = dados.map((e: any) => ({
    post: e.post_content,
    date: format(new Date(e.createdAt), 'dd MMM yyyy H:mm:s')
  }))
  const [plansData, setPlansData] = useState<any[]>([])
  const [plansPrices, setPlansPrice] = useState<any[]>([])

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
            .get(`https://deppback.herokuapp.com/sub/prod/${query}`)
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

  function CheckPriceId() {
    useEffect(() => {
      plansData?.length > 0
        ? console.log(
            plansData.map((e) =>
              axios
                .get(`https://deppback.herokuapp.com/sub/${e.prod_id}`)
                .then((response) =>
                  setPlansPrice((plansPrices) => [
                    ...plansPrices,
                    {
                      priceid: response.data.result[0].id,
                      prodid: e.prod_id,
                      planName: e.planName,
                      price: response.data.result[0].unit_amount
                    }
                  ])
                )
                .catch((err) => console.error(err))
            )
          )
        : console.log('não temos os dados do plano')
    }, [plansData])
  }
  CheckPriceId()

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          padding: '1rem',
          gap: '2rem'
        }}
      >
        {plansPrices.map((e: any) => (
          <>
            <div
              style={{
                borderRadius: '8px',
                width: 'min(250px, 80vw)',
                height: '300px',
                backgroundColor: 'darkgreen',
                color: '#FFF'
              }}
            >
              <form
                action={`/api/sub/${e.priceid}/${userEmail}`}
                method="POST"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '2rem'
                }}
              >
                <h1
                  className={styles.bolderFont}
                  style={{
                    color: '#FFF'
                  }}
                >
                  {e.planName}
                </h1>
                <h3>R$ {+e.price / 100}</h3>
                <button className="btn btn-success">Comprar</button>
              </form>
            </div>
          </>
        ))}
      </div>

      <div
        className={`container ${styles.timeline} `}
        style={{ minHeight: '100vh', marginTop: '2rem' }}
      >
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
