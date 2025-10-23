import React, { useState, useEffect } from 'react'

export default function Loans({ user, setUser }){
  const [cur, setCur] = useState(user)
  const [amount,setAmount] = useState(0)
  const [term,setTerm] = useState(12)

  useEffect(()=>{ setCur(JSON.parse(localStorage.getItem('currentUser'))) },[user])

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

  const requestLoan = ()=>{
    const u = {...cur}
    const loan = { id:Date.now(), monto: Number(amount), plazo: Number(term), estado:'pendiente', fecha: new Date().toISOString() }
    u.loans = u.loans||[]
    u.loans.unshift(loan)
    saveUser(u)
    setAmount(0)
  }

  const approveLoan = (loanId)=>{
    const u = {...cur}
    const ln = u.loans.find(l=>l.id===loanId)
    if(!ln) return
    ln.estado = 'aprobado'
    u.balance += ln.monto
    // add as income transaction
    u.transactions = u.transactions || []
    u.transactions.unshift({ id: Date.now()+1, tipo:'prestamo', monto: ln.monto, fecha: new Date().toISOString() })
    saveUser(u)
  }

  const rejectLoan = (loanId)=>{
    const u = {...cur}
    const ln = u.loans.find(l=>l.id===loanId)
    if(!ln) return
    ln.estado = 'rechazado'
    saveUser(u)
  }

  return (
    <div className="container">
      <h2>Préstamos</h2>
      <div className="row" style={{marginBottom:12}}>
        <input placeholder="Monto" type="number" value={amount} onChange={e=>setAmount(e.target.value)} />
        <input placeholder="Plazo (meses)" type="number" value={term} onChange={e=>setTerm(e.target.value)} />
        <button onClick={requestLoan}>Solicitar</button>
      </div>

      <h3>Solicitudes</h3>
      <table className="table">
        <thead><tr><th>Monto</th><th>Plazo</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>
          { (cur.loans||[]).map(l=>(
            <tr key={l.id}>
              <td>${l.monto.toFixed(2)}</td>
              <td>{l.plazo} meses</td>
              <td>{l.estado}</td>
              <td>
                {l.estado==='pendiente' && (
                  <>
                    <button className="link-like" onClick={()=>approveLoan(l.id)}>Aprobar</button> | 
                    <button className="link-like" onClick={()=>rejectLoan(l.id)}>Rechazar</button>
                  </>
                )}
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )
}
