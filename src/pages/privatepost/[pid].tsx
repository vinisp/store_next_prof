/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios'
import { format } from 'date-fns'
import styles from './Profile.module.css'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating'

const Privatepost = () => {
  const APIURL = 'https://deppback.herokuapp.com'
  const route = useRouter()
  const [PostsToRenderAPI, setPostsToRenderAPI] = useState<any[]>([])
  const [PostsToRender, setPostsToRender] = useState<any[]>([])
  const [value, setValue] = useState<number | null>(2)

  const query = route.query.pid

  function getPrivatePosts() {
    const { data: session } = useSession()

    useEffect(() => {
      session
        ? axios
            .get(`${APIURL}/private_post/${query}/${session.user?.email}`)
            .then((response) => setPostsToRenderAPI(response.data))
        : console.log('loading.......')
    }, [session])
  }

  getPrivatePosts()

  function GetPosts() {
    useEffect(() => {
      if (PostsToRenderAPI.length > 0) {
        setPostsToRender(
          PostsToRenderAPI.map((e: any) => ({
            title: e.post_title,
            post: e.post_content,
            date: format(new Date(e.createdAt), 'dd MMM yyyy H:mm:s')
          }))
        )
      }
    }, [PostsToRenderAPI])
  }

  GetPosts()

  PostsToRender.sort((a: any, b: any) => {
    //@ts-ignore
    return new Date(b.date) - new Date(a.date)
  })

  function OrganizePosts() {
    useEffect(() => {
      if (PostsToRenderAPI.length > 0) {
        PostsToRender.sort((a: any, b: any) => {
          //@ts-ignore
          return new Date(b.date) - new Date(a.date)
        })
      }
    }, [PostsToRender])
  }

  OrganizePosts()

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
        <div
          style={{
            width: 'min(1328px, 95vw)'
          }}
        >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-12 col-xl-12">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: '#000', height: '200px' }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: '150px' }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: '150px', zIndex: 1 }}
                    />
                    <h5 style={{ zIndex: 1, color: '#000', marginLeft: '5px' }}>
                      Avaliação
                    </h5>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue)
                      }}
                    />
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <h5>Nome do Usuário</h5>
                    <p>Dado Secundário</p>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">{PostsToRenderAPI.length}</p>
                      <p className="small text-muted mb-0">Postagens</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <h3
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontSize: '3rem',
              borderBottom: '1px solid silver'
            }}
          >
            Dicas Exclusivas!
          </h3>
        </div>
      </div>

      <div
        className={`container ${styles.timeline} `}
        style={{ minHeight: '100vh' }}
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

export default Privatepost
