/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios'
import { format } from 'date-fns'
import styles from './Profile.module.css'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

const Privatepost = () => {
  const route = useRouter()
  const [PostsToRenderAPI, setPostsToRenderAPI] = useState<any[]>([])
  const [PostsToRender, setPostsToRender] = useState<any[]>([])

  const query = route.query.pid

  function getPrivatePosts() {
    const { data: session } = useSession()

    useEffect(() => {
      session
        ? axios
            .get(
              `http://localhost:3001/private_post/${query}/${session.user?.email}`
            )
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
        <div>
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '1rem',
            gap: '2rem'
          }}
        ></div>
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

export default Privatepost
