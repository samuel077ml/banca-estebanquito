import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import Loans from './components/Loans'
import Reports from './components/Reports'

export default function App(){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const u = JSON.parse(localStorage.getItem('currentUser'))
    if(u) setUser(u)
  },[])

  const handleLogout = ()=>{
    localStorage.removeItem('currentUser')
    setUser(null)
    navigate('/login')
  }

  return (
    <div className="app">
      <header>
        <h1>Banca Estebanquito</h1>
        <nav>
          {user ? (
            <>
              <Link to="/">Cuenta</Link>
              <Link to="/transactions">Transacciones</Link>
              <Link to="/loans">Préstamos</Link>
              <Link to="/reports">Reportes</Link>
              <button className="link-btn" onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/transactions" element={<Transactions user={user} setUser={setUser} />} />
          <Route path="/loans" element={<Loans user={user} setUser={setUser} />} />
          <Route path="/reports" element={<Reports user={user} />} />
        </Routes>
      </main>
    </div>
  )
}
