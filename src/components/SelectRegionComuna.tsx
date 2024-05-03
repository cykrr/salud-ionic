import Select from "../components/Select"
import * as React from 'react'
import { useState, useEffect } from 'react'

type Props = {
    children?: React.Element<Child>
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
    if (data == null) 
        return (<option>Cargando</option>)
    
    return data.regiones.map((region: Region, index: number) => {
        return <option key={index+1} value={index+1}>{region.region}</option>
    })
}

function get_comunas(data: RegionData|null, region: number) {
    if (data == null ) 
        return (<option>Cargando</option>)
    else if (region == null) return (<option value={0}>Comuna</option>)

    else if (region != 0) return data.regiones[region-1].comunas.sort().map((comuna: string, index: number) => {
        return <option key={index+1} value={index+1}>{comuna}</option>
    })

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
        <div className="flex flex-col">
            <Select id ="region" className="truncate"
                    onChange={(e) => {
                        setSelection(parseInt(e.target.value))
                    }}> 
                <option key = "0" value = "0">Seleccione una región</option>
                {get_regions(data)}
            </Select>

            <Select id="comuna" className="truncate">
                {get_comunas(data, selection)}
            </Select>
        </div>
    )
}
export default SelectRegionComuna