import Select from "../components/Select"
import * as React from 'react'
import { useState, useEffect } from 'react'

type Props = {
    children?: React.ReactNode
    className?: string
}

interface Region {
    region: string
    comunas: Array<string>
}
interface RegionData {
    regiones: Array<Region>
}

function get_regions(data: RegionData) {
    let options = []
    if (data == null) 
        return (<option>Cargando</option>)
    
    for (let i = 0; i < data.regiones.length; i++) {
        options.push(<option key={i} value={i}>{data.regiones[i].region}</option>)
    }
    return options
}

function get_comunas(data: RegionData|null, region: number) {
    let options = []
    if (data == null ) 
        return (<option>Cargando</option>)

    else if (region == null) return (<option>Seleccione una región</option>)
    for (let i = 0; i < data.regiones[region].comunas.length; i++) {
      options.push(<option key={i} value={i}>{data.regiones[region].comunas[i]}</option>)
    }
    return options

}

export const SelectRegionComuna = () =>{
 
    const [data,setData] = useState(null)
    const [selection,setSelection] = useState(0)

    useEffect(() => {
            const response = fetch('https://gist.githubusercontent.com/juanbrujo/0fd2f4d126b3ce5a95a7dd1f28b3d8dd/raw/b8575eb82dce974fd2647f46819a7568278396bd/comunas-regiones.json')
            .then(response => response.json())
            .then(result => {
                setData(result)
            })
    }, [])

    useEffect(setSelection, [data])

    return(
        <div className="h-full flex flex-row space-x-2.5 min-w-0">
            <Select className="max-w-1/2" onChange={(e) => {setSelection(e.target.value)}}> {get_regions(data)}</Select>
            <Select className="w-48">{get_comunas(data, selection)}</Select>
        </div>
    )
}
export default SelectRegionComuna