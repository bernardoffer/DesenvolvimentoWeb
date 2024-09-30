import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Principal = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Bem vindo !</div>;
  }

  return (
    <div>
      <h2>Bem-vindo, {userData.nome} {userData.sobrenome}!</h2>
      <p>Data de Nascimento: {userData.dataNascimento}</p>
      <p>Estamos felizes em tê-lo aqui! Explore suas opções e aproveite ao máximo nossa plataforma.</p>
    </div>
  );
};

export default Principal;
