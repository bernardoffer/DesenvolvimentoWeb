import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/principal');
    } catch (error) {
      setError('Usuário não cadastrado ou senha incorreta.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Entrar</button>
      {/* Botão para redirecionar para o cadastro */}
      <button onClick={() => navigate('/cadastro')}>Registre-se</button>
      {/* Botão para redirecionar para a página principal */}
      <button onClick={() => navigate('/principal')}>Ir para Principal</button>
    </div>
  );
};

export default Login;
