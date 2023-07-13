'use client'

import { useRouter } from 'next/router';
import Image from 'next/image'
import { use, useEffect, useRef, useState } from 'react'
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

import { BiUser, BiUserVoice } from 'react-icons/bi'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { CiMoneyBill } from 'react-icons/ci'
import { FiList } from 'react-icons/fi'
import { LuClipboardList } from 'react-icons/lu'
import { MdOutlineNotListedLocation } from 'react-icons/md'
import { BsEnvelopePaper } from 'react-icons/bs'
import { MdOutlineMoneyOff } from 'react-icons/md'
import { GiBrokenBone } from 'react-icons/gi'
import { FaUsers } from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'

import logo from '../../public/logoSistema.png'

export default function dashboard() {

  const router = useRouter();

  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [showBar, setShowBar] = useState(false);
  //OpcionesDelMenu
  const [opcionesMenu, setOpcionesMenu] = useState([{
    0: false,
    component: CentroCostos
  }, {
    1: false,
    component: MovimientoPlanilla
  }, {
    2: false,
    component: CategoriaOcupacional
  }, {
    3: false,
    component: Trabajador
  }, {
    4: false,
    component: TipoTrabajador
  }, {
    5: false,
    component: EstadoTrabajador
  }, {
    6: false,
    component: TipoContrato
  }, {
    7: false,
    component: TipoComision
  }, {
    8: false,
    component: TipoCese
  }, {
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
  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div className={loading ? 'divLoader' : 'ocultar'}>
      <div class="loader">
        <div class="loader-circle"></div>
        <span class="loader-text">Cargando...</span>
      </div>

    </div>
  }

  return (

    <main>
      <a onClick={()=>setShowBar(!showBar)} className='MostrarBar'>
        <GiHamburgerMenu/>
      </a>
      <div className={showBar ? 'SideBar' : 'sideBarShow'}>
        <center>
          <Image src={logo} alt="Logo" width={160} height={130} />
        </center>

        <br />
        <br />
        <br />

        <div className="dropdown">

          <div className='dropdown-contentClick'>
            <a className={opcionesMenu[0][0] ? 'color' : ''} onClick={() => handleChangeOption(0)}><LuClipboardList />Centro de Costos</a>
            <a className={opcionesMenu[1][1] ? 'color' : ''} onClick={() => handleChangeOption(1)}><FiList />Concepto de Nomina</a>
            <a className={opcionesMenu[3][3] ? 'color' : ''} onClick={() => handleChangeOption(3)}><BiUser />Trabajador</a>
            <a className={opcionesMenu[2][2] ? 'color' : ''} onClick={() => handleChangeOption(2)}><BiUserVoice />Categoria Ocupacional</a>
            <a className={opcionesMenu[4][4] ? 'color' : ''} onClick={() => handleChangeOption(4)}><HiOutlineUserGroup />Tipo de Trabajador</a>
            <a className={opcionesMenu[5][5] ? 'color' : ''} onClick={() => handleChangeOption(5)}><MdOutlineNotListedLocation />Estado de Trabajador</a>
            <a className={opcionesMenu[6][6] ? 'color' : ''} onClick={() => handleChangeOption(6)}><BsEnvelopePaper />-Tipo de Contrato</a>
            <a className={opcionesMenu[7][7] ? 'color' : ''} onClick={() => handleChangeOption(7)}><MdOutlineMoneyOff />-Tipo de Comision</a>
            <a className={opcionesMenu[8][8] ? 'color' : ''} onClick={() => handleChangeOption(8)}><GiBrokenBone />Tipo de Cese</a>
            <a className={opcionesMenu[9][9] ? 'color' : ''} onClick={() => handleChangeOption(9)}><CiMoneyBill />Nivel Salarial</a>
          </div>
          <div style={{marginTop:"85%"}}>
            <a onClick={() => setUser(null)} > Cerrar Sesión</a>
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
