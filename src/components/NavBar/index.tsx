import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const NavBar = () => {
  const { data: session } = useSession()
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand p-0 bg-success">
        <ul className="navbar-nav d-none d-md-flex mr-auto">
          <li className="nav-item">
            <Link href={'/'}>
              <a className="nav-link"> LOGO </a>
            </Link>
          </li>

          {session ? (
            <>
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
                <button className="nav-link" onClick={() => signIn()}>
                  Sign in
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default NavBar
