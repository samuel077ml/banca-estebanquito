import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register({ setUser }){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [account,setAccount]=useState('')
  const [type,setType]=useState('ahorros')
  const [balance,setBalance]=useState(0)
  const navigate = useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if(users.find(u=>u.email===email)){ alert('Email ya registrado'); return }
    const newUser = { id: Date.now(), name, email, password, account, type, balance: Number(balance), transactions:[], loans:[] }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    setUser(newUser)
    navigate('/')
  }

  return (
    <div className="container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} required />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="row">
          <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <input placeholder="Número de cuenta" value={account} onChange={e=>setAccount(e.target.value)} required />
        </div>
        <div className="row">
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option value="ahorros">Ahorros</option>
            <option value="corriente">Corriente</option>
          </select>
          <input placeholder="Saldo inicial" type="number" value={balance} onChange={e=>setBalance(e.target.value)} />
        </div>
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  )
}
