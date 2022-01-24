import React from 'react'
import { Footer } from '../Footer/Footer'
import { Sugerencias } from '../Sugerencias/Sugerencias'
import { Usuario } from '../Usuario/Usuario'

export const Side = () => {
    return (
        <>
            <Usuario/>
            <Sugerencias/>
            <Footer/>
        </>
    )
}
