import React from 'react'
import { Publications } from '../Publications/Publications'
import { Side } from '../Side/Side'
import { Slider } from '../Slider/Slider'
import "../Content/Content.scss"
export const Content = () => {
    return (
        <div className="content__instagram">
            <Slider/>
            <Publications/>
            <Side/>
        </div>
    )
}
