import React, { useState, useEffect } from 'react'
import { Link ,useHistory} from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'


import api from '../../services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Profile() {
  const [incidents, setincidents] = useState ([]); // fazer a troca dos valores , arrary

  const history = useHistory();
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')

  useEffect(()=> { // uma funcao que chama a api
    api.get('profile',{ // chamar api com rota
      headers:{
        Authorization: ongId, // passando para a api a autorizacao com base no header
      }
    }).then(response => {
      setincidents(response.data) // guardar  no incident os dados do banco
    })
  },[ongId]);

  async function handleDeleteIncitend(id){ // deletar incidentes com base no id (key)
    try {
      await api.delete(`incidents/${id}`,{ // chamar api com rota
        headers:{
          Authorization: ongId, // passando para a api a autorizacao com base no header
        }
      });
      setincidents(incidents.filter(incident => incident.id !== id )) // vai mostrar todos incidente ao qual nao foram deletados
    } catch (err) {
      alert ('Erro ao deletar caso, tente novamente');
    }
  }

  function handlelogout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span> Bem-vinda, {ongName}</span>

        <Link className="button" to="/incidents/new"> Cadastrar novo caso </Link>
        <button onClick={handlelogout} type="button">
        <FiPower size={18} color="e02041"/>
        </button>
      </header>
      <h1> Casos Cadastrados </h1>
      <ul>
          {incidents.map(incident =>(
            

            <li key={incident.id}>
              <img src={logoImg} alt="Be The Hero" />
              <strong> CASO: </strong>
              <p> {incident.title} </p>
      
              <strong> DESCRIÇÃO: </strong>
              <p> {incident.description} </p>
      
              <strong> VALOR: </strong>
              <p> 
                
                {Intl.NumberFormat('pt-BR', { style : 'currency', currency: 'BRL'}).format(incident.value)}
              </p>
              <button  onClick={ () => handleDeleteIncitend (incident.id) } type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}