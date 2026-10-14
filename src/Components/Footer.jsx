import React, { useState } from 'react';
import {
    ArrowRight,
    MessageSquare,
    PhoneCall,
    ShieldCheck,
    FileText,
    MapPin,
    HelpCircle,
    Phone,
    CheckCircle2,
    X
} from 'lucide-react';

export default function LightingFooter() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleOpenModal = (title) => {
        setModalTitle(title);
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            // Auto close after 2.5 seconds on success
            setTimeout(() => setModalOpen(false), 2000);
        }, 500);
    };

    return (
        <footer className="relative bg-[#051c3c] text-white overflow-hidden font-sans antialiased">
            { }
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_80%_30%,#3b82f6_0%,transparent_50%)]"></div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 bg-cover bg-center pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(59,130,246,0.4) 0%, rgba(5,28,60,1) 70%)' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">

                { }
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Column: Heading and Subtitle */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-0.5 bg-blue-500"></div>
                            <span className="text-xs sm:text-sm font-semibold tracking-widest text-blue-400 uppercase">
                                Let's Work Together
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                            Have a Lighting Requirement?
                        </h2>

                        <p className="text-blue-100/80 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                            Whether you need a single product or lighting for a complete project, our team is ready to help.
                        </p>
                    </div>

                    {/* Right Column: Action Buttons */}
                    <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 items-stretch lg:items-end">

                        {/* Primary Quote Button & Talk to Team button row */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto lg:w-full justify-end">
                            <button
                                onClick={() => handleOpenModal('Get a Project Quote')}
                                className="flex items-center justify-center space-x-2 bg-white text-[#051c3c] hover:bg-blue-50 font-semibold px-6 py-3.5 rounded-lg shadow-lg transition-all duration-200 group transform active:scale-98"
                            >
                                <span>Get a Project Quote</span>
                                <ArrowRight className="w-4 h-4 text-blue-600 transition-transform duration-200 group-hover:translate-x-1" />
                            </button>

                            <button
                                onClick={() => handleOpenModal('Talk to Our Team')}
                                className="flex items-center justify-center space-x-2 bg-transparent hover:bg-white/10 text-white border border-blue-400/40 hover:border-white font-medium px-6 py-3.5 rounded-lg transition-all duration-200 backdrop-blur-sm"
                            >
                                <span>Talk to Our Team</span>
                                <HelpCircle className="w-4 h-4 text-blue-300" />
                            </button>
                        </div>

                        {/* Secondary Contact Bar: WhatsApp and Call Now */}
                        <div className="flex items-center bg-[#07254f]/90 border border-blue-500/30 rounded-lg p-1.5 w-full sm:w-auto lg:w-full justify-between shadow-inner">
                            <a
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-md hover:bg-white/10 transition-colors text-blue-100 font-medium text-sm"
                            >
                                <MessageSquare className="w-4 h-4 text-emerald-400" />
                                <span>WhatsApp Us</span>
                            </a>

                            <div className="w-[1px] h-6 bg-blue-500/30 my-auto"></div>

                            <a
                                href="tel:+18005550199"
                                className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-md hover:bg-white/10 transition-colors text-blue-100 font-medium text-sm"
                            >
                                <PhoneCall className="w-4 h-4 text-blue-400" />
                                <span>Call Now</span>
                            </a>
                        </div>

                    </div>

                </div>

                { }
                <div className="my-12 lg:my-16 border-t border-blue-800/60"></div>

                { }
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">

                    {/* Feature 1 */}
                    <div className="flex items-center space-x-3.5 group">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-blue-400 group-hover:border-blue-400 group-hover:bg-blue-800/50 transition-all duration-200">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide">Quick Response</h4>
                            <p className="text-xs text-blue-300/70 hidden sm:block">Guaranteed fast reply</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-center space-x-3.5 group">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-blue-400 group-hover:border-blue-400 group-hover:bg-blue-800/50 transition-all duration-200">
                            <HelpCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide">Application Guidance</h4>
                            <p className="text-xs text-blue-300/70 hidden sm:block">Expert technical help</p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-center space-x-3.5 group">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-blue-400 group-hover:border-blue-400 group-hover:bg-blue-800/50 transition-all duration-200">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide">Project Support</h4>
                            <p className="text-xs text-blue-300/70 hidden sm:block">End-to-end assistance</p>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex items-center space-x-3.5 group">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-blue-400 group-hover:border-blue-400 group-hover:bg-blue-800/50 transition-all duration-200">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide">Pan India Supply</h4>
                            <p className="text-xs text-blue-300/70 hidden sm:block">Delivery nationwide</p>
                        </div>
                    </div>

                </div>

            </div>

            { }
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#082247] border border-blue-500/30 rounded-2xl max-w-md w-full p-6 sm:p-8 text-white relative shadow-2xl">

                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 text-blue-300 hover:text-white bg-blue-900/40 hover:bg-blue-800/60 p-2 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6">
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950 px-2.5 py-1 rounded-md border border-blue-800">
                                Lighting Inquiry
                            </span>
                            <h3 className="text-2xl font-bold mt-2 text-white">{modalTitle}</h3>
                            <p className="text-sm text-blue-200 mt-1">Fill out the details below and our lighting specialists will get in touch shortly.</p>
                        </div>

                        {submitted ? (
                            <div className="py-8 text-center space-y-3">
                                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold text-white">Request Received!</h4>
                                <p className="text-sm text-blue-200">Thank you. We have received your inquiry and will respond within 2 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-blue-200 mb-1">Your Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full bg-[#04152d] border border-blue-700/60 rounded-lg px-4 py-2.5 text-sm text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-400 transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-blue-200 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="w-full bg-[#04152d] border border-blue-700/60 rounded-lg px-4 py-2.5 text-sm text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-400 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-blue-200 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full bg-[#04152d] border border-blue-700/60 rounded-lg px-4 py-2.5 text-sm text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-400 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-blue-200 mb-1">Project Details / Requirements</label>
                                    <textarea
                                        rows="3"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell us about your lighting needs (indoor, outdoor, commercial, etc.)"
                                        className="w-full bg-[#04152d] border border-blue-700/60 rounded-lg px-4 py-2.5 text-sm text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-colors flex items-center justify-center space-x-2 mt-2"
                                >
                                    <span>Submit Request</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        )}

                    </div>
                </div>
            )}
        </footer>
    );
}