import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, Lightbulb, Settings, ShieldCheck, Headset } from "lucide-react";

const features = [
    { icon: Lightbulb, label: "Wide Product Range" },
    { icon: Settings, label: "Application Support" },
    { icon: ShieldCheck, label: "Reliable Performance" },
    { icon: Headset, label: "Technical Assistance" },
];

const HERO_IMAGE =
    "https://media.istockphoto.com/id/959758208/photo/industrial-warehouse-at-night.jpg?s=612x612&w=0&k=20&c=Zn-qf0nj44wYeH6O85kKmN-C8547G8VsClMcwldt2us=";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
    const sectionRef = useRef(null);
    const reduce = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);


    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
    };
    const item = {
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    };
    const headingLines = {
        hidden: {},
        show: { transition: { staggerChildren: 0.14 } },
    };
    const lineUp = {
        hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
        show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } },
    };

    return (
        <section
            id="solutions"
            ref={sectionRef}
            className="relative overflow-hidden bg-linear-to-br from-navy-900 to-navy-800 text-white"
        >
            {/* Background photo: slow zoom-out on load + parallax on scroll */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 -top-[15%] h-[130%] bg-cover bg-center"
                style={{ backgroundImage: `url('${HERO_IMAGE}')`, y: reduce ? 0 : bgY }}
                initial={{ scale: reduce ? 1 : 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.6, ease }}
            />

            {/* Same dark gradient overlay as before */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,20,46,.92)_0%,rgba(6,20,46,.65)_55%,rgba(6,20,46,.25)_100%)]"
            />

            {!reduce && (
                <>
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-blue-500/20 blur-3xl"
                        animate={{ x: [0, 40, 0], y: [0, 30, 0], opacity: [0.5, 0.9, 0.5] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[10%] top-1/3 size-60 rounded-full bg-blue-400/15 blur-3xl"
                        animate={{ x: [0, -30, 0], y: [0, -25, 0], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                    />
                </>
            )}

            {/* Content */}
            <motion.div
                className="container-x relative z-10 py-12 min-[720px]:py-[72px]"
                style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
            >
                <motion.div variants={container} initial="hidden" animate="show">
                    <motion.p
                        variants={item}
                        className="mb-4.5 flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.12em]"
                    >
                        <motion.span
                            className="h-px w-5.5 origin-left bg-blue-400"
                            variants={{
                                hidden: { scaleX: 0 },
                                show: { scaleX: 1, transition: { duration: 0.6, ease } },
                            }}
                        />
                        SOLUTIONS
                    </motion.p>

                    <motion.h1
                        variants={headingLines}
                        className="mb-4.5 text-[clamp(32px,5vw,46px)] font-bold leading-[1.1] tracking-tight"
                    >
                        <span className="block overflow-hidden pb-1">
                            <motion.span variants={lineUp} className="block">
                                Lighting Solutions
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden pb-1">
                            <motion.span variants={lineUp} className="block">
                                for <span className="text-blue-400">Every Application</span>
                            </motion.span>
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="mb-7 max-w-[460px] text-sm leading-relaxed text-white/80"
                    >
                        From industrial facilities and warehouses to roads, offices and
                        outdoor spaces, explore lighting solutions designed around real-world
                        applications.
                    </motion.p>

                    <motion.div variants={item} className="flex flex-wrap gap-3.5">
                        <motion.a
                            href="#our-solutions"
                            className="btn btn-primary group"
                            whileHover={{
                                y: -2,
                                boxShadow: "0 12px 28px -10px rgba(37,99,235,.8)",
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Explore Solutions
                            <ArrowRight
                                size={16}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </motion.a>

                        <motion.a
                            href="#quote"
                            className="btn btn-light group"
                            whileHover={{
                                y: -2,
                                boxShadow: "0 12px 28px -12px rgba(255,255,255,.5)",
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Get a Project Quote
                            <ArrowRight
                                size={16}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </motion.a>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Feature strip */}
            <motion.div
                className="relative z-10 overflow-hidden border-t border-white/10 bg-navy-900/85 backdrop-blur-sm"
                initial={{ opacity: 0, y: reduce ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease }}
            >
                {/* Light sweep along the top edge */}
                {!reduce && (
                    <motion.span
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-px w-1/3 bg-linear-to-r from-transparent via-blue-400 to-transparent"
                        animate={{ x: ["-100%", "300%"] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    />
                )}

                <motion.div
                    className="container-x grid grid-cols-2 gap-4 py-4.5 min-[720px]:grid-cols-4 min-[720px]:justify-between"
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } },
                    }}
                >
                    {features.map(({ icon: Icon, label }) => (
                        <motion.div
                            key={label}
                            variants={item}
                            whileHover={reduce ? undefined : { x: 4 }}
                            className="flex cursor-default items-center gap-2.5 text-xs font-medium"
                        >
                            <motion.span
                                className="shrink-0 text-blue-400"
                                whileHover={reduce ? undefined : { scale: 1.2, rotate: -8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                <Icon size={20} strokeWidth={1.6} />
                            </motion.span>
                            <span>{label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}