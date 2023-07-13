'use client'

import Image from 'next/image'

//Importar iconos
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { BsPersonFillAdd, BsPersonFillDash, BsPersonFillUp } from 'react-icons/bs'
import { useEffect, useState, useRef, useMemo } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../controllers/useProvider';
import MaterialReactTable from 'material-react-table';
export default function Trabajador() {

    const notifyError = (message) => toast.error("Error del servidor vuelva a intentar");

    const { user, setUser } = useUser();
    const [emisor, setEmisor] = useState([])
    const [tipoTrabajdor, setTipoTrabajador] = useState([])
    const [CategoriaOcupacional, setCategoriaOcupacional] = useState([])
    const [centroCosto, setCentroCosto] = useState([])
    const [nivelSalarial, setNivelSalarial] = useState([])
    const [EstadoTrabajador, setEstadoTrabajador] = useState([])
    const [TipoContrato, setTipoContrato] = useState([])
    const [TipoCese, setTipoCese] = useState([])
    const [EstadoCivil, setEstadoCivil] = useState([])
    const [TipodeComision, setTipodeComision] = useState([])
    const [FondoReserva, setFondoReserva] = useState([])
    const [periodoVacaciones, setPeriodoVacaciones] = useState([])

    const [dataUpdate, setDataUpdate] = useState(false)

    const [data, setData] = useState([])
    //State para mostrar el formulario de ingreso
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    //Referencias para los inputs
    const [fields, setFields] = useState({ value: null, valuePost: null, tipoTrabajdorPost: null, GeneroPost: null, categoriaPost: null, ocupacionPost: null, centroCosto: null, nivelSalarialPost: null, EstadoTrabajadorPost: null, TipoContrato: null, TipoCese: null, EstadoCivil: null, TipodeComision: null, Tipo_Cuenta: null, decimoTercero: null, decimoCuarto: null, Fondo_Reserva: null, periodoVacaciones: null, periodoVacaciones: null, EsReingreso: null, Tipo_Cuenta: null, decimoTercero: null, decimoCuarto: null, BoniComplementaria: null, BoniEspecial: null, RemuneracionMinima: null, FondoReserva: null, Mensaje: null, EsReingresoPost: null })

    //Referencias para los inputs del Post Trabajador
    const Apellido_Paterno = useRef(null)
    const Apellido_Materno = useRef(null)
    const Nombres = useRef(null)
    const Identificacion = useRef(null)
    const Entidad_Bancaria = useRef(null)
    const CarnetIESS = useRef(null)
    const Direccion = useRef(null)
    const Telefono_Fijo = useRef(null)
    const Telefono_Movil = useRef(null)
    const NumeroCuentaBancaria = useRef(null)
    const FechaNacimiento = useRef(null)
    const FechaIngreso = useRef(null)
    const FechaCese = useRef(null)
    const FechaReingreso = useRef(null)
    const Fecha_Ult_Actualizacion = useRef(null)
    const BoniComplementaria = useRef(null)
    const BoniEspecial = useRef(null)
    const RemuneracionMinima = useRef(null)
    const Mensaje = useRef(null)




    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/api/trabajadorPost?COMP_Codigo=${fields.valuePost}&Tipo_trabajador=${fields.tipoTrabajdorPost}&Apellido_Paterno=${Apellido_Paterno.current.value}&Apellido_Materno=${Apellido_Materno.current.value}&Nombres=${Nombres.current.value}&Identificacion=${Identificacion.current.value}&Entidad_Bancaria=${Entidad_Bancaria.current.value}&CarnetIESS=${CarnetIESS.current.value}&Direccion=${Direccion.current.value}&Telefono_Fijo=${Telefono_Fijo.current.value}&Telefono_Movil=${Telefono_Movil.current.value}&Genero=${fields.GeneroPost}&Nro_Cuenta_Bancaria=${NumeroCuentaBancaria.current.value}&Codigo_Categoria_Ocupacion=${fields.categoriaPost}&Ocupacion=${fields.ocupacionPost}&Centro_Costos=${fields.centroCosto}&Nivel_Salarial=${fields.nivelSalarialPost}&EstadoTrabajador=${fields.EstadoTrabajadorPost}&Tipo_Contrato=${fields.TipoContrato}&Tipo_Cese=${fields.TipoCese}&EstadoCivil=${fields.EstadoCivil}&TipodeComision=${fields.TipodeComision}&FechaNacimiento=${FechaNacimiento.current.value}&FechaIngreso=${FechaIngreso.current.value}&FechaCese=${FechaCese.current.value}&PeriododeVacaciones=${fields.periodoVacaciones}&FechaReingreso=${FechaReingreso.current.value}&Fecha_Ult_Actualizacion=${Fecha_Ult_Actualizacion.current.value}&EsReingreso=${fields.EsReingresoPost}&Tipo_Cuenta=${fields.Tipo_Cuenta}&FormaCalculo13ro=${fields.decimoTercero}&FormaCalculo14ro=${fields.decimoCuarto}&BoniComplementaria=${BoniComplementaria.current.value}&BoniEspecial=${BoniEspecial.current.value}&Remuneracion_Minima=${RemuneracionMinima.current.value}&Fondo_Reserva=${fields.Fondo_Reserva}`)
            .then(() => setDataUpdate(!dataUpdate));

    }
    //Funcion para Eliminar
    const handleDelete = (row) => {
        console.log(row)
        fetch(`/api/trabajadorDelete?sucursal=${row.original.COMP_Codigo}&codigoempleado=${row.original.Id_Trabajador}`)
            .then(() => setDataUpdate(!dataUpdate));
    }
    //Funcion para Actualizar
    const handleRowSave = (row) => {
        console.log(row)
        setFields({
            Codigo: row.original.Codigo,
            DescripcionCodigoCosto: row.original.NombreCentroCostos,
        });
        setMostrarEditar(true);

    }


    const actualizarUsuario = async (event) => {
        event.preventDefault(); //Evita que se recargue la página
        fetch(`/api/centroCostosUpdate?codigocentrocostos=${fields.Codigo}&descripcioncentrocostos=${fields.DescripcionCodigoCosto}`)

            .then(response => response.json())
            .then(data => {
                setDataUpdate(dataUpdate)
            });
        setMostrarEditar(false)

    }


    const columns = useMemo(
        () => [
            {
                accessorKey: 'COMP_Codigo',
                header: 'COMP_Codigo',
            }, {
                accessorKey: 'Id_Trabajador',
                header: 'Id_Trabajador',
            }, {
                accessorKey: 'Tipo_trabajador',
                header: 'Tipo_trabajador',
            }, {
                accessorKey: 'Apellido_Paterno',
                header: 'Apellido_Paterno',
            }, {
                accessorKey: 'Apellido_Materno',
                header: 'Apellido_Materno',
            }, {
                accessorKey: 'Nombres',
                header: 'Nombres',
            }, {
                accessorKey: 'Identificacion',
                header: 'Identificacion',
            }, {
                accessorKey: 'Entidad_Bancaria',
                header: 'Entidad_Bancaria',
            }, {
                accessorKey: 'CarnetIESS',
                header: 'CarnetIESS',
            }, {
                accessorKey: 'Direccion',
                header: 'Direccion',
            }, {
                accessorKey: 'Telefono_Fijo',
                header: 'Telefono_Fijo',
            }, {
                accessorKey: 'Telefono_Movil',
                header: 'Telefono_Movil',
            }, {
                accessorKey: 'Genero',
                header: 'Genero',
            }, {
                accessorKey: 'Nro_Cuenta_Bancaria',
                header: 'Nro_Cuenta_Bancaria',
            }, {
                accessorKey: 'Codigo_Categoria_Ocupacion',
                header: 'Codigo_Categoria_Ocupacion',
            }, {
                accessorKey: 'Ocupacion',
                header: 'Ocupacion',
            }, {
                accessorKey: 'Centro_Costos',
                header: 'Centro_Costos',

            }, {
                accessorKey: 'Nivel_Salarial',
                header: 'Nivel_Salarial',
            }, {
                accessorKey: 'EstadoTrabajador',
                header: 'EstadoTrabajador',
            }, {
                accessorKey: 'Tipo_Contrato',
                header: 'Tipo_Contrato',
            }, {
                accessorKey: 'Tipo_Cese',
                header: 'Tipo_Cese',
            }, {
                accessorKey: 'EstadoCivil',
                header: 'EstadoCivil',
            }, {
                accessorKey: 'TipodeComision',
                header: 'TipodeComision',
            }, {
                accessorKey: 'FechaNacimiento',
                header: 'FechaNacimiento',
            }, {
                accessorKey: 'FechaIngreso',
                header: 'FechaIngreso',
            }, {
                accessorKey: 'Tipo_Cese',
                header: 'Tipo_Cese',
            }, {
                accessorKey: 'PeriododeVacaciones',
                header: 'PeriododeVacaciones',
            }, {
                accessorKey: 'FechaReingreso',
                header: 'FechaReingreso',
            }, {
                accessorKey: 'Fecha_Ult_Actualizacion',
                header: 'Fecha_Ult_Actualizacion',
            }, {
                accessorKey: 'EsReingreso',
                header: 'EsReingreso',
            }, {
                accessorKey: 'BancoCTA_CTE',
                header: 'BancoCTA_CTE',
            }, {
                accessorKey: 'Tipo_Cuenta',
                header: 'Tipo_Cuenta',
            }, {
                accessorKey: 'RSV_Indem_Acumul',
                header: 'RSV_Indem_Acumul',
            }, {
                accessorKey: 'Año_Ult_Rsva_Indemni',
                header: 'Año_Ult_Rsva_Indemni',
            }, {
                accessorKey: 'Mes_Ult_Rsva_Indemni',
                header: 'Mes_Ult_Rsva_Indemni',
            }, {
                accessorKey: 'FormaCalculo13ro',
                header: 'FormaCalculo13ro',
            }, {
                accessorKey: 'FormaCalculo14ro',
                header: 'FormaCalculo14ro',
            }, {
                accessorKey: 'BoniComplementaria',
                header: 'BoniComplementaria',
            }, {
                accessorKey: 'BoniEspecial',
                header: 'BoniEspecial',
            }, {
                accessorKey: 'Remuneracion_Minima',
                header: 'Remuneracion_Minima',
            }, {
                accessorKey: 'CuotaCuentaCorriente',
                header: 'CuotaCuentaCorriente',
            }, {
                accessorKey: 'Fondo_Reserva',
                header: 'Fondo_Reserva',
            }, {
                accessorKey: 'Mensaje',
                header: 'Mensaje',
            },
            {
                accessorKey: 'actions2',
                header: 'Eliminar',
                Cell: ({ row }) => (
                    <button className='botonEliminar' onClick={() => handleDelete(row)}><BsPersonFillDash size={15} /> Eliminar</button>
                ),
            }
        ],
        [],
    );


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
                console.log(dataRenderTables)
            });

        fetch(`/api/tipoTrabajador`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        Descripcion: item.Descripcion,
                    }
                });
                setTipoTrabajador(dataRenderTables)
                console.log(dataRenderTables)
            });

        fetch(`/api/categoriaOcupacional`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        Descripcion: item.Descripcion,
                    }
                });
                setCategoriaOcupacional(dataRenderTables)
            });

        fetch(`/api/centroCostos`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        NombreCentroCostos: item.NombreCentroCostos,
                        Mensaje: item.Mensaje,
                    }
                });
                setCentroCosto(dataRenderTables)
            });
        fetch(`/api/nivelSalarial`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        Descripcion: item.Descripcion,
                    }
                });
                setNivelSalarial(dataRenderTables)
            });
        fetch(`/api/estadoTrabajador`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        Descripcion: item.Descripcion,
                    }
                });
                setEstadoTrabajador(dataRenderTables)
            });
        fetch(`/api/tipoContrato`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        Descripcion: item.Descripcion,
                    }
                });
                setTipoContrato(dataRenderTables)
            });
        fetch(`/api/tipoCese`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        Descripcion: item.Descripcion,
                    }
                });
                setTipoCese(dataRenderTables)
            });

        fetch(`/api/estadoCivil`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        Descripcion: item.Descripcion,
                    }
                });
                setEstadoCivil(dataRenderTables)
            });

        fetch(`/api/tipoComision`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        Descripcion: item.Descripcion,
                    }
                });
                setTipodeComision(dataRenderTables)
            });

        fetch(`/api/fondoReserva`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        Descripcion: item.Descripcion,
                    }
                });
                setFondoReserva(dataRenderTables)
            });
        fetch(`/api/periodoVacaciones`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        Codigo: item.Codigo,
                        Descripcion: item.Descripcion,
                    }
                });
                setPeriodoVacaciones(dataRenderTables)
            });




    }, [])

    useEffect(() => {

        fetch(`/api/trabajador?sucursal=${fields.value}`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        COMP_Codigo: item.COMP_Codigo,
                        Id_Trabajador: item.Id_Trabajador,
                        Tipo_trabajador: item.Tipo_trabajador,
                        Apellido_Paterno: item.Apellido_Paterno,
                        Apellido_Materno: item.Apellido_Materno,
                        Nombres: item.Nombres,
                        Identificacion: item.Identificacion,
                        Entidad_Bancaria: item.Entidad_Bancaria,
                        CarnetIESS: item.CarnetIESS,
                        Direccion: item.Direccion,
                        Telefono_Fijo: item.Telefono_Fijo,
                        Telefono_Movil: item.Telefono_Movil,
                        Genero: item.Genero,
                        Nro_Cuenta_Bancaria: item.Nro_Cuenta_Bancaria,
                        Codigo_Categoria_Ocupacion: item.Codigo_Categoria_Ocupacion,
                        Ocupacion: item.Ocupacion,
                        Centro_Costos: item.Centro_Costos,
                        Nivel_Salarial: item.Nivel_Salarial,
                        EstadoTrabajador: item.EstadoTrabajador,
                        Tipo_Contrato: item.Tipo_Contrato,
                        Tipo_Cese: item.Tipo_Cese,
                        EstadoCivil: item.EstadoCivil,
                        TipodeComision: item.TipodeComision,
                        FechaNacimiento: item.FechaNacimiento,
                        FechaIngreso: item.FechaIngreso,
                        FechaCese: item.FechaCese,
                        PeriododeVacaciones: item.PeriododeVacaciones,
                        FechaReingreso: item.FechaReingreso,
                        Fecha_Ult_Actualizacion: item.Fecha_Ult_Actualizacion,
                        EsReingreso: item.EsReingreso,
                        BancoCTA_CTE: item.BancoCTA_CTE,
                        Tipo_Cuenta: item.Tipo_Cuenta,
                        RSV_Indem_Acumul: item.RSV_Indem_Acumul,
                        Año_Ult_Rsva_Indemni: item.Año_Ult_Rsva_Indemni,
                        Mes_Ult_Rsva_Indemni: item.Mes_Ult_Rsva_Indemni,
                        FormaCalculo13ro: item.FormaCalculo13ro,
                        FormaCalculo14ro: item.FormaCalculo14ro,
                        BoniComplementaria: item.BoniComplementaria,
                        BoniEspecial: item.BoniEspecial,
                        Remuneracion_Minima: item.Remuneracion_Minima,
                        CuotaCuentaCorriente: item.CuotaCuentaCorriente,
                        Fondo_Reserva: item.Fondo_Reserva,
                        Mensaje: item.Mensaje,
                    }
                });
                setData(dataRenderTables)
                console.log(dataRenderTables)
            });

    }, [fields.value, dataUpdate])



    return (

        <main>
            <ToastContainer
                theme="dark"
            />
            <div style={{ display: "flex", alignItems: "center" }}>
                <h3>Crear un nuevo Trabajador</h3>
                <a style={{ cursor: "pointer" }} onClick={() => setMostrarFormulario(!mostrarFormulario)} >  <AiOutlineAppstoreAdd color='#06B6E0' size={29} /></a>
            </div>
            <form className={mostrarFormulario ? "mostrarForm" : "ocultarForm"} onSubmit={handleSubmit} style={{ marginBottom: "50px" }}  >
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <p>Sucursal:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, valuePost: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione un emisor</option>
                                {emisor.map((item) => {
                                    return (
                                        <option
                                            value={item.Codigo}>{item.NombreEmisor}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <p>Tipo de Trabajador :</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, tipoTrabajdorPost: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione el tipo</option>
                                {tipoTrabajdor.map((item) => {
                                    return (
                                        <option
                                            value={item.Descripcion}>{item.Codigo}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <p>Apellido Paterno</p>
                            <input type="text" ref={Apellido_Paterno} />
                        </div>
                        <div>
                            <p>Apellido Materno</p>
                            <input type="text" ref={Apellido_Materno} />
                        </div>
                        <div>
                            <p>Nombres</p>
                            <input type="text" ref={Nombres} />
                        </div>



                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center" }}>
                        <div>
                            <p>Identificación</p>
                            <input type="number" ref={Identificacion} />
                        </div>
                        <div>
                            <p>Entidad Bancaria</p>
                            <input type="text" ref={Entidad_Bancaria} />
                        </div>
                        <div>
                            <p>Carnet IESS</p>
                            <input type="text" ref={CarnetIESS} />
                        </div>
                        <div>
                            <p>Direccion</p>
                            <input type="text" ref={Direccion} />
                        </div>
                        <div>
                            <p>Telefono Fijo</p>
                            <input type="number" ref={Telefono_Fijo} />
                        </div>
                        <div>
                            <p>Telefono Movil</p>
                            <input type="number" ref={Telefono_Movil} />
                        </div>



                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginTop: "20px" }}>
                        <div>
                            <p> Género :</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, GeneroPost: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione el género</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>

                            </select>
                        </div>
                        <div>
                            <p>Numero de cuenta Bancaria</p>
                            <input type="number" ref={NumeroCuentaBancaria} />
                        </div>
                        <div>
                            <p> Ocupación :</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, ocupacionPost: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione el género</option>
                                <option value="1">Ocupación 1</option>
                                <option value="2">Ocupación 2</option>

                            </select>
                        </div>
                        <div>
                            <p> Categoría Ocupacional :</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, categoriaPost: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione la ocupación</option>
                                {CategoriaOcupacional.map((item) => {
                                    return (
                                        <option
                                            value={item.Codigo}>{item.Descripcion}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <p> centro de costos:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, centroCosto: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione el Centro de Costos</option>
                                {centroCosto.map((item) => {
                                    return (
                                        <option
                                            value={item.Codigo}>{item.NombreCentroCostos}</option>
                                    )
                                })}
                            </select>
                        </div>



                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginTop: "20px" }}>
                        <div style={{ width: "100%" }}>
                            <p> Nivel Salarial:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, nivelSalarialPost: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione el nivel Salarial</option>
                                {nivelSalarial.map((item) => {
                                    return (
                                        <option
                                            value={item.Codigo}>{item.Descripcion}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div style={{ width: "100%" }}>
                            <p> Estado del trabajador:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, EstadoTrabajadorPost: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione el estado del Trabajador</option>
                                {EstadoTrabajador.map((item) => {
                                    return (
                                        <option
                                            value={item.Codigo}>{item.Descripcion}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div style={{ width: "100%" }}>
                            <p> Tipo de Contrato:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, TipoContrato: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione </option>
                                {TipoContrato.map((item) => {
                                    return (
                                        <option
                                            value={item.Descripcion}>{item.Codigo}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div style={{ width: "100%" }}>
                            <p> Tipo de Cese:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, TipoCese: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione </option>
                                {TipoCese.map((item) => {
                                    return (
                                        <option
                                            value={item.Descripcion}>{item.Codigo}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div style={{ width: "100%" }}>
                            <p> Estado Civil</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, EstadoCivil: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione </option>
                                {EstadoCivil.map((item) => {
                                    return (
                                        <option
                                            value={item.Descripcion}>{item.Codigo}</option>
                                    )
                                })}
                            </select>
                        </div>


                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginTop: "20px" }}>
                        <div style={{ width: "100%" }}>
                            <p> Tipo de Comisión</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, TipodeComision: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione </option>
                                {TipodeComision.map((item) => {
                                    return (
                                        <option
                                            value={item.Descripcion}>{item.Codigo}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div style={{ width: "100%" }}>
                            <p>Fecha de Nacimiento</p>
                            <input type="date" ref={FechaNacimiento} />
                        </div>
                        <div style={{ width: "100%" }}>
                            <p>Fecha de Ingreso</p>
                            <input type="date" ref={FechaIngreso} />
                        </div>

                        <div style={{ width: "100%" }}>
                            <p>Fecha de Cese</p>
                            <input type="date" ref={FechaCese} />
                        </div>


                        <div style={{ width: "100%" }}>
                            <p> Periodo de Vacaciones:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, periodoVacaciones: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione </option>
                                {periodoVacaciones.map((item) => {
                                    return (
                                        <option
                                            value={item.Codigo}>{item.Descripcion}</option>
                                    )
                                })}

                            </select>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginTop: "20px" }}>
                        <div style={{ width: "100%" }}>
                            <p>Fecha de Reingreso</p>
                            <input type="date" ref={FechaReingreso} />
                        </div>
                        <div style={{ width: "100%" }}>
                            <p>Fecha de ultima actualización</p>
                            <input type="date" ref={Fecha_Ult_Actualizacion} />
                        </div>

                        <div style={{ width: "100%" }}>
                            <p> Es Reingreso :</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, EsReingresoPost: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione el género</option>
                                <option value="0">Si</option>
                                <option value="1">No</option>

                            </select>
                        </div>

                        <div style={{ width: "100%" }}>
                            <p> Tipo de Cuenta :</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, EsReingresoPost: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione el género</option>
                                <option value="2">Corriente</option>
                                <option value="1">Ahorros</option>

                            </select>
                        </div>

                        <div style={{ width: "100%" }}>

                            <p> Décimo Tercero:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, decimoCuarto: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione</option>
                                <option value="0">Mensual</option>
                                <option value="1">Acumulada</option>

                            </select>
                        </div>



                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginTop: "20px" }}>


                        <div style={{ width: "100%" }}>

                            <p> Décimo Cuarto:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, decimoCuarto: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione</option>
                                <option value="0">Mensual</option>
                                <option value="1">Acumulada</option>

                            </select>
                        </div>



                        <div style={{ width: "100%" }}>
                            <p> Bonificación Complementaria:</p>

                            <input type="text" ref={BoniComplementaria} />
                        </div>
                        <div style={{ width: "100%" }}>
                            <p>Bonificación Especial</p>
                            <input type="text" ref={BoniEspecial} />
                        </div>
                        <div style={{ width: "100%" }}>
                            <p>Remuneración Minima</p>
                            <input type="text" ref={RemuneracionMinima} />
                        </div>
                        <div style={{ width: "100%" }}>
                            <p> fondo de Reserva:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, Fondo_Reserva: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione </option>
                                {FondoReserva.map((item) => {
                                    return (
                                        <option
                                            value={item.Codigo}>{item.Descripcion}</option>
                                    )
                                })}

                            </select>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginTop: "20px" }}>




                    </div>


                    <center>
                        <button className='botonActualizar' type='submit' >
                            Ingresar un trabajador
                        </button>
                    </center>



                    <br />

                </div>

            </form>
            <div >
                <h2>Sucursal</h2>
                <form onSubmit={handleSubmit} >
                    <p>Seleccione el Emisor</p>

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

                </form>
            </div>


            <div style={{ marginTop: "5%" }}>
                <h2>
                    Centros de Costos Registrados
                </h2>
                <MaterialReactTable columns={columns} data={data} enableRowActions={false} />
            </div>


        </main >
    )
}
