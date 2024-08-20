import { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Login.css';

import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
  let navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin } = useContext(AuthContext);
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home');
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={login}>
        <h2 className="login-title">Entrar</h2>
        <div className="input-group">
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            className="login-input"
            value={usuarioLogin.usuario}
            onChange={atualizarEstado}
          />
        </div>
        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="login-input"
            value={usuarioLogin.senha}
            onChange={atualizarEstado}
          />
        </div>
        <button type="submit" className="login-button">
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>Entrar</span>
          )}
        </button>
        <hr className="login-divider" />
        <p className="signup-text">
          Ainda não tem uma conta?{' '}
          <Link to="/cadastro" className="signup-link">
            Cadastre-se
          </Link>
        </p>
      </form>
      <div className="fundoLogin"></div>
    </div>
  );
}

export default Login;

