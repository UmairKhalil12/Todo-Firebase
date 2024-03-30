import React from 'react'
import './InputForm.css'


export default function InputForm({ placeholder, type, value, onChange }) {
    return (
        <div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='form-input'
            />
        </div>

    )
}
