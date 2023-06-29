'use client'

import Image from 'next/image'

//Importar iconos
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { BsPersonFillAdd, BsPersonFillDash, BsPersonFillUp } from 'react-icons/bs'
import { useEffect, useState, useRef, useMemo } from 'react';

import { useUser } from '../controllers/useProvider';
import MaterialReactTable from 'material-react-table';
export default function Trabajador() {

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

    const [data, setData] = useState([])
    //State para mostrar el formulario de ingreso
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    //Referencias para los inputs
    const [fields, setFields] = useState({ value: null, valuePost: null, tipoTrabajdorPost: null, GeneroPost: null, categoriaPost: null, ocupacionPost: null, centroCosto: null, nivelSalarialPost: null, EstadoTrabajadorPost: null, TipoContrato: null, TipoCese: null, EstadoCivil: null, TipodeComision: null, EsReingreso: null, Tipo_Cuenta: null, decimoTercero: null, decimoCuarto: null, Fondo_Reserva: null, periodoVacaciones: null, FechaNacimiento: null, FechaIngreso: null, FechaCese: null, periodoVacaciones: null, fechaReingreso: null, Fecha_Ult_Actualizacion: null, EsReingreso: null, Tipo_Cuenta: null, decimoTercero: null, decimoCuarto: null, BoniComplementaria: null, BoniEspecial: null, RemuneracionMinima: null, FondoReserva: null, Mensaje: null })

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
        if (Codigo.current.value === "" || NombreCentroCostos.current.value === "" || Codigo.current.value === null || NombreCentroCostos.current.value === null) {
            alert("Ingrese todos los campos")
        }

        fetch(`/api/centroCostosPost?codigocentrocostos=${Codigo.current.value}&descripcioncentrocostos=${NombreCentroCostos.current.value}`)
            .then(response => response.json())
            .then(data => {
                setDataUpdate(data)
            });
    }
    //Funcion para Eliminar
    const handleDelete = (row) => {
        console.log(row)
        fetch(`/api/centroCostosDelete?codigocentrocostos=${row.original.Codigo}&descripcioncentrocostos=${row.original.NombreCentroCostos}`)
            .then(response => response.json())
            .then(data => {
                setDataUpdate(data)
            });
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
                setDataUpdate(data)
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
                accessorKey: 'actions',
                header: 'Actualizar',
                Cell: ({ row }) => (
                    <button onClick={() => handleRowSave(row)}><BsPersonFillUp /> Actualizar</button>
                ),
            }, {
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

    }, [fields.value])


    return (

        <main>
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
                            <span>Apellido Paterno</span>
                            <input type="text" ref={Apellido_Paterno} />
                        </div>
                        <div>
                            <span>Apellido Materno</span>
                            <input type="text" ref={Apellido_Materno} />
                        </div>
                        <div>
                            <span>Nombres</span>
                            <input type="text" ref={Nombres} />
                        </div>



                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center" }}>
                        <div>
                            <span>Identificación</span>
                            <input type="number" ref={Identificacion} />
                        </div>
                        <div>
                            <span>Entidad Bancaria</span>
                            <input type="text" ref={Entidad_Bancaria} />
                        </div>
                        <div>
                            <span>Carnet IESS</span>
                            <input type="text" ref={CarnetIESS} />
                        </div>
                        <div>
                            <span>Direccion</span>
                            <input type="text" ref={Direccion} />
                        </div>
                        <div>
                            <span>Telefono Fijo</span>
                            <input type="number" ref={Telefono_Fijo} />
                        </div>
                        <div>
                            <span>Telefono Movil</span>
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
                            <span>Numero de cuenta Bancaria</span>
                            <input type="number" ref={NumeroCuentaBancaria} />
                        </div>
                        <div>
                            <p> ocupación :</p>
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
                        <div>
                            <p> nivel Salarial:</p>
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

                        <div>
                            <p> estado del trabajador:</p>
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
                        <div>
                            <p> tipo de Contrato:</p>
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
                        <div>
                            <p> tipo de Cese:</p>
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
                        <div>
                            <p> estado Civil</p>
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
                        <div>
                            <p> tipo de Comisión</p>
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

                        <div>
                            <span>Fecha de Nacimiento</span>
                            <input type="date" ref={FechaNacimiento} />
                        </div>
                        <div>
                            <span>Fecha de Ingreso</span>
                            <input type="date" ref={FechaIngreso} />
                        </div>

                        <div>
                            <span>Fecha de Cese</span>
                            <input type="date" ref={FechaCese} />
                        </div>


                        <div>
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


                        <div>
                            <p> Decimo Cuarto:</p>
                            <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                setFields({ ...fields, decimoCuarto: e.target.value })
                            }}>
                                <option value="Seleccione">Seleccione</option>
                                <option value="0">Mensual</option>
                                <option value="1">Acumulada</option>

                            </select>
                        </div>
                        <div>
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
                        <div>
                            <span>Bonificación Complementaria</span>
                            <input type="date" ref={BoniComplementaria} />
                        </div>
                        <div>
                            <span>Bonificación Especial</span>
                            <input type="date" ref={BoniEspecial} />
                        </div>
                        <div>
                            <span>Remuneración Minima</span>
                            <input type="date" ref={RemuneracionMinima} />
                        </div>




                    </div>


                    <center>
                        <button type='submit' >
                            Ingresar un trabajador
                        </button>
                    </center>



                    <br />

                </div>

            </form>
            <div >
                <h2>Sucursal</h2>
                <form onSubmit={handleSubmit} >
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

                </form>
            </div>


            <div style={{ marginTop: "5%" }}>
                <h2>
                    Centros de Costos Registrados
                </h2>
                <MaterialReactTable columns={columns} data={data} enableRowActions />
            </div>


        </main >
    )
}
