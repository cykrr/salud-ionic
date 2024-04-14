import React from 'react'

type Props = {
    id?: string
    children?: React.Element<Child>
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void

}
export const Select = ({id, children, className, onChange}: Props) => {
    return(
        <select 
            className={(className ? className : "") + " dark:bg-grey-200 bg-white rounded-full border-0 py-3 pl-7 my-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:outline-none focus:ring-inset" }
            onChange={onChange}
            id={id}
        >
        {children ? children : ""}
        </select>)
}
export default Select