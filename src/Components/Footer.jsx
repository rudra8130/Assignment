import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
    ArrowRight,
    MessageSquare,
    PhoneCall,
    Zap,
    FileText,
    MapPin,
    HelpCircle,
    CheckCircle2,
    Loader2,
    X,
} from "lucide-react";

const features = [
    { icon: Zap, title: "Quick Response", text: "Guaranteed fast reply" },
    { icon: HelpCircle, title: "Application Guidance", text: "Expert technical help" },
    { icon: FileText, title: "Project Support", text: "End-to-end assistance" },
    { icon: MapPin, title: "Pan India Supply", text: "Delivery nationwide" },
];

const ease = [0.22, 1, 0.36, 1];
const CLOSE_DELAY = 2200; // ms the success message stays before the modal closes
const emptyForm = { name: "", email: "", phone: "", message: "" };

const inputCls =
    "w-full rounded-lg border border-blue-700/60 bg-[#04152d] px-4 py-2.5 text-sm text-white placeholder-blue-400/50 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

export default function Footer() {
    const reduce = useReducedMotion();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [formData, setFormData] = useState(emptyForm);
    const [status, setStatus] = useState("idle"); // idle | submitting | success

    const timers = useRef([]);
    const triggerRef = useRef(null);

    const clearTimers = useCallback(() => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    }, []);

    // Clear any pending timers if the component unmounts
    useEffect(() => clearTimers, [clearTimers]);

    const openModal = (title) => {
        triggerRef.current = document.activeElement; // restore focus here on close
        setModalTitle(title);
        setStatus("idle");
        setFormData(emptyForm);
        setModalOpen(true);
    };

    const closeModal = useCallback(() => {
        clearTimers();
        setModalOpen(false);
        triggerRef.current?.focus?.();
    }, [clearTimers]);

    // While the modal is open: Escape closes it and the page behind doesn't scroll
    useEffect(() => {
        if (!modalOpen) return;
        const onKey = (e) => e.key === "Escape" && closeModal();
        window.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [modalOpen, closeModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (status !== "idle") return;
        setStatus("submitting");

        // TODO: replace this timeout with a real request to your API / email service
        timers.current.push(
            setTimeout(() => {
                setStatus("success");
                timers.current.push(setTimeout(closeModal, CLOSE_DELAY));
            }, 900)
        );
    };

    const setField = (key) => (e) => setFormData((f) => ({ ...f, [key]: e.target.value }));

    // Shared variants
    const stagger = (gap = 0.1, delay = 0) => ({
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
    });
    const fadeUp = {
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
    };
    const featureItem = {
        hidden: { opacity: 0, y: reduce ? 0 : 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
        hover: { y: reduce ? 0 : -3, transition: { duration: 0.2, ease } },
    };

    return (
        <footer
            id="contact"
            className="relative overflow-hidden bg-[#051c3c] text-white antialiased"
        >
            {/* Background glows (same look as before, now slowly drifting) */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,#3b82f6_0%,transparent_50%)] opacity-15" />
            <div
                className="pointer-events-none absolute bottom-0 right-0 h-full w-1/2 bg-cover bg-center opacity-10"
                style={{
                    backgroundImage:
                        "radial-gradient(ellipse at center, rgba(59,130,246,0.4) 0%, rgba(5,28,60,1) 70%)",
                }}
            />
            {!reduce && (
                <>
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-24 top-8 size-72 rounded-full bg-blue-500/15 blur-3xl"
                        animate={{ x: [0, 40, 0], y: [0, 25, 0], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-20 right-[20%] size-64 rounded-full bg-blue-400/15 blur-3xl"
                        animate={{ x: [0, -35, 0], y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                </>
            )}

            <div className="container-x relative z-10 py-16 lg:py-20">
                {/* CTA row */}
                <motion.div
                    id="quote"
                    className="grid scroll-mt-20 grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
                    variants={stagger(0.12)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Left: heading */}
                    <div className="space-y-4 lg:col-span-7">
                        <motion.div variants={fadeUp} className="flex items-center gap-3">
                            <motion.span
                                className="h-0.5 w-8 origin-left bg-blue-500"
                                variants={{
                                    hidden: { scaleX: 0 },
                                    show: { scaleX: 1, transition: { duration: 0.6, ease } },
                                }}
                            />
                            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 sm:text-sm">
                                Let's Work Together
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={fadeUp}
                            className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                        >
                            Have a Lighting Requirement?
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="max-w-2xl text-base font-normal leading-relaxed text-blue-100/80 sm:text-lg"
                        >
                            Whether you need a single product or lighting for a complete
                            project, our team is ready to help.
                        </motion.p>
                    </div>

                    {/* Right: buttons */}
                    <div className="flex flex-col items-stretch gap-4 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end">
                        <motion.div
                            variants={fadeUp}
                            className="flex w-full flex-col justify-end gap-3 sm:w-auto sm:flex-row lg:w-full"
                        >
                            <motion.button
                                onClick={() => openModal("Get a Project Quote")}
                                className="group flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-[#051c3c] shadow-lg transition-colors hover:bg-blue-50"
                                whileHover={{
                                    y: reduce ? 0 : -2,
                                    boxShadow: "0 14px 30px -12px rgba(255,255,255,.45)",
                                }}
                                whileTap={reduce ? undefined : { scale: 0.97 }}
                            >
                                <span>Get a Project Quote</span>
                                <ArrowRight className="size-4 text-blue-600 transition-transform duration-200 group-hover:translate-x-1" />
                            </motion.button>

                            <motion.button
                                onClick={() => openModal("Talk to Our Team")}
                                className="group flex items-center justify-center gap-2 rounded-lg border border-blue-400/40 bg-transparent px-6 py-3.5 font-medium text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
                                whileHover={reduce ? undefined : { y: -2 }}
                                whileTap={reduce ? undefined : { scale: 0.97 }}
                            >
                                <span>Talk to Our Team</span>
                                <HelpCircle className="size-4 text-blue-300 transition-transform duration-300 group-hover:rotate-12" />
                            </motion.button>
                        </motion.div>

                        {/* WhatsApp + Call bar */}
                        <motion.div
                            variants={fadeUp}
                            className="flex w-full items-center justify-between rounded-lg border border-blue-500/30 bg-[#07254f]/90 p-1.5 shadow-inner sm:w-auto lg:w-full"
                        >
                            {/* Replace with your number, e.g. https://wa.me/919876543210 */}
                            <a
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-blue-100 transition-colors hover:bg-white/10"
                            >
                                <MessageSquare className="size-4 text-emerald-400 transition-transform duration-200 group-hover:scale-125" />
                                <span>WhatsApp Us</span>
                            </a>

                            <div className="my-auto h-6 w-px bg-blue-500/30" />

                            {/* Replace with your real phone number */}
                            <a
                                href="tel:+18005550199"
                                className="group flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-blue-100 transition-colors hover:bg-white/10"
                            >
                                <PhoneCall className="size-4 text-blue-400 transition-transform duration-200 group-hover:scale-125 group-hover:-rotate-12" />
                                <span>Call Now</span>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Divider draws itself */}
                <motion.div
                    aria-hidden="true"
                    className="my-12 origin-left border-t border-blue-800/60 lg:my-16"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease }}
                />

                {/* Feature strip */}
                <motion.div
                    className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8"
                    variants={stagger(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    {features.map(({ icon: Icon, title, text }) => (
                        <motion.div
                            key={title}
                            variants={featureItem}
                            whileHover="hover"
                            className="group flex cursor-default items-center gap-3.5"
                        >
                            <motion.div
                                className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-blue-700/50 bg-blue-900/50 text-blue-400 transition-colors duration-200 group-hover:border-blue-400 group-hover:bg-blue-800/50"
                                variants={{
                                    hover: {
                                        scale: reduce ? 1 : 1.1,
                                        rotate: reduce ? 0 : -6,
                                        transition: { type: "spring", stiffness: 300, damping: 14 },
                                    },
                                }}
                            >
                                <Icon className="size-5" />
                            </motion.div>
                            <div>
                                <h4 className="text-sm font-semibold tracking-wide text-white sm:text-base">
                                    {title}
                                </h4>
                                <p className="hidden text-xs text-blue-300/70 sm:block">{text}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Inquiry modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onMouseDown={(e) => e.target === e.currentTarget && closeModal()}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="inquiry-title"
                            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-blue-500/30 bg-[#082247] p-6 text-white shadow-2xl sm:p-8"
                            initial={{ opacity: 0, y: reduce ? 0 : 28, scale: reduce ? 1 : 0.95 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: { type: "spring", stiffness: 280, damping: 24 },
                            }}
                            exit={{
                                opacity: 0,
                                y: reduce ? 0 : 14,
                                scale: reduce ? 1 : 0.97,
                                transition: { duration: 0.18 },
                            }}
                        >
                            <motion.button
                                onClick={closeModal}
                                aria-label="Close"
                                className="absolute right-4 top-4 rounded-full bg-blue-900/40 p-2 text-blue-300 transition-colors hover:bg-blue-800/60 hover:text-white"
                                whileHover={reduce ? undefined : { rotate: 90 }}
                                whileTap={reduce ? undefined : { scale: 0.9 }}
                            >
                                <X className="size-5" />
                            </motion.button>

                            <div className="mb-6">
                                <span className="rounded-md border border-blue-800 bg-blue-950 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
                                    Lighting Inquiry
                                </span>
                                <h3 id="inquiry-title" className="mt-2 text-2xl font-bold text-white">
                                    {modalTitle}
                                </h3>
                                <p className="mt-1 text-sm text-blue-200">
                                    Fill out the details below and our lighting specialists will
                                    get in touch shortly.
                                </p>
                            </div>

                            <AnimatePresence mode="wait" initial={false}>
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        className="space-y-3 py-8 text-center"
                                        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        role="status"
                                    >
                                        <motion.div
                                            className="mx-auto flex size-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/20 text-emerald-400"
                                            initial={{ scale: reduce ? 1 : 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                                        >
                                            <CheckCircle2 className="size-8" />
                                        </motion.div>
                                        <h4 className="text-xl font-bold text-white">Request Received!</h4>
                                        <p className="text-sm text-blue-200">
                                            Thank you. We have received your inquiry and will respond
                                            within 2 hours.
                                        </p>

                                        {/* Shows how long until the modal closes itself */}
                                        <div className="mx-auto mt-4 h-0.5 w-32 overflow-hidden rounded-full bg-blue-900">
                                            <motion.div
                                                className="h-full origin-left bg-emerald-400"
                                                initial={{ scaleX: 1 }}
                                                animate={{ scaleX: 0 }}
                                                transition={{ duration: CLOSE_DELAY / 1000, ease: "linear" }}
                                            />
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                        variants={stagger(0.06, 0.1)}
                                        initial="hidden"
                                        animate="show"
                                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                    >
                                        <motion.div variants={fadeUp}>
                                            <label htmlFor="inq-name" className="mb-1 block text-xs font-medium text-blue-200">
                                                Your Full Name
                                            </label>
                                            <input
                                                id="inq-name"
                                                type="text"
                                                required
                                                autoFocus
                                                autoComplete="name"
                                                value={formData.name}
                                                onChange={setField("name")}
                                                placeholder="John Doe"
                                                className={inputCls}
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="inq-email" className="mb-1 block text-xs font-medium text-blue-200">
                                                    Email Address
                                                </label>
                                                <input
                                                    id="inq-email"
                                                    type="email"
                                                    required
                                                    autoComplete="email"
                                                    value={formData.email}
                                                    onChange={setField("email")}
                                                    placeholder="john@example.com"
                                                    className={inputCls}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="inq-phone" className="mb-1 block text-xs font-medium text-blue-200">
                                                    Phone Number
                                                </label>
                                                <input
                                                    id="inq-phone"
                                                    type="tel"
                                                    required
                                                    autoComplete="tel"
                                                    value={formData.phone}
                                                    onChange={setField("phone")}
                                                    placeholder="+91 98765 43210"
                                                    className={inputCls}
                                                />
                                            </div>
                                        </motion.div>

                                        <motion.div variants={fadeUp}>
                                            <label htmlFor="inq-message" className="mb-1 block text-xs font-medium text-blue-200">
                                                Project Details / Requirements
                                            </label>
                                            <textarea
                                                id="inq-message"
                                                rows={3}
                                                value={formData.message}
                                                onChange={setField("message")}
                                                placeholder="Tell us about your lighting needs (indoor, outdoor, commercial, etc.)"
                                                className={`${inputCls} resize-none`}
                                            />
                                        </motion.div>

                                        <motion.button
                                            variants={fadeUp}
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg transition-colors enabled:hover:bg-blue-500 disabled:cursor-wait disabled:opacity-80"
                                            whileHover={status === "submitting" || reduce ? undefined : { y: -2 }}
                                            whileTap={status === "submitting" || reduce ? undefined : { scale: 0.98 }}
                                        >
                                            {status === "submitting" ? (
                                                <>
                                                    <Loader2 className="size-4 animate-spin" />
                                                    <span>Sending…</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Submit Request</span>
                                                    <ArrowRight className="size-4" />
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </footer>
    );
}