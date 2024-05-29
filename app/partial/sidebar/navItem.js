'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function NavItem({ title, icon, href, cssClass }) {
    const pathname = usePathname();
    return (
        <li className='nav__item'>
            <Link href={href} className={`${cssClass ? cssClass : 'nav__link'} ${pathname === href ? 'active-link' : ''}`}>
                {icon && (
                    <span className='icon'>
                        {icon}
                    </span>
                )}
                {title}
            </Link>
        </li>
    );
}
