import Input from '../components/Input'
import {useState} from 'react'
import React from 'react'
import {InputProp} from '../components/Input'
const formatearRUT = (rut: String)=>{
    // XX.XXX.XXX-X
    const newRut = rut.replace(/\./g,'').replace(/\-/g, '').trim().toLowerCase();
    const lastDigit = newRut.substr(-1, 1);
    const rutDigit = newRut.substr(0, newRut.length-1)
    let format = '';
    for (let i = rutDigit.length; i > 0; i--) {
        const e = rutDigit.charAt(i-1);
        format = e.concat(format);
        if (i % 3 === 0){
        format = '.'.concat(format);
        }
    }
    return format.concat('-').concat(lastDigit);
    }

export default function RutInput(args: InputProp) {
    const [rut,setRut] = useState("")
    const [rutValido,setRutValido] = useState(false)

    return(
        <Input 
            {...args}
            onChange={(e)=>{e.target.value = formatearRUT(e.target.value)}}
            placeholder='RUT'>
        </Input>
    )
}