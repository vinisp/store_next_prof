import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from 'assets/img/logo.png'
const NavBar = () => {
  const { data: session } = useSession()
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand p-0 bg-dark">
        <ul
          className="navbar-nav d-none d-md-flex mr-auto"
          style={{ width: '100%', paddingLeft: 25 }}
        >
          <div style={{ marginLeft: '5px' }}>
            <li className="nav-item">
              <Link href={'/'}>
                <a className="navbar-brand">
                  <Image src={Logo} width={70} height={70} />
                </a>
              </Link>
            </li>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: '1rem',
              alignItems: 'center',
              width: '90%'
            }}
          >
            {session ? (
              <>
                <li className="nav-item">
                  <Link href="/produtores">
                    <a className="nav-link"> Produtores </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/tipsters">
                    <a className="nav-link"> Tipsters </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/app">
                    <a className="nav-link"> Area do usuário </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/developer">
                    <a className="nav-link"> Area do Criador </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => signOut()}>
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/tipsters">
                    <a className="nav-link"> Tipsters </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => signIn()}>
                    Sign in
                  </button>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </>
  )
}

export default NavBar
