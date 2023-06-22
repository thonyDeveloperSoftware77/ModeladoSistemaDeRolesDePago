'use client'

import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import { useUser } from '../../controllers/useProvider';
import CentroCostos from '../../views/CentroCostos';
export default function dashboard() {

  const { user, setUser } = useUser();
  //OpcionesDelMenu
  const [opcionesMenu, setOpcionesMenu] = useState([{
    0: false,
    component: CentroCostos
  }]);


  const handleChangeOption = (numero) => {
    const nuevasOpcionesMenu = opcionesMenu.map((opcion, index) => {
      return {
        ...opcion,
        [index]: index === numero
      }
    })

    setOpcionesMenu(nuevasOpcionesMenu)
  }
  return (

    <main>
      <div className='SideBar'>

        <br />
        <br />
        <br />

        <div className="dropdown">

          <a className={opcionesMenu[0][0] ? 'color' : ''} onClick={() => handleChangeOption(0)}>-Centro de Costos</a>

        </div>


      </div>
      <div className='ContentContainer'>
        

        <div style={{ width: "100%" }}>
          {opcionesMenu.map((opcion, index) => {
            if (opcion[index]) {
              const Component = opcion.component;
              return <div key={index}><Component /></div>
            }
          })}
        </div>


      </div>
    </main>
  )
}
