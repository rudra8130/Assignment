import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
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

const ease = [0.22, 1, 0.36, 1];

export default function WhyChoose() {
    const sectionRef = useRef(null);
    const reduce = useReducedMotion();

    // Background photo drifts slowly while the section scrolls through the viewport
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    const headerContainer = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
    };
    const headerItem = {
        hidden: { opacity: 0, y: reduce ? 0 : 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
    };
    const gridContainer = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: reduce ? 0 : 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
        hover: { y: reduce ? 0 : -4, transition: { duration: 0.25, ease } },
    };
    const circleVariants = {
        hidden: { scale: reduce ? 1 : 0.5, opacity: 0 },
        show: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 260, damping: 16 },
        },
        hover: {
            scale: reduce ? 1 : 1.1,
            boxShadow: "0 0 28px rgba(59,130,246,.55)",
            transition: { type: "spring", stiffness: 300, damping: 15 },
        },
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative overflow-hidden bg-linear-to-br from-navy-900 to-navy-800 py-14 text-white"
        >
            {/* Optional photo (public/images/why-bg.jpg) with slow parallax */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 -top-[10%] h-[120%] bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/why-bg.jpg')",
                    y: reduce ? 0 : bgY,
                }}
            />

            {/* Same dark overlay as before */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,20,46,.96)_0%,rgba(6,20,46,.85)_55%,rgba(6,20,46,.6)_100%)]"
            />

            {/* Ambient glow orbs */}
            {!reduce && (
                <>
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-20 -top-16 size-80 rounded-full bg-blue-500/20 blur-3xl"
                        animate={{ x: [0, -40, 0], y: [0, 30, 0], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-24 left-[15%] size-72 rounded-full bg-blue-400/15 blur-3xl"
                        animate={{ x: [0, 35, 0], y: [0, -25, 0], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                </>
            )}

            <div className="container-x relative z-10">
                {/* Header */}
                <motion.div
                    variants={headerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.h2
                        variants={headerItem}
                        className="text-[28px] font-bold tracking-tight"
                    >
                        Why Choose <span className="text-blue-400">Vajra LED</span>
                    </motion.h2>
                    <motion.p
                        variants={headerItem}
                        className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/75"
                    >
                        Reliable products, application support and a customer-first approach
                        for your lighting projects.
                    </motion.p>
                </motion.div>

                {/* Features */}
                <motion.div
                    className="mt-9 grid grid-cols-2 gap-x-6 gap-y-8 min-[720px]:grid-cols-3 lg:grid-cols-5"
                    variants={gridContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    {reasons.map(({ icon: Icon, title, text }) => (
                        <motion.div
                            key={title}
                            variants={itemVariants}
                            whileHover="hover"
                            className="group cursor-default"
                        >
                            <div className="relative size-11">
                                {/* Ping ring on hover */}
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-full border border-blue-400/70 opacity-0 group-hover:animate-ping group-hover:opacity-60 motion-reduce:animate-none"
                                />
                                <motion.span
                                    variants={circleVariants}
                                    className="relative grid size-11 place-items-center rounded-full border border-blue-400/70 text-white transition-colors duration-300 group-hover:border-blue-400 group-hover:bg-blue-500"
                                >
                                    <Icon size={20} strokeWidth={1.5} />
                                </motion.span>
                            </div>

                            <h3 className="mt-4 text-[13px] font-semibold">{title}</h3>
                            <p className="mt-1.5 max-w-[190px] text-[11px] leading-snug text-white/70 transition-colors duration-300 group-hover:text-white/90">
                                {text}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}