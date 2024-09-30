import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Principal = () => {
  const [userData, setUserData] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('Usuário não encontrado no Firestore.');
        }
      } else {
        console.log('Nenhum usuário autenticado.');
      }
      setLoading(false);
    };

    // Simulando busca de notícias
    const fetchNoticias = async () => {
      const noticiasFicticias = [
        { id: 1, titulo: "Notícia 1", conteudo: "Conteúdo da notícia 1." },
        { id: 2, titulo: "Notícia 2", conteudo: "Conteúdo da notícia 2." },
        { id: 3, titulo: "Notícia 3", conteudo: "Conteúdo da notícia 3." },
      ];
      setNoticias(noticiasFicticias);
    };

    fetchUserData();
    fetchNoticias();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!userData) {
    return <div>Usuário não encontrado. Faça login novamente.</div>;
  }

  return (
    <div>
      <h2>Bem-vindo, {userData.nome} {userData.sobrenome}</h2>
      <p>Data de Nascimento: {userData.dataNascimento}</p>

      <h3>Feed de Notícias</h3>
      <div>
        {noticias.length === 0 ? (
          <p>Nenhuma notícia disponível.</p>
        ) : (
          noticias.map(noticia => (
            <div key={noticia.id} style={styles.noticia}>
              <h4>{noticia.titulo}</h4>
              <p>{noticia.conteudo}</p>
            </div>
          ))
        )}
      </div>

      <button onClick={() => navigate('/')}>Voltar ao Login</button> {/* Botão para voltar ao login */}
    </div>
  );
};

// Estilos para as notícias
const styles = {
  noticia: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
};

export default Principal;
