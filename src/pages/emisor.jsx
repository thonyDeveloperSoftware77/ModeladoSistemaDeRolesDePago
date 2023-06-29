'use client'

import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import { useUser } from '../../controllers/useProvider';
export default function emisor() {
    const router = useRouter();

    const { user, setUser } = useUser();
    const [emisor, setEmisor] = useState([])
    const [fields, setFields] = useState({ value: null })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (fields?.value == "Seleccione" || fields?.value === null) {
            alert("Seleccione un emisor")
        } else if (user) {

            if (fields?.value == user[0]?.Emisor) {
                router.push({ pathname: '/dashboard' }, '/dashboard');
                router.push({ pathname: '/dashboard' }, '/dashboard');
                router.push({ pathname: '/dashboard' }, '/dashboard');
                router.push({ pathname: '/dashboard' }, '/dashboard');

                alert("Correcto")
            } else {
                alert("Emisor Incorrecto")

            }
        }

    }



    useEffect(() => {
        if (user) {
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
        } else {
            router.push({ pathname: '/' }, '/');
        }
    }, [])

    return (

        <main>
            <div className='EmisorForm'>
                <h2>Emisor</h2>
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
                    <button type='submit' >
                        Ingresar
                    </button>
                </form>
            </div>
        </main>
    )
}
