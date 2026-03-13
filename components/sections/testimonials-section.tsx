import SectionHeading from "@/components/ui/section-heading";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Patient",
        rating: 5,
        text: "Aushadham has been a game changer for my family. Booking appointments is so easy, and the doctors are incredibly knowledgeable. The Ayurveda consultation helped me manage my chronic condition naturally.",
        avatar: "PS",
        color: "#228573",
    },
    {
        name: "Rahul Mehta",
        role: "Patient",
        rating: 5,
        text: "I was skeptical about online consultations but my experience with Aushadham was amazing. The doctor reviewed all my uploaded reports beforehand and gave me a very detailed, personalized treatment plan.",
        avatar: "RM",
        color: "#3aa692",
    },
    {
        name: "Anjali Patel",
        role: "Patient",
        rating: 5,
        text: "The subscription plan is excellent value. I get unlimited consultations and can upload all my lab reports. My doctor follows up regularly. I feel so well taken care of!",
        avatar: "AP",
        color: "#065b4b",
    },
    {
        name: "Suresh Kumar",
        role: "Patient",
        rating: 5,
        text: "Finding an Ayurveda specialist near me was impossible until I found Aushadham. Now I consult with the best doctors from home. My digestion and energy levels have improved significantly.",
        avatar: "SK",
        color: "#228573",
    },
];

function StarRating({ count }: { count: number }) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
        </div>
    );
}

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-20 bg-[#f0faf7] relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#3aa692] opacity-5" />
            <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-[#228573] opacity-5" />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-[92px] relative z-10">
                <div className="mb-14">
                    <SectionHeading title="Patient testimonials" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="reveal-item bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-[#e8f5f2] flex flex-col gap-4 transition-all duration-300 ease-out"
                        >
                            {/* Quote icon */}
                            <Quote size={24} className="text-[#3aa692] opacity-60" />

                            {/* Stars */}
                            <StarRating count={t.rating} />

                            {/* Text */}
                            <p className="text-[#065b4b]/70 text-sm leading-relaxed flex-1">{t.text}</p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-2 border-t border-[#e8f5f2]">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                    style={{ backgroundColor: t.color }}
                                >
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="text-[#065b4b] font-bold text-[14px]">{t.name}</p>
                                    <p className="text-[#065b4b]/50 text-[12px]">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
