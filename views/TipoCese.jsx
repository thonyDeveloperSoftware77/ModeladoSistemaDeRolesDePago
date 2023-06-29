'use client'

import Image from 'next/image'

//Importar iconos
import { BsPersonFillAdd, BsPersonFillDash, BsPersonFillUp } from 'react-icons/bs'
import { useEffect, useState, useRef, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
export default function TipoCese() {

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
                accessorKey: 'Codigo',
                header: 'Codigo',
            },

            {
                accessorKey: 'Descripcion',
                header: 'Descripcion',
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
        fetch(`/api/tipoCese`)
        .then(response => response.json())
        .then(data => {
            const dataRenderTables = data.map((item) => {
                return {
                    Codigo: item.Codigo,
                    Descripcion: item.Descripcion,
                }
            });
            setData(dataRenderTables)

        });
    }, [dataUpdate])


    return (

        <main>

            <div style={{ marginTop: "-25px" }}>
                <h1>
                    Tipo de Cese
                </h1>
            </div>
            
            <div style={{ marginTop: "5%" }}>
                <h2>
                    Registros
                </h2>
                <MaterialReactTable columns={columns} data={data} enableRowActions />
            </div>

          
        </main >
    )
}
