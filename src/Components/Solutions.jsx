import { motion, useReducedMotion } from "motion/react";
import {
    ArrowRight,
    Factory,
    Warehouse,
    Route,
    Building2,
    Fuel,
    HeartPulse,
    GraduationCap,
    Sun,
} from "lucide-react";

const solutions = [
    {
        icon: Factory,
        title: "Industrial Lighting",
        text: "Factories, manufacturing units and industrial facilities.",
        image: "industrial.jpg",
    },
    {
        icon: Warehouse,
        title: "Warehouse Lighting",
        text: "Storage, logistics and distribution facilities.",
        image: "warehouse.jpg",
    },
    {
        icon: Route,
        title: "Road & Street Lighting",
        text: "Roads, highways, pathways and public areas.",
        image: "street.jpg",
    },
    {
        icon: Building2,
        title: "Commercial Lighting",
        text: "Offices, retail spaces and commercial buildings.",
        image: "commercial.jpg",
    },
    {
        icon: Fuel,
        title: "Petrol Pump Lighting",
        text: "Fuel stations and service areas.",
        image: "petrol-pump.jpg",
    },
    {
        icon: HeartPulse,
        title: "Hospital Lighting",
        text: "Hospitals, clinics and healthcare facilities.",
        image: "hospital.jpg",
    },
    {
        icon: GraduationCap,
        title: "School Lighting",
        text: "Educational institutions and campuses.",
        image: "school.jpg",
    },
    {
        icon: Sun,
        title: "Solar Lighting",
        text: "Solar-powered lighting for off-grid outdoor applications.",
        image: "solar.jpg",
    },
];

const ease = [0.22, 1, 0.36, 1];

function SolutionCard({ icon: Icon, title, text, image, reduce }) {
    // Labels "hidden" / "show" come from the grid; "hover" is triggered by whileHover.
    // Children below define only "hover", so they react when the card is hovered.
    const cardVariants = {
        hidden: { opacity: 0, y: reduce ? 0 : 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
        hover: {
            y: reduce ? 0 : -6,
            boxShadow: "0 18px 40px -18px rgba(10,31,77,.35)",
            transition: { duration: 0.25, ease },
        },
    };

    return (
        <motion.article
            variants={cardVariants}
            whileHover="hover"
            className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-blue-400/50"
        >
            {/* Photo: zooms on card hover, with a soft bottom gradient for depth */}
            <div
                className="relative h-32 overflow-hidden"
                role="img"
                aria-label={title}
            >
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/images/solutions/${image}'), linear-gradient(135deg, #0a1f4d, #1d4ed8)`,
                    }}
                    variants={{
                        hover: { scale: reduce ? 1 : 1.08, transition: { duration: 0.6, ease } },
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-900/40 via-transparent to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start gap-3">
                    {/* Icon box fills blue on hover */}
                    <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-navy-800 transition-colors duration-300 group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white">
                        <motion.span
                            className="grid place-items-center"
                            variants={{
                                hover: {
                                    scale: reduce ? 1 : 1.12,
                                    rotate: reduce ? 0 : -6,
                                    transition: { type: "spring", stiffness: 300, damping: 14 },
                                },
                            }}
                        >
                            <Icon size={18} strokeWidth={1.7} />
                        </motion.span>
                    </span>

                    <div>
                        <h3 className="text-[13px] font-semibold text-ink">{title}</h3>
                        <p className="mt-1 text-[11px] leading-snug text-muted">{text}</p>
                    </div>
                </div>

                <a
                    href="#products"
                    className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-500 hover:text-blue-600"
                >
                    Explore Solution
                    <motion.span
                        className="inline-flex"
                        variants={{ hover: { x: reduce ? 0 : 4, transition: { duration: 0.25 } } }}
                    >
                        <ArrowRight size={12} />
                    </motion.span>
                </a>
            </div>

            {/* Accent line that sweeps in along the bottom on hover */}
            <motion.span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-blue-500"
                style={{ scaleX: 0 }}
                variants={{ hover: { scaleX: 1, transition: { duration: 0.35, ease } } }}
            />
        </motion.article>
    );
}

export default function Solutions() {
    const reduce = useReducedMotion();

    const headerContainer = {
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
    };
    const headerItem = {
        hidden: { opacity: 0, y: reduce ? 0 : 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
    };
    const gridContainer = {
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    };

    return (
        <section id="our-solutions" className="py-14">
            <div className="container-x">
                {/* Header: reveals when scrolled into view */}
                <motion.div
                    className="mb-8 flex flex-wrap items-end justify-between gap-4"
                    variants={headerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <div>
                        <motion.p
                            variants={headerItem}
                            className="mb-2 flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.12em] text-blue-500"
                        >
                            <motion.span
                                className="h-px w-5 origin-left bg-blue-500"
                                variants={{
                                    hidden: { scaleX: 0 },
                                    show: { scaleX: 1, transition: { duration: 0.6, ease } },
                                }}
                            />
                            OUR SOLUTIONS
                        </motion.p>

                        <motion.h2
                            variants={headerItem}
                            className="text-[28px] font-bold tracking-tight text-navy-800"
                        >
                            Find the Right <span className="text-blue-500">Lighting Solution</span>
                        </motion.h2>

                        <motion.p
                            variants={headerItem}
                            className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted"
                        >
                            Every space has different lighting requirements. Explore our
                            application-based solutions to find suitable products for your
                            project.
                        </motion.p>
                    </div>

                    <motion.a
                        variants={headerItem}
                        href="#solutions"
                        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600"
                    >
                        View All Solutions
                        <ArrowRight
                            size={14}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </motion.a>
                </motion.div>

                {/* Cards: staggered fade-up as the grid enters the viewport */}
                <motion.div
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    variants={gridContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {solutions.map((s) => (
                        <SolutionCard key={s.title} {...s} reduce={reduce} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}