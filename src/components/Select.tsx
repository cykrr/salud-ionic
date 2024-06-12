import React, { useState } from 'react'

type Props = {
    id?: string
    children?: React.ReactNode
    className?: string
    defaultValue?: number
    label: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Select(args: Props) {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
      setFocused(true);
    };
  
    const handleBlur = () => {
      setFocused(false);
    };
    
    return (
        <>
            <div className={`floating-select ${focused ? 'focused' : ''}`}>
                <select 
                    onFocus={handleFocus} 
                    onBlur={handleBlur} 
                    onChange={args.onChange}
                    defaultValue={args.defaultValue}
                    id={args.id}
                >
                    {args.children ? args.children : ""}
                </select>
                <label>{args.label}</label>
            </div>
    
            <style> {`
                .floating-select {
                    position: relative;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    height: 52px;
                }

                .floating-select:after {
                    content: '▼';
                    font-size: 1rem;
                    right: 1.25rem;
                    position: absolute;
                }

                .floating-select label {
                    position: absolute;
                    top: 15%;
                    left: 0;
                    transform: translate(0, 0);
                    pointer-events: none;
                    transition: 0.2s ease all;
                    color: #999;
                    margin-left: 1.6rem;
                    padding-left: 0.15rem;
                    padding-right: 0.15rem;
                    font-size: 13px;
                }

                .floating-select select {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ccc;
                    border-radius: 9999px;
                    padding-left: 1.75rem;
                    padding-right: 1.25rem;
                    padding-top: 1.05rem;
                    outline: none;
                }

                .floating-select.focused label {
                    color: #5833FF;
                }

                .floating-select.focused select {
                    border-color: #5833FF;
                    transition: 0.2s ease all;
                }
            `}
            </style>
        </>
    )
}