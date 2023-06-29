'use client'

import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import { useUser } from '../../controllers/useProvider';
import CentroCostos from '../../views/CentroCostos';
import MovimientoPlanilla from '../../views/MovimientoPlanilla';
import CategoriaOcupacional from '../../views/CategoriaOcupacional';
import Trabajador from '../../views/Trabajador';
import TipoTrabajador from '../../views/TipoTrabajador';
import EstadoTrabajador from '../../views/EstadoTrabajador';
import TipoContrato from '../../views/TipoContrato';
import TipoComision from '../../views/TipoComision';
import TipoCese from '../../views/TipoCese';
import NivelSalarial from '../../views/NivelSalarial';

export default function dashboard() {

  const { user, setUser } = useUser();
  //OpcionesDelMenu
  const [opcionesMenu, setOpcionesMenu] = useState([{
    0: false,
    component: CentroCostos
  },{
    1: false,
    component: MovimientoPlanilla
  },{
    2: false,
    component: CategoriaOcupacional
  },{
    3: false,
    component: Trabajador
  },{
    4: false,
    component: TipoTrabajador
  },{
    5: false,
    component: EstadoTrabajador
  },{
    6: false,
    component: TipoContrato
  },{
    7: false,
    component: TipoComision
  },{
    8: false,
    component: TipoCese
  },{
    9: false,
    component: NivelSalarial
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

          <div className='dropdown-contentClick'>
          <a className={opcionesMenu[0][0] ? 'color' : ''} onClick={() => handleChangeOption(0)}>-Centro de Costos</a>
          <a className={opcionesMenu[1][1] ? 'color' : ''} onClick={() => handleChangeOption(1)}>-Concepto de Nomina</a>
          <a className={opcionesMenu[3][3] ? 'color' : ''} onClick={() => handleChangeOption(3)}>-Trabajador</a>
          <a className={opcionesMenu[2][2] ? 'color' : ''} onClick={() => handleChangeOption(2)}>-Categoria Ocupacional</a>
          <a className={opcionesMenu[4][4] ? 'color' : ''} onClick={() => handleChangeOption(4)}>-Tipo de Trabajador</a>
          <a className={opcionesMenu[5][5] ? 'color' : ''} onClick={() => handleChangeOption(5)}>-Estado de Trabajador</a>
          <a className={opcionesMenu[6][6] ? 'color' : ''} onClick={() => handleChangeOption(6)}>-Tipo de Contrato</a>
          <a className={opcionesMenu[7][7] ? 'color' : ''} onClick={() => handleChangeOption(7)}>-Tipo de Comision</a>
          <a className={opcionesMenu[8][8] ? 'color' : ''} onClick={() => handleChangeOption(8)}>-Tipo de Cese</a>
          <a className={opcionesMenu[9][9] ? 'color' : ''} onClick={() => handleChangeOption(9)}>-Nivel Salarial</a>
          </div>
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
