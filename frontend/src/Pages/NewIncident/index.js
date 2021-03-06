import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import api from '../../services/api';

import logoImg from '../../assets/logo.svg' 

export default function NewIncident() {

  const ongId = localStorage.getItem('ongId')

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 
  const [value, setValue] = useState("");
  const history = useHistory(); 

  
  async function handleNewIncident(e){
    e.preventDefault();
    const data = {
      title,
      description,
      value,
    };
    try {
      const response = await api.post('incidents',data,{ // chamar api com rota
        headers:{
          Authorization: ongId, // passando para a api a autorizacao com base no header
        }
      })
      history.push('/profile');
      
    } catch (error) {
      alert('Erro ao cadastrar caso, Tente novamante. ')
    }
  }
  
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Cadastrar Novo Caso </h1>
          <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleNewIncident} >
          <input placeholder="Titulo do Caso"  
          required
          value={title}
          onChange={e=> setTitle(e.target.value)}
          />
          <textarea placeholder="Descrição" 
          required
          value={description}
          onChange={e=> setDescription(e.target.value)}
          />
          <input placeholder="Valor em Reais"  
          required
          value={value}
          onChange={e=> setValue(e.target.value)}
          />
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}