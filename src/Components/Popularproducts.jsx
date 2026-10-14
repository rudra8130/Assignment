import { useRef, useState } from "react";
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

function ProductCard({ name, text, image }) {
    const [failed, setFailed] = useState(false);

    return (
        <article className="group flex w-[72%] shrink-0 snap-start flex-col rounded-lg border border-line bg-white p-4 transition-shadow hover:shadow-lg sm:w-[44%] min-[900px]:w-[31%] xl:w-[calc((100%-100px)/6)]">
            <div className="mb-4 grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-md bg-slate-50 p-3">
                {failed ? (
                    <Lightbulb size={36} strokeWidth={1.2} className="text-slate-300" />
                ) : (
                    <img
                        src={`/images/products/${image}`}
                        alt={name}
                        loading="lazy"
                        onError={() => setFailed(true)}
                        className="h-full w-full object-contain"
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
                <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5"
                />
            </a>
        </article>
    );
}

export default function PopularProducts() {
    const trackRef = useRef(null);

    const scroll = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
    };

    return (
        <section id="products" className="pb-14">
            <div className="container-x">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.12em] text-blue-500">
                            <span className="h-px w-5 bg-blue-500" />
                            FEATURED PRODUCTS
                        </p>
                        <h2 className="text-[28px] font-bold tracking-tight text-navy-800">
                            Popular <span className="text-blue-500">Products</span> Across
                            Applications
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="#products"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600"
                        >
                            View All Products <ArrowRight size={14} />
                        </a>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll(-1)}
                                aria-label="Previous products"
                                className="grid size-8 place-items-center rounded-full border border-line bg-white text-ink hover:border-blue-400 hover:text-blue-500"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => scroll(1)}
                                aria-label="Next products"
                                className="grid size-8 place-items-center rounded-full border border-line bg-white text-ink hover:border-blue-400 hover:text-blue-500"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {products.map((p) => (
                        <ProductCard key={p.name} {...p} />
                    ))}
                </div>
            </div>
        </section>
    );
}