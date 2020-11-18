import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register() {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [whatsapp, setwhatsapp] = useState("");
  const [city, setcity] = useState("");
  const [uf, setuf] = useState("");
  
  const [redirect, setRedirect] = useState(false);
  function handleReset() {
    setRedirect(true);
  };


  async function handleRegister(e){
    e.preventDefault();

    const data= {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try {
      const response = await api.post('ongs', data); //chamada do banco
      alert (`Seu ID de acesso: ${response.data.id}`);
      setRedirect(response.status);
    } catch (err) {
      alert ('Erro no cadastro, tente novamente');
    }
  }
  
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Cadastro </h1>
          <p> Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG. </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>
        {redirect && <Redirect to="/" />}
        <form onSubmit={handleRegister} onReset={handleReset} >
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setname(e.target.value)}
          />
          <input type="email" 
            placeholder="Email"  
            value={email} 
            onChange={e => setemail(e.target.value)}
          />
          <input 
            placeholder="WhatsApp" 
            value={whatsapp} 
            onChange={e => setwhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input 
              placeholder="Cidade"  
              value={city} 
              onChange={e => setcity(e.target.value)}
            />
            <input 
              placeholder="UF"  style={{ width :80 }}
              value={uf} 
              onChange={e => setuf(e.target.value)}
            />
          </div>
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}