import React, { useEffect, useState } from 'react'

export default function Reports({ user }){
  const [u,setU] = useState(null)

  useEffect(()=>{ setU(JSON.parse(localStorage.getItem('currentUser'))) },[])

  if(!u) return <div className="container"><p>Por favor inicia sesión.</p></div>

  const ingresos = (u.transactions||[]).filter(t=> t.tipo==='deposito' || t.tipo==='prestamo').reduce((s,t)=>s+t.monto,0)
  const egresos = (u.transactions||[]).filter(t=> t.tipo==='retiro' || t.tipo==='transferencia').reduce((s,t)=>s+t.monto,0)
  const deudas = (u.loans||[]).filter(l=> l.estado!=='rechazado').reduce((s,l)=> s + (l.estado==='aprobado' ? 0 : l.monto), 0)

  return (
    <div className="container">
      <h2>Reportes financieros</h2>
      <p>Ingresos históricos: <strong>${ingresos.toFixed(2)}</strong></p>
      <p>Egresos históricos: <strong>${egresos.toFixed(2)}</strong></p>
      <p>Deuda pendiente (solicitudes pend/act): <strong>${deudas.toFixed(2)}</strong></p>
    </div>
  )
}
