import { Gem, Settings, ShieldCheck, Users, FileText } from "lucide-react";

const reasons = [
    {
        icon: Gem,
        title: "Quality Products",
        text: "Tested and reliable lighting solutions.",
    },
    {
        icon: Settings,
        title: "Wide Range",
        text: "For indoor, outdoor and specialized applications.",
    },
    {
        icon: ShieldCheck,
        title: "Warranty Support",
        text: "Product warranty (terms applicable).",
    },
    {
        icon: Users,
        title: "Technical Assistance",
        text: "Application guidance and after-sales support.",
    },
    {
        icon: FileText,
        title: "Project Support",
        text: "Support for large and custom requirements.",
    },
];

const bg = {
    background:
        "linear-gradient(90deg, rgba(6,20,46,.96) 0%, rgba(6,20,46,.85) 55%, rgba(6,20,46,.6) 100%), url('/images/why-bg.jpg') center / cover no-repeat, linear-gradient(135deg, #06142e, #0a1f4d)",
};

export default function WhyChoose() {
    return (
        <section id="about" className="py-14 text-white" style={bg}>
            <div className="container-x">
                <h2 className="text-[28px] font-bold tracking-tight">
                    Why Choose <span className="text-blue-400">Vajra LED</span>
                </h2>
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/75">
                    Reliable products, application support and a customer-first approach
                    for your lighting projects.
                </p>

                <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-8 min-[720px]:grid-cols-3 lg:grid-cols-5">
                    {reasons.map(({ icon: Icon, title, text }) => (
                        <div key={title}>
                            <span className="grid size-11 place-items-center rounded-full border border-blue-400/70 text-white">
                                <Icon size={20} strokeWidth={1.5} />
                            </span>
                            <h3 className="mt-4 text-[13px] font-semibold">{title}</h3>
                            <p className="mt-1.5 max-w-[190px] text-[11px] leading-snug text-white/70">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}