import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import './Navbar.css'; 

function Navbar() {
  let navigate = useNavigate()

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        alert('Usuário deslogado com sucesso')
        navigate('/login')
    }

    let navbarComponent

    if(usuario.token !== "") {
      navbarComponent = (
    <div className="navbar w-full bg-indigo-900 text-white flex justify-center py-4">
      <div className="container flex justify-between text-lg">
        <div className="logo text-2xl font-bold uppercase">Clube das Winx</div>
        <div className="search-container">
          <input type="text" placeholder="Pesquisar..." />
        </div>
        <div className="links flex gap-4 items-center">
          <Link to="/home" className="nav-link hover:underline">Home</Link>
          <Link to='/postagens' className="nav-link hover:underline">Postagens</Link>
          <Link to="/temas" className="nav-link hover:underline">Temas</Link>
          <Link to='/cadastroTema' className='nav-link hover:underline'>Cadastrar tema</Link>
          <Link to="/perfil" className="nav-link hover:underline">Perfil</Link>
          <div className="nav-link cursor-pointer hover:underline" onClick={logout}>
            Sair
          </div>
        </div>
      </div>
    </div>
      )
    }

  return (
    <>
      {navbarComponent}
    </>
  )
}

export default Navbar


