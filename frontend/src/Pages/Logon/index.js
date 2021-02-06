import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
 
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

export default function Logon() {
  const history = useHistory(); 
  const [id, setid] = useState('');

  async function handleLogin(e){
    e.preventDefault();

    const data= { // controlar oque mandar
      id,
    };
    
    try {
      const response = await api.post('sessions', data); //chamada do banco
      localStorage.setItem('ongId',id); // guardar o id
      localStorage.setItem('ongName',response.data.name); // guardar nome
      history.push('/profile'); // redirecionar 
    } catch (err) {
      alert ('Erro no Login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

      <form onSubmit={handleLogin}>
        <h1> Faça seu Logon </h1>
        <input 
          required
          placeholder="Sua ID" 
          value={id}
          onChange={e => setid(e.target.value)} 
        />
        <button className="button" type="submit"> Entrar </button>
        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#e02041" />
          Não tenho cadastro
        </Link>
      </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}