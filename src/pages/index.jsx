'use client'

import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import { useUser } from '../../controllers/useProvider';
export default function Home() {

  const { user, setUser } = useUser();

  const router = useRouter();
  const usuario = useRef("")
  const password = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`/api/users?usuario=${usuario.current.value}&password=${password.current.value}`)
      .then(response => response.json())
      .then(data => {
        const dataRenderTables = data.map((item) => {
          return {
            CODIGOPERFIL: item.CODIGOPERFIL,
            COMPANIA: item.COMPANIA,
            Cargo: item.Cargo,
            ESTADO: item.ESTADO,
            Emisor: item.Emisor,
            NOMBRECOMPANIA: item.NOMBRECOMPANIA,
            NOMBREEMISOR: item.NOMBREEMISOR,
            NOMBREUSUARIO: item.NOMBREUSUARIO,
            OBSERVACION: item.OBSERVACION,
            PERFIL: item.PERFIL,
            RucUsuario: item.RucUsuario,
            USUARIOCLIENTE: item.USUARIOCLIENTE,
          }
        });
        setUser(dataRenderTables)
      }).catch((error) => {
        alert("Usuario o contraseña incorrecta")
      })
      ;

  }

  useEffect(() => {
    if (user && user[0]?.OBSERVACION == "INGRESO EXITOSO") {
      router.push({ pathname: '/emisor' }, '/emisor');
    } else if (user && user[0]?.OBSERVACION == "CONTRASEÑA INVALIDA") {
      alert("Usuario o contraseña incorrecta")
      console.log(user)
    }
  }, [user])


  return (

    <main>
      <div className='Login'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <span>Ingrese el Usuario</span>
          <input type="text" name="" pattern="\d{4}" maxlength="4" title="Por favor ingresa 4 dígitos numéricos" placeholder='Usuario' id="" ref={usuario} required />
          <span>Ingrese la contraseña</span>
          <input type="password" name="" placeholder='Contraseña' required ref={password} id="" />
          <center>
            <button>
              Ingresar
            </button>
          </center>

        </form>
      </div>
    </main>
  )
}
