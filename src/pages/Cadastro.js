import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const navigate = useNavigate(); // Definindo o useNavigate

  const handleCadastro = async () => {
    // Validação básica
    if (!email || !senha || !nome || !sobrenome || !dataNascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        nome,
        sobrenome,
        dataNascimento,
        uid: user.uid,
      });
      
      alert('Usuário cadastrado com sucesso!');
      navigate('/'); // Navega para a tela de login após o cadastro bem-sucedido
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
      alert(`Erro ao cadastrar usuário: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
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
      <input 
        type="text" 
        placeholder="Nome" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Sobrenome" 
        value={sobrenome} 
        onChange={(e) => setSobrenome(e.target.value)} 
      />
      <input 
        type="date" 
        value={dataNascimento} 
        onChange={(e) => setDataNascimento(e.target.value)} 
      />
      <button onClick={handleCadastro}>Cadastrar</button>
      {/* Botão para voltar para a tela de login */}
      <button onClick={() => navigate('/')}>Voltar ao Login</button>
    </div>
  );
};

export default Cadastro;
