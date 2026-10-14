import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export default function HelpBanner() {
    const reduce = useReducedMotion();

    // Banner fades up first, then its children follow one after another
    const banner = {
        hidden: { opacity: 0, y: reduce ? 0 : 32, scale: reduce ? 1 : 0.98 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.7, ease, when: "beforeChildren", staggerChildren: 0.12 },
        },
    };
    const fadeUp = {
        hidden: { opacity: 0, y: reduce ? 0 : 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
    };
    const engineer = {
        hidden: { opacity: 0, x: reduce ? 0 : 60 },
        show: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 90, damping: 18, delay: 0.25 },
        },
    };

    return (
        <section className="pb-14">
            <div className="container-x">
                <motion.div
                    className="relative overflow-hidden rounded-xl border border-blue-500/10 bg-linear-to-r from-blue-50 via-blue-50 to-[#dbe7ff]"
                    variants={banner}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                >
                    {/* Soft glow behind the engineer */}
                    {!reduce && (
                        <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-10 right-[8%] hidden size-64 rounded-full bg-blue-400/25 blur-3xl min-[720px]:block"
                            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    )}

                    {/* One-time light sweep across the banner after it appears */}
                    {!reduce && (
                        <motion.span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-white/60 to-transparent"
                            initial={{ x: "-150%" }}
                            whileInView={{ x: "500%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, delay: 0.7, ease: "easeInOut" }}
                        />
                    )}

                    {/* Text + button */}
                    <div className="relative z-10 max-w-xl px-6 py-9 min-[900px]:px-10">
                        <motion.h2 variants={fadeUp} className="text-xl font-bold text-navy-800">
                            Need Help Choosing the Right Solution?
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="mt-2 text-[13px] leading-relaxed text-muted"
                        >
                            Tell us about your application and our team will help you find the
                            most suitable lighting products for your requirement.
                        </motion.p>

                        <motion.a
                            variants={fadeUp}
                            href="#quote"
                            className="btn btn-primary btn-sm group relative mt-5 overflow-hidden px-5! py-2.5!"
                            whileHover={{
                                y: reduce ? 0 : -2,
                                boxShadow: "0 12px 26px -10px rgba(37,99,235,.75)",
                            }}
                            whileTap={reduce ? undefined : { scale: 0.97 }}
                        >
                            Request Product Recommendation
                            <ArrowRight
                                size={14}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </motion.a>
                    </div>

                    {/* Engineer slides in from the right, then gently floats */}
                    <motion.div
                        variants={engineer}
                        aria-hidden="true"
                        className="absolute inset-y-0 right-0 hidden w-1/2 min-[720px]:block"
                    >
                        <motion.div
                            className="h-full w-full bg-contain bg-right-bottom bg-no-repeat"
                            style={{ backgroundImage: "url('/images/engineer.png')" }}
                            animate={reduce ? undefined : { y: [0, -6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}