import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
    { title: "Warehouse project", image: "warehouse.jpg" },
    { title: "Industrial facility", image: "industrial.jpg" },
    { title: "Highway street lighting", image: "highway.jpg" },
    { title: "Commercial office", image: "office.jpg" },
    { title: "Petrol pump canopy", image: "petrol-pump.jpg" },
];

const ease = [0.22, 1, 0.36, 1];

function ProjectCard({ title, image, reduce }) {
    // "hidden" / "show" are inherited from the track; "hover" comes from whileHover.
    const cardVariants = {
        hidden: { opacity: 0, y: reduce ? 0 : 32, scale: reduce ? 1 : 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease } },
        hover: {
            y: reduce ? 0 : -6,
            boxShadow: "0 18px 40px -16px rgba(10,31,77,.5)",
            transition: { duration: 0.25, ease },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="relative h-36 w-[70%] shrink-0 cursor-pointer snap-start overflow-hidden rounded-md sm:w-[45%] min-[900px]:w-[31%] xl:w-[calc((100%-64px)/5)]"
        >
            {/* Photo zooms on hover */}
            <motion.div
                role="img"
                aria-label={title}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/images/projects/${image}'), linear-gradient(135deg, #0a1f4d, #1d4ed8)`,
                }}
                variants={{
                    hover: { scale: reduce ? 1 : 1.1, transition: { duration: 0.7, ease } },
                }}
            />

            {/* Dark gradient fades in on hover */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-navy-900/90 via-navy-900/30 to-transparent"
                style={{ opacity: 0 }}
                variants={{ hover: { opacity: 1, transition: { duration: 0.3 } } }}
            />

            {/* Title slides up */}
            <motion.p
                className="absolute inset-x-3 bottom-3 text-xs font-semibold text-white"
                style={{ opacity: 0, y: reduce ? 0 : 12 }}
                variants={{ hover: { opacity: 1, y: 0, transition: { duration: 0.3, ease } } }}
            >
                {title}
            </motion.p>

            {/* Corner badge pops in */}
            <motion.span
                aria-hidden="true"
                className="absolute right-2.5 top-2.5 grid size-7 place-items-center rounded-full bg-blue-500 text-white"
                style={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
                variants={{
                    hover: {
                        opacity: 1,
                        scale: 1,
                        transition: { type: "spring", stiffness: 320, damping: 16 },
                    },
                }}
            >
                <ArrowUpRight size={14} />
            </motion.span>
        </motion.div>
    );
}

function ArrowButton({ direction, onClick, disabled, reduce }) {
    const isPrev = direction === "prev";
    const Icon = isPrev ? ChevronLeft : ChevronRight;

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            aria-label={isPrev ? "Previous projects" : "Next projects"}
            whileHover={disabled || reduce ? undefined : { scale: 1.1 }}
            whileTap={disabled || reduce ? undefined : { scale: 0.9 }}
            className="grid size-8 place-items-center rounded-full border border-line bg-white text-ink transition-colors enabled:hover:border-blue-500 enabled:hover:bg-blue-500 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
            <Icon size={16} />
        </motion.button>
    );
}

export default function Projects() {
    const reduce = useReducedMotion();
    const trackRef = useRef(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    // Disable arrows at either end (or when everything already fits on screen)
    const updateArrows = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        updateArrows();
        window.addEventListener("resize", updateArrows);
        return () => window.removeEventListener("resize", updateArrows);
    }, [updateArrows]);

    const scroll = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
    };

    const headerContainer = {
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
    };
    const headerItem = {
        hidden: { opacity: 0, y: reduce ? 0 : 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
    };
    const trackContainer = {
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    };

    return (
        <section id="projects" className="py-14">
            <div className="container-x">
                {/* Header */}
                <motion.div
                    className="mb-7 flex flex-wrap items-end justify-between gap-4"
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
                            OUR PROJECTS
                        </motion.p>

                        <motion.h2
                            variants={headerItem}
                            className="text-[28px] font-bold tracking-tight text-navy-800"
                        >
                            Real-World <span className="text-blue-500">Lighting Projects</span>
                        </motion.h2>

                        <motion.p
                            variants={headerItem}
                            className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted"
                        >
                            Explore how Vajra LED products are used across industrial,
                            commercial and outdoor spaces.
                        </motion.p>
                    </div>

                    <motion.div variants={headerItem} className="flex items-center gap-4">
                        <a
                            href="#projects"
                            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600"
                        >
                            View All Projects
                            <ArrowRight
                                size={14}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </a>
                        <div className="flex gap-2">
                            <ArrowButton
                                direction="prev"
                                onClick={() => scroll(-1)}
                                disabled={!canPrev}
                                reduce={reduce}
                            />
                            <ArrowButton
                                direction="next"
                                onClick={() => scroll(1)}
                                disabled={!canNext}
                                reduce={reduce}
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Gallery track: photos reveal in a staggered wave */}
                <motion.div
                    ref={trackRef}
                    onScroll={updateArrows}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-0.5 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    variants={trackContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {projects.map((p) => (
                        <ProjectCard key={p.title} {...p} reduce={reduce} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}