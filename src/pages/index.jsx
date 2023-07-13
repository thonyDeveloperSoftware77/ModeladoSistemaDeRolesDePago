'use client'

import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import { useUser } from '../../controllers/useProvider';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../public/logoSistema.png'

//Importar Spline design
import Spline from '@splinetool/react-spline';
export default function Home() {

  const notifySucces = () => toast("Usuario Logeado con Exito!");
  const notifyError = (message) => toast.error("Error, UsuarioInvalido");
  const notifyErrorEmisor = (message) => toast.error("Error, Emisor Invalido");

  const { user, setUser } = useUser();
  const [formLogin, setFormLogin] = useState(false)
  const [emisor, setEmisor] = useState([])
  const [fields, setFields] = useState({ value: null })
  const [loading, setLoading] = useState(false)

  const router = useRouter();
  const usuario = useRef("")
  const password = useRef(null)

  const handleSubmit = async (e) => {
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
      }).then(() => {
        console.log("Entro a la funcion")
      })
      .catch((error) => {
        notifyError()
        console.error('Error:', error);
      })
      ;

  }

  useEffect(() => {
    fetch(`/api/emisor`)
      .then(response => response.json())
      .then(data => {
        const dataRenderTables = data.map((item) => {
          return {
            Codigo: item.Codigo,
            NombreEmisor: item.NombreEmisor,
            Ruc: item.Ruc,
          }
        });
        setEmisor(dataRenderTables)
      });
  }, [])

  useEffect(() => {
    if (user && user[0]?.OBSERVACION == "INGRESO EXITOSO" && fields?.value == user[0]?.Emisor) {
      console.log("Login Exitoso")
      setLoading(true)
      setFormLogin(false)
      router.push({ pathname: '/dashboard' }, '/dashboard');
      notifySucces()
    } else if (user && user[0]?.OBSERVACION == "CONTRASEÑA INVALIDA") {
      console.log("fallo")
      notifyError()
      console.log(user)
    }else if (user&& fields?.value != user[0]?.Emisor){
      notifyErrorEmisor()
    }
  }, [user])
  return (

    <main>
      <ToastContainer
        theme="dark"
      />
      <div className={loading ? 'divLoader' : 'ocultar'}>
        <div class="loader">
          <div class="loader-circle"></div>
          <span class="loader-text">Cargando...</span>
        </div>

      </div>

      <div className='Login'>

        <div className='flexContainer'>
          <div style={{ width: "50%" }}>
            <center>
              <Image src={logo} width={150} height={150} alt="Logo" />
            </center>
            <center>
              <h1>Sistema de Nomina</h1>
            </center>
            <center>
              <p>
                Bienvenido a nuestro sistema de nómina líder en Ecuador! <br />
                <br />
                Con nuestra solución integral, simplificarás el proceso de gestión de nóminas,
                permitiéndote ahorrar tiempo, dinero y recursos.  Con funciones intuitivas y
                una interfaz amigable, podrás generar fácilmente los roles de pago, controlar
                las horas trabajadas, administrar los permisos y gestionar las obligaciones
                tributarias sin complicaciones.
              </p>
            </center>


            <br />
            <center>
              <button className='butonLogin' onClick={() => setFormLogin(true)}>
                login
              </button>
            </center>
          </div>
          <br />
          <div className='SplineContainer' >
            <Spline scene="https://prod.spline.design/LCe0ngZAHvo103eo/scene.splinecode" />
          </div>
        </div>




        <div className={formLogin ? "Form" : "ocultar"}>
          <div className='content'>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h2>Login</h2>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <span>Ingrese el Usuario</span>
                  <input type="text" name="" pattern="\d{4}" maxlength="4" title="Por favor ingresa 4 dígitos numéricos" placeholder='Usuario' id="" ref={usuario} required />
                  <span>Ingrese la contraseña</span>
                  <input type="password" name="" placeholder='Contraseña' required ref={password} id="" />
                  <span>Seleccione el Emisor</span>

                  <select className='select' defaultValue="Seleccione" onChange={(e) => {
                    setFields({ ...fields, value: e.target.value })
                  }}>
                    <option value="Seleccione">Seleccione un emisor</option>
                    {emisor.map((item) => {
                      return (
                        <option
                          value={item.Codigo}>{item.NombreEmisor}</option>
                      )
                    })}
                  </select>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
                    <div>
                      <center>
                        <button className='butonLogin' >
                          Ingresar
                        </button>
                      </center>
                    </div>
                    <div>
                      <center>
                        <button className='botonActualizar' onClick={() => setFormLogin(false)} >
                          Cancelar
                        </button>
                      </center>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>


      </div>
    </main >
  )
}
