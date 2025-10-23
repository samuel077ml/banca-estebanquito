import React, { useEffect, useState } from 'react'

export default function Dashboard({ user, setUser }){
  const [u, setU] = useState(user)

  useEffect(()=>{
    const cur = JSON.parse(localStorage.getItem('currentUser'))
    setU(cur)
  },[user])

  if(!u) return <div className="container"><p>Por favor inicia sesión.</p></div>

  return (
    <div className="container">
      <h2>Hola, {u.name}</h2>
      <p>Cuenta: <strong>{u.account}</strong></p>
      <p>Tipo: <strong>{u.type}</strong></p>
      <p>Saldo: <strong>${u.balance.toFixed(2)}</strong></p>

      <section style={{marginTop:20}}>
        <h3>Resumen rápido</h3>
        <p className="small">Transacciones registradas: { (u.transactions || []).length }</p>
        <p className="small">Préstamos solicitados: { (u.loans || []).length }</p>
      </section>
    </div>
  )
}
