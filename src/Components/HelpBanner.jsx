import { ArrowRight } from "lucide-react";

export default function HelpBanner() {
    return (
        <section className="pb-14">
            <div className="container-x">
                <div className="relative overflow-hidden rounded-xl border border-blue-500/10 bg-linear-to-r from-blue-50 via-blue-50 to-[#dbe7ff]">
                    <div className="relative z-10 max-w-xl px-6 py-9 min-[900px]:px-10">
                        <h2 className="text-xl font-bold text-navy-800">
                            Need Help Choosing the Right Solution?
                        </h2>
                        <p className="mt-2 text-[13px] leading-relaxed text-muted">
                            Tell us about your application and our team will help you find the
                            most suitable lighting products for your requirement.
                        </p>
                        <a href="#quote" className="btn btn-primary btn-sm mt-5 !px-5 !py-2.5">
                            Request Product Recommendation <ArrowRight size={14} />
                        </a>
                    </div>

                    <div
                        className="absolute inset-y-0 right-0 hidden w-1/2 bg-contain bg-right-bottom bg-no-repeat min-[720px]:block"
                        style={{ backgroundImage: "url('/images/engineer.png')" }}
                        aria-hidden="true"
                    />
                </div>
            </div>
        </section>
    );
}