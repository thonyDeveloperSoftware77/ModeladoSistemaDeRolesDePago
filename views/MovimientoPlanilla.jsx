'use client'

import Image from 'next/image'

//Importar iconos
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

import { BsPersonFillAdd, BsPersonFillDash, BsPersonFillUp } from 'react-icons/bs'
import { useEffect, useState, useRef, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MovimientoPlanilla() {

    const notifySucces = () => toast("Agregado con exito!");
    const notifyUpdate = () => toast("Actualizado con exito!");
    const notifyDelete = () => toast("Eliminado con exito!");
    const notifyError = (message) => toast.error("Error, vuelva a intentar");


    //State para guardar los datos de la tabla
    const [data, setData] = useState([])
    const [dataUpdate, setDataUpdate] = useState([])
    const [tipoOperacion, setTipoOperacion] = useState([])
    const [movimientoExcepcion1, setMovimientoExcepcion1] = useState([])
    const [movimientoExcepcion3, setMovimientoExcepcion3] = useState([])
    const NombrePlanilla = useRef(null)
    const Prioridad = useRef(null)
    const cuenta1 = useRef(null)
    const cuenta2 = useRef(null)
    const cuenta3 = useRef(null)
    const cuenta4 = useRef(null)

    

    //State para mostrar el formulario de ingreso
    const [mostrarFormulario, setMostrarFormulario] = useState(false)


    //Use state para mostrar el modal de editar
    const [mostrarEditar, setMostrarEditar] = useState(false)
    //Referencias para los inputs
    const [fields, setFields] = useState({
        tipoOperacion: null,
        MovimientoExcepcion1: null,
        MovimientoExcepcion2: null,
        MovimientoExcepcion3: null,
        MovimientoExcepcion4: null,
        TrabajadorAplicaIess: null,
        TrabajadorProyectoImpuestoRenta: null,
        AplicaProyecRenta: null,
        TrabaAfectaIess: null,
    });
    const [fields2, setFields2] = useState({
        CodigoConcepto: null,
        NombrePlanilla: null,
        Prioridad: null,
        Cuenta1: null,
        Cuenta2: null,
        Cuenta3: null,
        Cuenta4: null,
        tipoOperacion: null,
        MovimientoExcepcion1: null,
        MovimientoExcepcion2: null,
        MovimientoExcepcion3: null,
        MovimientoExcepcion4: null,
        TrabajadorAplicaIess: null,
        TrabajadorProyectoImpuestoRenta: null,
        AplicaProyecRenta: null,
        TrabaAfectaIess: null,
    });



    const handleSubmit = (e) => {
        e.preventDefault()
        if (NombrePlanilla.current.value === "" || Prioridad.current.value === "" || NombrePlanilla.current.value === null || Prioridad.current.value === null || cuenta1.current.value === "" || cuenta2.current.value === "" || cuenta3.current.value === "" || cuenta4.current.value === "" || cuenta1.current.value === null || cuenta2.current.value === null || cuenta3.current.value === null || cuenta4.current.value === null) {
            alert("Ingrese todos los campos")
        }
        fetch(`/api/movimientoPlanillaPost?conceptos=${NombrePlanilla.current.value}&prioridad=${Prioridad.current.value}&tipooperacion=${fields.tipoOperacion}&cuenta1=${cuenta1.current.value}&cuenta2=${cuenta2.current.value}&cuenta3=${cuenta3.current.value}&cuenta4=${cuenta4.current.value}&MovimientoExcepcion1=${fields.MovimientoExcepcion1}&MovimientoExcepcion2=${fields.MovimientoExcepcion2}&MovimientoExcepcion3=${fields.MovimientoExcepcion3}&Traba_Aplica_iess=${fields.TrabajadorAplicaIess}&Traba_Proyecto_imp_renta=${fields.TrabajadorProyectoImpuestoRenta}&Aplica_Proy_Renta=${fields.AplicaProyecRenta}&Empresa_Afecta_Iess=${fields.TrabaAfectaIess} `)
            .then(response => response.json())
            .then(data => {
                setDataUpdate(data)
                notifySucces()
            }).catch(err => {
                notifyError()
            });
    }



    //Funcion para Eliminar
    const handleDelete = (row) => {
        console.log(row)
        fetch(`/api/centroCostosDelete?codigocentrocostos=${row.original.Codigo}&descripcioncentrocostos=${row.original.NombreCentroCostos}`)
            .then(response => response.json())
            .then(data => {
                setDataUpdate(data)
                notifyError()

            }).catch(err => {
                notifyError()
            });
    }
    //Funcion para Actualizar
    const handleRowSave = (row) => {
        setFields2({
            CodigoConcepto: row.original.CodigoConcepto,
            NombrePlanilla: row.original.Concepto,
            Prioridad: row.original.Prioridad,
            Cuenta1: row.original.Cuenta1,
            Cuenta2: row.original.Cuenta2,
            Cuenta3: row.original.Cuenta3,
            Cuenta4: row.original.Cuenta4,
            tipoOperacion: row.original.TipoOperacion,
            MovimientoExcepcion1: row.original.MovimientoExcepcion1,
            MovimientoExcepcion2: row.original.MovimientoExcepcion2,
            MovimientoExcepcion3: row.original.MovimientoExcepcion3,
            MovimientoExcepcion4: row.original.MovimientoExcepcion4,
            TrabajadorAplicaIess: row.original.Aplica_iess,
            TrabajadorProyectoImpuestoRenta: row.original.Proyecto_imp_renta,
            AplicaProyecRenta: row.original.Aplica_Proy_Renta,
            TrabaAfectaIess: row.original.Afecta_Iess,
        });
        setMostrarEditar(true);

    }


    const actualizarUsuario = async (event) => {
        event.preventDefault(); //Evita que se recargue la página
        fetch(`/api/movimientoPlanillaUpdate?codigoplanilla=${fields2.CodigoConcepto}&conceptos=${fields2.NombrePlanilla}&prioridad=${fields2.Prioridad}&tipooperacion=${fields2.tipoOperacion}&cuenta1=${fields2.Cuenta1}&cuenta2=${fields2.Cuenta2}&cuenta3=${fields2.Cuenta3}&cuenta4=${fields2.Cuenta4}&MovimientoExcepcion1=${fields2.MovimientoExcepcion1}&MovimientoExcepcion2=${fields2.MovimientoExcepcion2}&MovimientoExcepcion3=${fields2.MovimientoExcepcion3}&Traba_Aplica_iess=${fields2.TrabajadorAplicaIess}&Traba_Proyecto_imp_renta=${fields2.TrabajadorProyectoImpuestoRenta}&Aplica_Proy_Renta=${fields2.AplicaProyecRenta}&Empresa_Afecta_Iess=${fields2.TrabaAfectaIess}`)

            .then(response => response.json())
            .then(data => {
                setDataUpdate(data)
                notifyUpdate()
            }).catch(error => {
                console.log(error)
                notifyError()
            })
            ;
        setMostrarEditar(false)

    }


    const columns = useMemo(
        () => [
            {
                accessorKey: 'CodigoConcepto',
                header: 'Codigo Concepto',
            },

            {
                accessorKey: 'Concepto',
                header: 'Concepto',
            },
            {
                accessorKey: 'Prioridad',
                header: 'Prioridad',
            },
            {
                accessorKey: 'TipoOperacion',
                header: 'Tipo Operacion',
            },
            {
                accessorKey: 'Cuenta1',
                header: 'Cuenta 1',
            }, {
                accessorKey: 'Cuenta2',
                header: 'Cuenta 2',
            }, {
                accessorKey: 'Cuenta3',
                header: 'Cuenta 3',
            }, {
                accessorKey: 'Cuenta4',
                header: 'Cuenta 4',
            }, {
                accessorKey: 'MovimientoExcepcion1',
                header: 'Movimiento Excepcion 1',
            }, {
                accessorKey: 'MovimientoExcepcion2',
                header: 'Movimiento Excepcion 2',
            }, {
                accessorKey: 'MovimientoExcepcion3',
                header: 'Movimiento Excepcion 3',
            }, {
                accessorKey: 'Aplica_iess',
                header: 'Aplica Iess',
            }, {
                accessorKey: 'Aplica_imp_renta',
                header: 'Aplica Imp Renta',
            }, {
                accessorKey: 'Empresa_Afecta_Iess',
                header: 'Empresa Afecta Iess',
            }, {
                accessorKey: 'Mensaje',
                header: 'Mensaje',
            },
            {
                accessorKey: 'actions',
                header: 'Actualizar',
                Cell: ({ row }) => (
                    <button className='botonActualizar' onClick={() => handleRowSave(row)}><BsPersonFillUp /> Actualizar</button>
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
        // if (user) {

        fetch(`/api/tipoOperacion`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        CodigoTipoOperacion: item.CodigoTipooperacion,
                        NombreOperacion: item.NombreOperacion,
                    }
                });
                setTipoOperacion(dataRenderTables)
                console.log(dataRenderTables)
            });

        fetch(`/api/MovimientoExcepcion1_2`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        CodigoMovimientoExce: item.CodigoMovimientoExce,
                        DesripMovimientoExce: item.DesripMovimientoExce,
                    }
                });
                setMovimientoExcepcion1(dataRenderTables)
            });

        fetch(`/api/MovimientoExcepcion3`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        CodigoMovimientoExce: item.CodigoMovimientoExce,
                        DesripMovimientoExce: item.DesripMovimientoExce,
                    }
                });
                setMovimientoExcepcion3(dataRenderTables)
            });




        fetch(`/api/movimientoPlanilla`)
            .then(response => response.json())
            .then(data => {
                const dataRenderTables = data.map((item) => {
                    return {
                        CodigoConcepto: item.CodigoConcepto,
                        Concepto: item.Concepto,
                        Prioridad: item.Prioridad,
                        TipoOperacion: item.TipoOperacion,
                        Cuenta1: item.Cuenta1,
                        Cuenta2: item.Cuenta2,
                        Cuenta3: item.Cuenta3,
                        Cuenta4: item.Cuenta4,
                        MovimientoExcepcion1: item.MovimientoExcepcion1,
                        MovimientoExcepcion2: item.MovimientoExcepcion2,
                        MovimientoExcepcion3: item.MovimientoExcepcion3,
                        Aplica_iess: item.Aplica_iess,
                        Aplica_imp_renta: item.Aplica_imp_renta,
                        Empresa_Afecta_Iess: item.Empresa_Afecta_Iess,
                        Mensaje: item.Mensaje,
                    }
                });
                setData(dataRenderTables)
            });
        //  } else {
        //    router.push({ pathname: '/' }, '/');
        //}
    }, [dataUpdate])


    return (

        <main>
            <ToastContainer
                theme="dark"
            />

            <div style={{ marginTop: "-25px" }}>
                <h1>
                    Movimiento PLanilla
                </h1>
            </div>
            <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h3>Crear un nuevo Movimiento de planilla</h3>
                    <a style={{ cursor: "pointer" }} onClick={() => setMostrarFormulario(!mostrarFormulario)} >  <AiOutlineAppstoreAdd color='#06B6E0' size={29} /></a>
                </div>
                <form className={mostrarFormulario ? "mostrarForm" : "ocultarForm"} onSubmit={handleSubmit} style={{ marginBottom: "50px" }}  >
                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                            <div>
                                <span>Nombre del Concepto</span>
                                <input type="text" ref={NombrePlanilla} />
                            </div>

                            <div>
                                <span>Prioridad</span>
                                <input type="number" ref={Prioridad} />
                            </div>

                            <div>
                                <p>Tipo de Operación</p>
                                <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                    setFields({ ...fields, tipoOperacion: e.target.value })
                                }}>
                                    <option value="Seleccione">Seleccione un emisor</option>
                                    {tipoOperacion.map((item) => {
                                        return (
                                            <option
                                                value={item.NombreOperacion}>{item.CodigoTipoOperacion}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <p>Movimiento Excepción 1 :</p>
                                <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                    setFields({ ...fields, MovimientoExcepcion1: e.target.value })
                                }}>
                                    <option value="Seleccione">Seleccione </option>
                                    {movimientoExcepcion1.map((item) => {
                                        return (
                                            <option
                                                value={item.DesripMovimientoExce}>{item.CodigoMovimientoExce}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <p>Movimiento Excepción 2 :</p>
                                <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                    setFields({ ...fields, MovimientoExcepcion2: e.target.value })
                                }}>
                                    <option value="Seleccione">Seleccione </option>
                                    {movimientoExcepcion1.map((item) => {
                                        return (
                                            <option
                                                value={item.DesripMovimientoExce}>{item.CodigoMovimientoExce}</option>
                                        )
                                    })}
                                </select>
                            </div>


                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>

                            <div>
                                <p>Movimiento Excepción 3 :</p>
                                <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                    setFields({ ...fields, MovimientoExcepcion3: e.target.value })
                                }}>
                                    <option value="Seleccione">Seleccione </option>
                                    {movimientoExcepcion3.map((item) => {
                                        return (
                                            <option
                                                value={item.DesripMovimientoExce}>{item.CodigoMovimientoExce}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <span>Cuenta 1</span>
                                <input type="number" ref={cuenta1} />
                            </div>
                            <div>
                                <span>Cuenta 2</span>
                                <input type="number" ref={cuenta2} />
                            </div>
                            <div>
                                <span>Cuenta 3</span>
                                <input type="number" ref={cuenta3} />
                            </div>
                            <div>
                                <span>Cuenta 4</span>
                                <input type="number" ref={cuenta4} />
                            </div>


                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>

                            <div>
                                <p>Trabajador Aplica al IESS :</p>
                                <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                    setFields({ ...fields, TrabajadorAplicaIess: e.target.value })
                                }}>
                                    <option value="Seleccione">Seleccione </option>
                                    <option value="0">No</option>
                                    <option value="1">Si</option>

                                </select>
                            </div>
                            <div>
                                <p>Trabajador Proyecto Impuesto a la Renta :</p>
                                <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                    setFields({ ...fields, TrabajadorProyectoImpuestoRenta: e.target.value })
                                }}>
                                    <option value="Seleccione">Seleccione </option>
                                    <option value="0">No</option>
                                    <option value="1">Si</option>

                                </select>
                            </div>
                            <div>
                                <p>Aplica Proyecto Renta:</p>
                                <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                    setFields({ ...fields, AplicaProyecRenta: e.target.value })
                                }}>
                                    <option value="Seleccione">Seleccione </option>
                                    <option value="0">No</option>
                                    <option value="1">Si</option>

                                </select>
                            </div>
                            <div>
                                <p>Trabajador Afecta Impuesto Renta :</p>
                                <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                    setFields({ ...fields, TrabaAfectaIess: e.target.value })
                                }}>
                                    <option value="Seleccione">Seleccione </option>
                                    <option value="0">No Aplica</option>
                                    <option value="1">Aplica</option>

                                </select>
                            </div>


                        </div>
                        <center>
                            <button className='botonAgregar' type="submit"> Agregar</button>

                        </center>
                    </div>


                </form>
            </div>


            <div style={{ marginTop: "5%" }}>
                <h2>
                    Registros
                </h2>
                <MaterialReactTable columns={columns} data={data} enableRowActions={false} />
            </div>

            <div>
                <form className={mostrarEditar ? 'mostrarModal' : 'ocultarModal'} onSubmit={actualizarUsuario}>
                    <div className='formEditar'>
                        <h2>Editar Movimiento de Planilla</h2>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>


                                <div className="input-wrapper">
                                    <span>Nombre del Concepto</span>
                                    <input type="text" placeholder="Nombre" defaultValue={fields2.NombrePlanilla} onChange={(e) => setFields2({ ...fields2, NombrePlanilla: e.target.value })} required />
                                </div>

                                <div className="input-wrapper">
                                    <span>Prioridad</span>
                                    <input type="number" placeholder="Prioridad" defaultValue={fields2.Prioridad} onChange={(e) => setFields2({ ...fields2, Prioridad: e.target.value })} required />
                                </div>

                                <div>
                                    <p>Tipo de Operación</p>
                                    <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                        setFields2({ ...fields2, tipoOperacion: e.target.value })
                                    }}>
                                        <option value="Seleccione">Seleccione un emisor</option>
                                        {tipoOperacion.map((item) => {
                                            return (
                                                <option
                                                    value={item.NombreOperacion}>{item.CodigoTipoOperacion}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <p>Movimiento Excepción 1 :</p>
                                    <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                        setFields2({ ...fields2, MovimientoExcepcion1: e.target.value })
                                    }}>
                                        <option value="Seleccione">Seleccione </option>
                                        {movimientoExcepcion1.map((item) => {
                                            return (
                                                <option
                                                    value={item.DesripMovimientoExce}>{item.CodigoMovimientoExce}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <p>Movimiento Excepción 2 :</p>
                                    <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                        setFields2({ ...fields2, MovimientoExcepcion2: e.target.value })
                                    }}>
                                        <option value="Seleccione">Seleccione </option>
                                        {movimientoExcepcion1.map((item) => {
                                            return (
                                                <option
                                                    value={item.DesripMovimientoExce}>{item.CodigoMovimientoExce}</option>
                                            )
                                        })}
                                    </select>
                                </div>



                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>

                                <div>
                                    <p>Movimiento Excepción 3 :</p>
                                    <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                        setFields2({ ...fields2, MovimientoExcepcion3: e.target.value })
                                    }}>
                                        <option value="Seleccione">Seleccione </option>
                                        {movimientoExcepcion3.map((item) => {
                                            return (
                                                <option
                                                    value={item.DesripMovimientoExce}>{item.CodigoMovimientoExce}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="input-wrapper">
                                    <span>Cuenta 1</span>
                                    <input type="text" placeholder="Nombre" defaultValue={fields2.Cuenta1} onChange={(e) => setFields2({ ...fields2, Cuenta1: e.target.value })} required />
                                </div>
                                <div className="input-wrapper">
                                    <span>Cuenta 2</span>
                                    <input type="text" placeholder="Nombre" defaultValue={fields2.Cuenta2} onChange={(e) => setFields2({ ...fields2, Cuenta2: e.target.value })} required />
                                </div>
                                <div className="input-wrapper">
                                    <span>Cuenta 3</span>
                                    <input type="text" placeholder="Nombre" defaultValue={fields2.Cuenta3} onChange={(e) => setFields2({ ...fields2, Cuenta3: e.target.value })} required />
                                </div>
                                <div className="input-wrapper">
                                    <span>Cuenta 4</span>
                                    <input type="text" placeholder="Nombre" defaultValue={fields2.Cuenta4} onChange={(e) => setFields2({ ...fields2, Cuenta4: e.target.value })} required />
                                </div>


                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>

                                <div>
                                    <p>Trabajador Aplica al IESS :</p>
                                    <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                        setFields2({ ...fields2, TrabajadorAplicaIess: e.target.value })
                                    }}>
                                        <option value="Seleccione">Seleccione </option>
                                        <option value="0">No</option>
                                        <option value="1">Si</option>

                                    </select>
                                </div>
                                <div>
                                    <p>Trabajador Proyecto Impuesto a la Renta :</p>
                                    <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                        setFields2({ ...fields2, TrabajadorProyectoImpuestoRenta: e.target.value })
                                    }}>
                                        <option value="Seleccione">Seleccione </option>
                                        <option value="0">No</option>
                                        <option value="1">Si</option>

                                    </select>
                                </div>
                                <div>
                                    <p>Aplica Proyecto Renta:</p>
                                    <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                        setFields2({ ...fields2, AplicaProyecRenta: e.target.value })
                                    }}>
                                        <option value="Seleccione">Seleccione </option>
                                        <option value="0">No</option>
                                        <option value="1">Si</option>

                                    </select>
                                </div>
                                <div>
                                    <p>Trabajador Afecta Impuesto Renta :</p>
                                    <select className='select' defaultValue="Seleccione" onChange={(e) => {
                                        setFields2({ ...fields2, TrabaAfectaIess: e.target.value })
                                    }}>
                                        <option value="Seleccione">Seleccione </option>
                                        <option value="0">No Aplica</option>
                                        <option value="1">Aplica</option>

                                    </select>
                                </div>


                            </div>

                        </div>

                        <div style={{ display: "flex", width: "40%", justifyContent: "space-around" }}>
                            <button className='botonActualizar' type="submit">Actualizar</button>
                            <button className='botonEliminar' type="button" onClick={() => setMostrarEditar(false)}>Cancelar</button>
                        </div>

                    </div>

                </form>
            </div >
        </main >
    )
}
