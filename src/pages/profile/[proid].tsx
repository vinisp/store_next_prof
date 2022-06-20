import axios from 'axios'
import { format } from 'date-fns'

const Profile = ({ dados }: any) => {
  const PostsToRender = dados.map((e: any) => ({
    post: e.post_content,
    date: format(new Date(e.createdAt), 'dd MMM yyyy H:mm:s')
  }))
  console.log(
    PostsToRender.sort((a: any, b: any) => {
      return new Date(b.date) - new Date(a.date)
    })
  )
  return (
    <>
      <div
        className="container"
        style={{ minHeight: '90vh', marginTop: '2rem' }}
      >
        <div className="row">
          <div className="col">
            <div
              className="row"
              style={{
                height: '80px',
                width: '80px',
                borderRadius: '50%',
                backgroundColor: 'cyan',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Avatar
            </div>
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                fontSize: '1.4rem'
              }}
            >
              Nome
            </div>
          </div>
        </div>

        {PostsToRender.map((e: any) => (
          <>
            <div
              className="container"
              style={{ marginTop: '2rem', borderBottom: 'solid 1px silver' }}
            >
              <div className="row">
                <div className="col">
                  <div className="row">{e.post}</div>
                  <div className="row">
                    {format(new Date(e.date), 'dd/MM/yyyy p')}
                  </div>
                </div>
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
