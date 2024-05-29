'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function NavGroup({children, title, href, icon, cssClass}) {
    const pathname = usePathname();
    let isActivePath = pathname.includes(href);
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        if( !isActive && isActivePath ){
            setActive(true);
        }
      }, [pathname]);
 
    function clickHandelr(e){
        e.preventDefault();
        setActive(!isActive);
    }

    return (
        <li className={`nav__item dropdown ${isActive ? 'dropdown-active' : ''}`}>
            <Link onClick={(e)=>clickHandelr(e)} href={href} className={`nav__link dropdown__trigger  ${cssClass ? cssClass : ''} ${isActivePath ? 'active-link' : ''}`}>
                {icon && (
                    <span className='icon'>
                        {icon}
                    </span>
                )}
                {title}
            </Link>

            {children}
        </li>
    );
}
