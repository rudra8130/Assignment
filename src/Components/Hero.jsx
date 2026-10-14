import { ArrowRight, Lightbulb, Settings, ShieldCheck, Headset } from "lucide-react";

const features = [
    { icon: Lightbulb, label: "Wide Product Range" },
    { icon: Settings, label: "Application Support" },
    { icon: ShieldCheck, label: "Reliable Performance" },
    { icon: Headset, label: "Technical Assistance" },
];

const heroBg = {
    background:
        "linear-gradient(90deg, rgba(6,20,46,.92) 0%, rgba(6,20,46,.65) 55%, rgba(6,20,46,.25) 100%), url('https://media.istockphoto.com/id/959758208/photo/industrial-warehouse-at-night.jpg?s=612x612&w=0&k=20&c=Zn-qf0nj44wYeH6O85kKmN-C8547G8VsClMcwldt2us=') center / cover no-repeat, linear-gradient(135deg, #06142e, #0a1f4d)",
};

export default function Hero() {
    return (
        <section id="solutions" className="text-white" style={heroBg}>
            <div className="container-x py-12 min-[720px]:py-[72px]">
                <p className="mb-4.5 flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.12em]">
                    <span className="h-px w-5.5 bg-blue-400" />
                    SOLUTIONS
                </p>

                <h1 className="mb-4.5 text-[clamp(32px,5vw,46px)] font-bold leading-[1.1] tracking-tight">
                    Lighting Solutions

                    <br />
                    for <span className="text-blue-400">Every Application</span>
                </h1>

                <p className="mb-7 max-w-[460px] text-sm leading-relaxed text-white/80">
                    From industrial facilities and warehouses to roads, offices and
                    outdoor spaces, explore lighting solutions designed around real-world
                    applications.
                </p>

                <div className="flex flex-wrap gap-3.5">
                    <a href="#our-solutions" className="btn btn-primary">
                        Explore Solutions <ArrowRight size={16} />
                    </a>
                    <a href="#quote" className="btn btn-light">
                        Get a Project Quote <ArrowRight size={16} />
                    </a>
                </div>
            </div>

            {/* Feature strip */}
            <div className="border-t border-white/10 bg-navy-900/85">
                <div className="container-x grid grid-cols-2 gap-4 py-4.5 min-[720px]:grid-cols-4 min-[720px]:justify-between">
                    {features.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2.5 text-xs font-medium">
                            <Icon size={20} strokeWidth={1.6} className="shrink-0 text-blue-400" />
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}