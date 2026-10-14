import { useEffect, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
} from "motion/react";
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

const ease = [0.22, 1, 0.36, 1];

// True when the viewport is >= 900px (the desktop nav breakpoint)
function useIsDesktop() {
    const query = "(min-width: 900px)";
    const [matches, setMatches] = useState(
        () => typeof window !== "undefined" && window.matchMedia(query).matches
    );

    useEffect(() => {
        const mq = window.matchMedia(query);
        const onChange = (e) => setMatches(e.matches);
        setMatches(mq.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    return matches;
}

export default function Navbar({ active = "Solutions" }) {
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const isDesktop = useIsDesktop();
    const reduce = useReducedMotion();

    const menuOpen = open && !isDesktop;
    const current = hovered ?? active;

    // Shadow + blur once the page is scrolled; progress bar tracks page scroll
    const { scrollY, scrollYProgress } = useScroll();
    useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

    // Close the mobile menu with Escape
    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [menuOpen]);

    const desktopList = {
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
    };
    const desktopItem = {
        hidden: { opacity: 0, y: reduce ? 0 : -10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
    };
    const mobileList = {
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
    };
    const mobileItem = {
        hidden: { opacity: 0, x: reduce ? 0 : -14 },
        show: { opacity: 1, x: 0, transition: { duration: 0.3, ease } },
    };

    return (
        <motion.header
            initial={{ y: reduce ? 0 : -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            className={`sticky top-0 z-50 border-b border-line transition-[background-color,box-shadow] duration-300 ${scrolled
                    ? "bg-white/90 shadow-[0_8px_28px_-14px_rgba(10,31,77,.3)] backdrop-blur-md"
                    : "bg-white"
                }`}
        >
            {/* Page scroll progress */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left bg-linear-to-r from-blue-400 to-blue-600"
                style={{ scaleX: progress }}
            />

            <div className="container-x flex h-16 items-center justify-between gap-6">
                {/* Logo */}
                <motion.a
                    href="#home"
                    aria-label="Vajra LED home"
                    className="flex flex-col leading-none"
                    whileHover={reduce ? undefined : { scale: 1.04 }}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                    <span className="text-2xl font-extrabold italic tracking-wide text-navy-800">
                        VAJRA
                    </span>
                    <span className="self-end text-[9px] font-semibold tracking-[0.15em] text-blue-500">
                        LED
                    </span>
                </motion.a>

                {/* Desktop links with a sliding underline that follows the cursor */}
                {isDesktop && (
                    <motion.nav
                        aria-label="Main"
                        className="flex items-center gap-7"
                        variants={desktopList}
                        initial="hidden"
                        animate="show"
                        onMouseLeave={() => setHovered(null)}
                    >
                        {links.map((l) => (
                            <motion.a
                                key={l.label}
                                href={l.href}
                                variants={desktopItem}
                                onMouseEnter={() => setHovered(l.label)}
                                onFocus={() => setHovered(l.label)}
                                onBlur={() => setHovered(null)}
                                className={`relative py-5.5 text-[13px] transition-colors hover:text-blue-500 ${l.label === active ? "font-semibold text-blue-500" : "font-medium text-ink"
                                    }`}
                            >
                                {l.label}
                                {current === l.label && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        aria-hidden="true"
                                        className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                            </motion.a>
                        ))}
                    </motion.nav>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3.5">
                    <motion.button
                        aria-label="Search"
                        className="group grid size-8.5 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-blue-400 hover:text-blue-500"
                        whileHover={reduce ? undefined : { scale: 1.08 }}
                        whileTap={reduce ? undefined : { scale: 0.92 }}
                    >
                        <Search
                            size={16}
                            className="transition-transform duration-300 group-hover:-rotate-12"
                        />
                    </motion.button>

                    <motion.a
                        href="#quote"
                        className="btn btn-primary btn-sm group max-[480px]:hidden"
                        whileHover={{
                            y: reduce ? 0 : -2,
                            boxShadow: "0 10px 24px -10px rgba(37,99,235,.8)",
                        }}
                        whileTap={reduce ? undefined : { scale: 0.96 }}
                    >
                        Get a Quote
                        <ArrowRight
                            size={14}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </motion.a>

                    {!isDesktop && (
                        <motion.button
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                            onClick={() => setOpen((o) => !o)}
                            className="grid size-8.5 place-items-center overflow-hidden rounded-full border border-line bg-white text-ink transition-colors hover:border-blue-400 hover:text-blue-500"
                            whileTap={reduce ? undefined : { scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={menuOpen ? "close" : "open"}
                                    className="grid place-items-center"
                                    initial={{ opacity: 0, rotate: reduce ? 0 : -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: reduce ? 0 : 90 }}
                                    transition={{ duration: 0.18 }}
                                >
                                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Mobile menu: slides open, links stagger in */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        aria-label="Main"
                        className="absolute left-0 right-0 top-16 overflow-hidden border-b border-line bg-white shadow-lg"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                    >
                        <motion.div
                            className="flex flex-col px-6 pb-4 pt-2"
                            variants={mobileList}
                            initial="hidden"
                            animate="show"
                        >
                            {links.map((l) => (
                                <motion.a
                                    key={l.label}
                                    href={l.href}
                                    variants={mobileItem}
                                    onClick={() => setOpen(false)}
                                    className={`border-b border-line py-3 text-[13px] transition-colors hover:text-blue-500 ${l.label === active ? "font-semibold text-blue-500" : "font-medium text-ink"
                                        }`}
                                >
                                    {l.label}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
}