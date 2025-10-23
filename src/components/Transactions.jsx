import React, { useState, useEffect } from 'react'

export default function Transactions({ user, setUser }){
  const [cur, setCur] = useState(user)
  const [amount,setAmount] = useState(0)
  const [toAccount,setToAccount] = useState('')

  useEffect(()=>{
    setCur(JSON.parse(localStorage.getItem('currentUser')))
  },[user])

  if(!cur) return <div className="container"><p>Por favor inicia sesión.</p></div>

  const saveUser = (u)=>{
    const users = JSON.parse(localStorage.getItem('users')||'[]')
    const idx = users.findIndex(x=>x.id===u.id)
    if(idx>=0) users[idx]=u
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(u))
    setUser(u)
    setCur(u)
  }

  const addTransaction = (type)=>{
    let u = {...cur}
    const amt = Number(amount)
    if(type==='retiro' && amt>u.balance){ alert('Saldo insuficiente'); return }
    if(type==='retiro') u.balance -= amt
    if(type==='deposito') u.balance += amt
    if(type==='transferencia'){
      if(amt>u.balance){ alert('Saldo insuficiente'); return }
      u.balance -= amt
      const users = JSON.parse(localStorage.getItem('users')||'[]')
      const target = users.find(x=>x.account===toAccount)
      if(!target){ alert('Cuenta destino no encontrada'); return }
      target.balance += amt
      const idx = users.findIndex(x=>x.id===target.id); users[idx]=target
      localStorage.setItem('users', JSON.stringify(users))
    }
    const tx = { id: Date.now(), tipo:type, monto:amt, fecha:new Date().toISOString() }
    u.transactions = u.transactions||[]
    u.transactions.unshift(tx)
    saveUser(u)
    setAmount(0); setToAccount('')
  }

  return (
    <div className="container">
      <h2>Transacciones</h2>
      <div style={{marginBottom:12}}>
        <div className="row">
          <input placeholder="Monto" type="number" value={amount} onChange={e=>setAmount(e.target.value)} />
          <button onClick={()=>addTransaction('deposito')}>Depositar</button>
          <button onClick={()=>addTransaction('retiro')}>Retirar</button>
        </div>
        <div className="row" style={{marginTop:8}}>
          <input placeholder="Cuenta destino (para transferencia)" value={toAccount} onChange={e=>setToAccount(e.target.value)} />
          <button onClick={()=>addTransaction('transferencia')}>Transferir</button>
        </div>
      </div>

      <h3>Historial</h3>
      <table className="table">
        <thead><tr><th>Tipo</th><th>Monto</th><th>Fecha</th></tr></thead>
        <tbody>
          { (cur.transactions||[]).map(tx=>(
            <tr key={tx.id}><td>{tx.tipo}</td><td>${tx.monto.toFixed(2)}</td><td className="small">{new Date(tx.fecha).toLocaleString()}</td></tr>
          )) }
        </tbody>
      </table>
    </div>
  )
}
