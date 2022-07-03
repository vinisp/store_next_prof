/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios'
import { format } from 'date-fns'
import styles from './Profile.module.css'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const Profile = ({ dados }: any) => {
  const PostsToRender = dados.map((e: any) => ({
    title: e.post_title,
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
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem'
        }}
      >
        <div>
          <h3
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontSize: '3rem',
              borderBottom: '1px solid silver'
            }}
          >
            Assinaturas
          </h3>
        </div>
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
                className={styles.hoverCard}
                style={{
                  borderRadius: '8px',
                  width: 'min(250px, 80vw)',
                  height: '300px',
                  backgroundColor: '#013220',
                  color: '#FFF',
                  boxShadow: '7px 6px 4px -1px rgb(0 0 0 / 30%)',
                  order:
                    e.planName === 'Semestral'
                      ? 2
                      : 0 || e.planName === 'Mensal'
                      ? -1
                      : 0
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
                    justifyContent: 'space-evenly'
                  }}
                >
                  <h1
                    className={styles.bolderFont}
                    style={{
                      color: '#FFF',
                      textTransform: 'uppercase'
                    }}
                  >
                    {e.planName}
                  </h1>
                  <div>
                    <span style={{ fontSize: '.8rem', fontWeight: 800 }}>
                      R$
                    </span>
                    <span style={{ fontSize: '3rem', fontWeight: 800 }}>
                      {+e.price / 100}
                    </span>
                    ,<span style={{ fontSize: '.8rem' }}>00</span>
                  </div>
                  <button className="btn btn-success">Comprar</button>
                </form>
              </div>
            </>
          ))}
        </div>
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
                <h4 className="mar-no pad-btm">{e.title}</h4>
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
