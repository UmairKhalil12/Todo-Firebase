import React from 'react'
import './Button.css'

export default function Button({ type, text , onClick}) {
    return (
        <div>
            <button type={type} className='btn-form' onClick={onClick} >{text}</button>
        </div>

    )
}
