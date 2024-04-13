export default function Button({children,}: Readonly<{children: React.ReactNode;}>) {
    return(
        <button 
            className="bg-purple-500 hover:bg-purple-400 ease-in duration-100 rounded-2xl p-3 px-5 text-white font-light"
        >{children}</button>)
}