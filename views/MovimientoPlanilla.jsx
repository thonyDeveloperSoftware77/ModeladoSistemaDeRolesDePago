'use client'

import Image from 'next/image'

//Importar iconos
import { BsPersonFillAdd, BsPersonFillDash, BsPersonFillUp } from 'react-icons/bs'
import { useEffect, useState, useRef, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
export default function MovimientoPlanilla() {

    //State para guardar los datos de la tabla
    const [data, setData] = useState([])
    const [dataUpdate, setDataUpdate] = useState([])
    const Codigo = useRef(null)
    const NombreCentroCostos = useRef(null)



    //Use state para mostrar el modal de editar
    const [mostrarEditar, setMostrarEditar] = useState(false)
    //Referencias para los inputs
    const [fields, setFields] = useState({
        Codigo: 900000,
        DescripcionCodigoCosto: '',
    });



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
            },{
                accessorKey: 'Cuenta2',
                header: 'Cuenta 2',
            },{
                accessorKey: 'Cuenta3',
                header: 'Cuenta 3',
            },{
                accessorKey: 'Cuenta4',
                header: 'Cuenta 4',
            },{
                accessorKey: 'MovimientoExcepcion1',
                header: 'Movimiento Excepcion 1',
            },{
                accessorKey: 'MovimientoExcepcion2',
                header: 'Movimiento Excepcion 2',
            },{
                accessorKey: 'MovimientoExcepcion3',
                header: 'Movimiento Excepcion 3',
            },{
                accessorKey: 'Aplica_iess',
                header: 'Aplica Iess',
            },{
                accessorKey: 'Aplica_imp_renta',
                header: 'Aplica Imp Renta',
            },{
                accessorKey: 'Empresa_Afecta_Iess',
                header: 'Empresa Afecta Iess',
            },{
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
        // if (user) {
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

            <div style={{ marginTop: "-25px" }}>
                <h1>
                    Centro de Costos
                </h1>
            </div>
            <div>
                <form onSubmit={handleSubmit} >
                    <h2>Agregar un Centro de Costos</h2>
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems:"flex-end" }}>
                        <div>
                            <span>Ingrese el codigo del Centro de Costos</span>
                            <input type="number" ref={Codigo} />
                        </div>
                        <div>
                            <span>Ingrese el nombre del Centro de Costos</span>
                            <input type="text" ref={NombreCentroCostos} />
                        </div>
                        <div style={{alignContent:"center"}}>
                            <center>
                            <button className='botonAgregar' type="submit"> Agregar</button>

                            </center>

                        </div>
                    </div>




                </form>


            </div>
            <div style={{marginTop:"5%"}}>
                <h2>
                    Centros de Costos Registrados
                </h2>
                <MaterialReactTable columns={columns} data={data} enableRowActions />
            </div>

            <div>
                <form className={mostrarEditar ? 'mostrarModal' : 'ocultarModal'} onSubmit={actualizarUsuario}>
                    <div className='formEditar'>
                        <h2>Editar Centro de Costos</h2>

                        <div style={{ display: "flex" }}>

                            <div className="input-wrapper">
                                <span>Nombre del Centro de Costos</span>
                                <input type="text" placeholder="Nombre" defaultValue={fields.DescripcionCodigoCosto} onChange={(e) => setFields({ ...fields, DescripcionCodigoCosto: e.target.value })} required />
                            </div>

                        </div>

                        <div style={{ display: "flex", width: "40%", justifyContent: "space-around" }}>
                            <button type="submit">Actualizar</button>
                            <button type="button" onClick={() => setMostrarEditar(false)}>Cancelar</button>
                        </div>

                    </div>

                </form>
            </div>
        </main >
    )
}
