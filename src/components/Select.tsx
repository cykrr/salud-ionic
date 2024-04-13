import React from 'react'

type Props = {
    children?: React.Element<Child>
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void

}
export const Select = ({children, className, onChange}: Props) => {
    return(
        <select 
            className={(className ? className : "") + " bg-white block rounded-full border-0 py-3 pl-7 my-1.5 md:pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:outline-none focus:ring-inset  sm:text-sm sm:leading-6"}
            onChange={onChange}
        >
        {children ? children : ""}
        </select>)
}
export default Select