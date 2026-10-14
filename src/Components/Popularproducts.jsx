import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

const products = [
    {
        name: "LED High Bay Light",
        text: "For industrial & warehouse applications.",
        image: "high-bay.png",
    },
    {
        name: "LED Flood Light",
        text: "For outdoor & large areas.",
        image: "flood-light.png",
    },
    {
        name: "LED Street Light",
        text: "For roads & outdoor applications.",
        image: "street-light.png",
    },
    {
        name: "LED Panel Light",
        text: "For offices & commercial spaces.",
        image: "panel-light.png",
    },
    {
        name: "LED Downlight",
        text: "For indoor & outdoor applications.",
        image: "downlight.png",
    },
    {
        name: "Solar Street Light",
        text: "For off-grid outdoor applications.",
        image: "solar-street-light.png",
    },
];

const ease = [0.22, 1, 0.36, 1];

function ProductCard({ name, text, image, reduce }) {
    const [failed, setFailed] = useState(false);

    // "hidden" / "show" are inherited from the track; "hover" comes from whileHover.
    const cardVariants = {
        hidden: { opacity: 0, y: reduce ? 0 : 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
        hover: {
            y: reduce ? 0 : -6,
            boxShadow: "0 18px 40px -18px rgba(10,31,77,.35)",
            transition: { duration: 0.25, ease },
        },
    };

    // Product floats up and grows slightly when the card is hovered
    const productHover = {
        hover: {
            scale: reduce ? 1 : 1.08,
            y: reduce ? 0 : -4,
            transition: { duration: 0.5, ease },
        },
    };

    return (
        <motion.article
            variants={cardVariants}
            whileHover="hover"
            className="group relative flex w-[72%] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-line bg-white p-4 transition-colors hover:border-blue-400/50 sm:w-[44%] min-[900px]:w-[31%] xl:w-[calc((100%-100px)/6)]"
        >
            <div className="relative mb-4 grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-md bg-slate-50 p-3">
                {/* Soft blue glow behind the product on hover */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle,rgba(37,99,235,.14),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {failed ? (
                    <motion.span variants={productHover} className="relative">
                        <Lightbulb size={36} strokeWidth={1.2} className="text-slate-300" />
                    </motion.span>
                ) : (
                    <motion.img
                        variants={productHover}
                        src={`/images/products/${image}`}
                        alt={name}
                        loading="lazy"
                        onError={() => setFailed(true)}
                        className="relative h-full w-full object-contain"
                    />
                )}
            </div>

            <h3 className="text-[13px] font-semibold text-ink">{name}</h3>
            <p className="mt-1 flex-1 text-[11px] leading-snug text-muted">{text}</p>

            <a
                href="#products"
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-500 hover:text-blue-600"
            >
                View Product
                <motion.span
                    className="inline-flex"
                    variants={{ hover: { x: reduce ? 0 : 4, transition: { duration: 0.25 } } }}
                >
                    <ArrowRight size={12} />
                </motion.span>
            </a>

            {/* Accent line sweeping along the bottom on hover */}
            <motion.span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-blue-500"
                style={{ scaleX: 0 }}
                variants={{ hover: { scaleX: 1, transition: { duration: 0.35, ease } } }}
            />
        </motion.article>
    );
}

function ArrowButton({ direction, onClick, disabled, reduce }) {
    const isPrev = direction === "prev";
    const Icon = isPrev ? ChevronLeft : ChevronRight;

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            aria-label={isPrev ? "Previous products" : "Next products"}
            whileHover={disabled || reduce ? undefined : { scale: 1.1 }}
            whileTap={disabled || reduce ? undefined : { scale: 0.9 }}
            className="grid size-8 place-items-center rounded-full border border-line bg-white text-ink transition-colors enabled:hover:border-blue-500 enabled:hover:bg-blue-500 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
            <Icon size={16} />
        </motion.button>
    );
}

export default function PopularProducts() {
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
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    };

    return (
        <section id="products" className="pb-14">
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
                            FEATURED PRODUCTS
                        </motion.p>

                        <motion.h2
                            variants={headerItem}
                            className="text-[28px] font-bold tracking-tight text-navy-800"
                        >
                            Popular <span className="text-blue-500">Products</span> Across
                            Applications
                        </motion.h2>
                    </div>

                    <motion.div variants={headerItem} className="flex items-center gap-4">
                        <a
                            href="#products"
                            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600"
                        >
                            View All Products
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

                {/* Carousel track: cards fade up in a staggered wave */}
                <motion.div
                    ref={trackRef}
                    onScroll={updateArrows}
                    className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-0.5 pb-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    variants={trackContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {products.map((p) => (
                        <ProductCard key={p.name} {...p} reduce={reduce} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}