import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
    { title: "Warehouse project", image: "warehouse.jpg" },
    { title: "Industrial facility", image: "industrial.jpg" },
    { title: "Highway street lighting", image: "highway.jpg" },
    { title: "Commercial office", image: "office.jpg" },
    { title: "Petrol pump canopy", image: "petrol-pump.jpg" },
];

export default function Projects() {
    const trackRef = useRef(null);

    const scroll = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
    };

    return (
        <section id="projects" className="py-14">
            <div className="container-x">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.12em] text-blue-500">
                            <span className="h-px w-5 bg-blue-500" />
                            OUR PROJECTS
                        </p>
                        <h2 className="text-[28px] font-bold tracking-tight text-navy-800">
                            Real-World <span className="text-blue-500">Lighting Projects</span>
                        </h2>
                        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
                            Explore how Vajra LED products are used across industrial,
                            commercial and outdoor spaces.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600"
                        >
                            View All Projects <ArrowRight size={14} />
                        </a>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll(-1)}
                                aria-label="Previous projects"
                                className="grid size-8 place-items-center rounded-full border border-line bg-white text-ink hover:border-blue-400 hover:text-blue-500"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => scroll(1)}
                                aria-label="Next projects"
                                className="grid size-8 place-items-center rounded-full border border-line bg-white text-ink hover:border-blue-400 hover:text-blue-500"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {projects.map(({ title, image }) => (
                        <div
                            key={title}
                            role="img"
                            aria-label={title}
                            className="h-36 w-[70%] shrink-0 snap-start rounded-md bg-cover bg-center sm:w-[45%] min-[900px]:w-[31%] xl:w-[calc((100%-64px)/5)]"
                            style={{
                                backgroundImage: `url('/images/projects/${image}'), linear-gradient(135deg, #0a1f4d, #1d4ed8)`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}