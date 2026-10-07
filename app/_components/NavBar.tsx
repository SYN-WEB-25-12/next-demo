"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    const links = [
        { href: "/authors/", label: "Authors" },
        { href: "/blog/", label: "Posts" },
        { href: "/login/", label: "Login" }
    ]

    return (
        <nav className="flex text-sm px-4 my-2 bg-gray-200">
          <Link href="/" className="w-full">
            <div>Next Demo</div>
          </Link>
          <ul className="flex flex-row gap-2">
                {
                    links.map(({href, label}) => (
                        <li key={href}> 
                            {
                                pathname === href
                                ? label
                                : (
                                    <Link key={href} href={href} className="text-blue-600">
                                        {label}
                                    </Link>
                                )
                            }
                        </li>
                    ))
                }
          </ul>
        </nav>

    )
}