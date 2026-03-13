import SectionHeading from "@/components/ui/section-heading";
import { Users, Activity, Heart } from "lucide-react";

const missions = [
    {
        icon: <Users size={36} className="text-[#228573]" />,
        stat: "10,000+",
        label: "At-Home Clinic\nPatients",
        description: "Trusted by thousands of families for at-home and digital healthcare consultations.",
    },
    {
        icon: <Activity size={36} className="text-[#228573]" />,
        stat: "500+",
        label: "Doctors Onboard\nwith Aushadham",
        description: "Qualified and experienced Ayurveda, MBBS, BAMS and specialist doctors at your service.",
    },
    {
        icon: <Heart size={36} className="text-[#228573]" />,
        stat: "50+",
        label: "Be only From Your\nFamiliar Brands",
        description: "Partner with recognised healthcare brands you can trust for quality and reliability.",
    },
];

export default function MissionSection() {
    return (
        <section id="mission" className="py-20 bg-[#f0faf7] relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute left-0 top-0 w-72 h-72 bg-[#3aa692] rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#228573] rounded-full opacity-5 translate-x-1/2 translate-y-1/2" />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-[92px] relative z-10">
                <div className="mb-14">
                    <SectionHeading title="Our mission" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {missions.map((m) => (
                        <div
                            key={m.stat}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200 border border-[#e8f5f2] flex flex-col items-center text-center gap-4"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#e8f5f2] flex items-center justify-center">
                                {m.icon}
                            </div>
                            <div>
                                <p className="text-4xl font-extrabold text-[#228573]">{m.stat}</p>
                                <p className="text-[#065b4b] font-bold text-[15px] mt-1 whitespace-pre-line leading-snug">
                                    {m.label}
                                </p>
                            </div>
                            <p className="text-[#065b4b]/60 text-sm leading-relaxed">{m.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
