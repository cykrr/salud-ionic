import React from 'react'

type Props = {
    id?: string
    children?: React.Element<Child>
    className?: string
    defaultValue?: number
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({id, children, className, defaultValue, onChange}: Props) => {
    return (
        <div 
            className={(className ? className : "") + " wrapper"}
        >
            <select 
                className="w-full dark:bg-grey-200 bg-white rounded-full border-0 my-1.5 py-2.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
                onChange={onChange}
                defaultValue={defaultValue}
                id={id}
            >
                {children ? children : ""}
            </select>
            <style> {`
                .wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    min-width: fit-content;
                }

                .wrapper:after {
                    content: '▼';
                    font-size: 1rem;
                    right: 1.25rem;
                    position: absolute;
                }
            `}
            </style>
        </div>
    )
}

export default Select