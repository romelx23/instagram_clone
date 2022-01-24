import React from 'react'
import '../Slider/Slider.scss'
import { Bubble } from '../Bubble/Bubble'

export const Slider = () => {
    return (
        <div className="slider">
            {/* <h3>Slider</h3> */}
            <div className="slider__content">
                <Bubble/>
                <Bubble/>
                <Bubble/>
                <Bubble/>
                <Bubble/>
                <Bubble/>
                <Bubble/>
                <Bubble/>
                <Bubble/>
            </div>
        </div>
    )
}
