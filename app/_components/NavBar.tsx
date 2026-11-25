"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

function ProfileIcon() {
    return (
        <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0"
        >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" />
        </svg>
    );
}

export default function NavBar({ userName }: { userName: string | null }) {
    const pathname = usePathname();

    const links = [
        { href: "/authors", label: "Authors" },
        { href: "/blog", label: "Posts" },
        { href: "/auth", label: userName ?? "Auth", icon: <ProfileIcon /> },
    ];

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`);

    return (
        <nav className="sticky top-3 z-50 mx-4 mt-3 flex items-center justify-between rounded-2xl border border-white/60 bg-white/40 px-2 py-2 text-sm shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/5 dark:ring-white/5">
            <Link
                href="/"
                className="rounded-lg px-3 py-1 font-semibold tracking-tight text-gray-900 dark:text-gray-100"
            >
                Next Demo
            </Link>
            <ul className="flex flex-row items-center gap-2">
                {links.map(({ href, label, icon }) => {
                    const active = isActive(href);
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                aria-current={active ? "page" : undefined}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-medium transition-colors ${
                                    active
                                        ? "bg-white/80 text-gray-900 shadow-sm dark:bg-white/15 dark:text-white"
                                        : "text-gray-600 hover:bg-white/60 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                                }`}
                            >
                                {icon}
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
