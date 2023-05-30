import Link from 'next/link'


export const MenuItem = ({ children, href, btntype }) => {
    return (
        <Link href={href}>
            <div className={`text-gray-500 hover:font-semibold border-[1px] text-sm rounded-xl p-2
                ${btntype === 'secondary' && 'bg-blue-400 hover:bg-blue-600 text-white'}
                ${btntype === 'other' && 'bg-white border-none hover:bg-gray-100'}
                ${btntype === 'primary' && 'bg-white hover:text-gray-900'}
            `}>{children}</div>
        </Link>
    )

}
