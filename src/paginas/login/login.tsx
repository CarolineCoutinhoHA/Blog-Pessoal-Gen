import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import fundoLoginImg from '../../assets/img/asaswinx.jpg'; // Importe a imagem

function Login() {
  let navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

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

  // Estilos inline
  const bodyStyle: React.CSSProperties = {
    backgroundColor: '#f9f3f3', // Rosa claro quase branco
    margin: 0, // Remove margens padrão do body
    height: '100vh', // Garante que o body ocupe toda a altura da viewport
    overflow: 'hidden', // Evita barras de rolagem
  };

  const fundoLoginStyle: React.CSSProperties = {
    backgroundImage: `url(${fundoLoginImg})`, // Usando a imagem importada
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain', // Ajusta a imagem para caber dentro do elemento sem cortar
    backgroundPosition: 'right', // Posiciona a imagem no canto direito
    position: 'absolute', // Remove o elemento do fluxo normal para poder ajustar a posição
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1, // Garante que a imagem fique atrás do formulário
  };

  const loginContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end', // Alinha o formulário à direita
    alignItems: 'center', // Centraliza verticalmente
    height: '100vh',
    width: '100%',
    padding: 0, // Remove padding se necessário
    position: 'relative', // Faz o container ficar acima da imagem de fundo
    zIndex: 1,
  };

  const loginFormStyle: React.CSSProperties = {
    backgroundColor: '#fff', // Fundo branco para o formulário
    border: '2px solid #f78da7', // Borda rosa claro
    borderRadius: '12px', // Bordas arredondadas
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra suave
    padding: '20px', // Espaçamento interno
    maxWidth: '400px', // Largura máxima do formulário
    width: '100%', // Largura total do formulário
    marginLeft: '250px', // Ajuste o valor conforme necessário para o espaço à direita
    zIndex: 1, // Garante que o formulário esteja acima da imagem de fundo
  };

  const loginTitleStyle: React.CSSProperties = {
    color: '#fff', // Cor branca
    backgroundColor: '#d14d72', // Cor de fundo rosa escuro
    borderRadius: '20px', // Bordas arredondadas
    textAlign: 'center',
    padding: '10px',
    fontSize: '2rem',
    fontWeight: 'bold', // Fonte grossa
    marginBottom: '20px',
  };

  const inputGroupStyle: React.CSSProperties = {
    marginBottom: '15px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const loginInputStyle: React.CSSProperties = {
    border: '2px solid #f78da7', // Borda rosa claro
    borderRadius: '20px', // Bordas arredondadas
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const loginInputFocusStyle: React.CSSProperties = {
    border: '2px solid #941d58', // Borda rosa escuro
    backgroundColor: '#e6f5f1', // Fundo lavanda pastel claro
    color: '#000', // Texto preto
  };

  const loginButtonStyle: React.CSSProperties = {
    backgroundColor: '#fc3153', // Cor de fundo rosa claro
    color: '#fff', // Cor do texto em branco
    border: 'none',
    borderRadius: '8px', // Bordas arredondadas
    padding: '10px 30px', // Espaçamento interno
    fontSize: '16px', // Tamanho da fonte
    fontWeight: 'bold', // Deixa a fonte mais grossa
    cursor: 'pointer', // Muda o cursor para indicar um botão clicável
    display: 'block', // Necessário para a margem automática funcionar
    margin: '0 auto', // Centraliza horizontalmente
  };

  const loginButtonHoverStyle: React.CSSProperties = {
    backgroundColor: '#4fc3f7', // Cor de fundo azul claro quando o mouse passa sobre o botão
    color: '#000', // Cor do texto em preto quando o mouse passa sobre o botão
  };

  const loginDividerStyle: React.CSSProperties = {
    border: '1px solid #f78da7', // Linha rosa claro
    margin: '20px 0',
  };

  const signupTextStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  const signupLinkStyle: React.CSSProperties = {
    color: '#8000a0', // Fucsia
    textDecoration: 'underline',
  };

  const [inputFocus, setInputFocus] = useState<string | null>(null);

  return (
    <div style={bodyStyle}>
      <div style={loginContainerStyle}>
        <form
          style={loginFormStyle}
          onSubmit={login}
          className="flex flex-col w-1/2 gap-4"
        >
          <h2 style={loginTitleStyle}>Login</h2>
          <div style={inputGroupStyle} className="flex flex-col w-full">
            <label htmlFor="usuario" style={labelStyle}>
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              style={loginInputStyle}
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div style={inputGroupStyle} className="flex flex-col w-full">
            <label htmlFor="senha" style={labelStyle}>
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              style={{
                ...loginInputStyle,
                ...(inputFocus === 'senha' ? loginInputFocusStyle : {}),
              }}
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              onFocus={() => setInputFocus('senha')}
              onBlur={() => setInputFocus(null)}
            />
          </div>
          <button
            type="submit"
            style={{
              ...loginButtonStyle,
              ...(inputFocus === 'button' ? loginButtonHoverStyle : {}),
            }}
            onMouseOver={() => setInputFocus('button')}
            onMouseOut={() => setInputFocus(null)}
          >
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
          <hr style={loginDividerStyle} />
          <p style={signupTextStyle}>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" style={signupLinkStyle}>
              Cadastre-se
            </Link>
          </p>
        </form>
        <div style={fundoLoginStyle} className="hidden lg:block"></div>
      </div>
    </div>
  );
}

export default Login;
