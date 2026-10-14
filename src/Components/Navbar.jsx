import { useState } from "react";
import { Search, ArrowRight, Menu, X } from "lucide-react";

const links = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Solutions", href: "#solutions" },
    { label: "Projects", href: "#projects" },
    { label: "Catalogue", href: "#catalogue" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar({ active = "Solutions" }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-white">
            <div className="container-x flex h-16 items-center justify-between gap-6">
                {/* Logo */}
                <a
                    href="#home"
                    aria-label="Vajra LED home"
                    className="flex flex-col leading-none"
                >
                    <span className="text-2xl font-extrabold italic tracking-wide text-navy-800">
                        VAJRA
                    </span>
                    <span className="self-end text-[9px] font-semibold tracking-[0.15em] text-blue-500">
                        LED
                    </span>
                </a>

                {/* Links */}
                <nav
                    aria-label="Main"
                    className={`${open ? "flex" : "hidden"
                        } absolute left-0 right-0 top-16 flex-col border-b border-line bg-white px-6 pb-4 pt-2 min-[900px]:static min-[900px]:flex min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-7 min-[900px]:border-0 min-[900px]:p-0`}
                >
                    {links.map((l) => {
                        const isActive = l.label === active;
                        return (
                            <a
                                key={l.label}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className={`relative border-b border-line py-3 text-[13px] transition-colors hover:text-blue-500 min-[900px]:border-0 min-[900px]:py-5.5 ${isActive
                                        ? "font-semibold text-blue-500 min-[900px]:after:absolute min-[900px]:after:inset-x-0 min-[900px]:after:bottom-0 min-[900px]:after:h-0.5 min-[900px]:after:bg-blue-500"
                                        : "font-medium text-ink"
                                    }`}
                            >
                                {l.label}
                            </a>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3.5">
                    <button
                        aria-label="Search"
                        className="grid size-8.5 place-items-center rounded-full border border-line bg-white text-ink hover:border-blue-400 hover:text-blue-500"
                    >
                        <Search size={16} />
                    </button>

                    <a href="#quote" className="btn btn-primary btn-sm max-[480px]:hidden">
                        Get a Quote <ArrowRight size={14} />
                    </a>

                    <button
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen((o) => !o)}
                        className="grid size-8.5 place-items-center rounded-full border border-line bg-white text-ink hover:border-blue-400 hover:text-blue-500 min-[900px]:hidden"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>
        </header>
    );
}