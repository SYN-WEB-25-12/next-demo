"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="flex text-sm px-4 my-2 bg-gray-200">
          <Link href="/" className="w-full">
            <div>Next Demo</div>
          </Link>
          <ul className="flex flex-row gap-2 ">
            <li>
                { pathname === "/blog/"
                    ? "Blog"
                    : (
                        <Link href="/blog" className="text-blue-600">
                            Blog
                        </Link>
                    )
                }
            </li>
          </ul>
        </nav>

    )
}