import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setUser }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if(found){
      localStorage.setItem('currentUser', JSON.stringify(found))
      setUser(found)
      navigate('/')
      return
    }
    alert('Credenciales inválidas')
  }

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p className="small">¿No tienes cuenta? Regístrate.</p>
    </div>
  )
}
