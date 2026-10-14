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

function SolutionCard({ icon: Icon, title, text, image }) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-shadow hover:shadow-lg">

            <div
                className="h-32 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/images/solutions/${image}'), linear-gradient(135deg, #0a1f4d, #1d4ed8)`,
                }}
                role="img"
                aria-label={title}
            />

            <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-navy-800">
                        <Icon size={18} strokeWidth={1.7} />
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
                    <ArrowRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5"
                    />
                </a>
            </div>
        </article>
    );
}

export default function Solutions() {
    return (
        <section id="our-solutions" className="py-14">
            <div className="container-x">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.12em] text-blue-500">
                            <span className="h-px w-5 bg-blue-500" />
                            OUR SOLUTIONS
                        </p>
                        <h2 className="text-[28px] font-bold tracking-tight text-navy-800">
                            Find the Right <span className="text-blue-500">Lighting Solution</span>
                        </h2>
                        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
                            Every space has different lighting requirements. Explore our
                            application-based solutions to find suitable products for your
                            project.
                        </p>
                    </div>

                    <a
                        href="#solutions"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600"
                    >
                        View All Solutions <ArrowRight size={14} />
                    </a>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {solutions.map((s) => (
                        <SolutionCard key={s.title} {...s} />
                    ))}
                </div>
            </div>
        </section>
    );
}