"use client";

import { Star, Video, Hospital, CalendarCheck } from "lucide-react";
import { Doctor } from "@/lib/data/doctors";

type DoctorCardProps = Omit<Doctor, "id">;

export default function DoctorCard({
    name,
    specialization,
    experience,
    rating,
    reviewCount,
    specialties,
    avatarColor = "#228573",
    avatarInitials,
}: DoctorCardProps) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`View profile of ${name}`}
            className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#e8f5f2] transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-xl flex flex-col w-full max-w-[396px] cursor-pointer">
            {/* Top card with avatar */}
            <div className="relative bg-gradient-to-br from-[#e8f5f2] to-[#c8ebe3] p-6 pb-16 min-h-[152px]">
                {/* Rating */}
                <div className="flex items-center gap-1.5 absolute top-5 right-5">
                    <span className="text-xl font-extrabold text-[#228573]">{rating}</span>
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const cls = i < fullStars
                                ? "fill-amber-400 text-amber-400"
                                : i === fullStars && hasHalf
                                ? "fill-amber-200 text-amber-400"
                                : "fill-gray-200 text-gray-200";
                            return <Star key={i} size={13} className={cls} />;
                        })}
                    </div>
                    {reviewCount && (
                        <span className="text-[11px] text-[#065b4b]/50 font-medium">({reviewCount})</span>
                    )}
                </div>

                {/* Experience & availability */}
                <div className="absolute bottom-4 right-5 flex flex-col gap-1 text-right">
                    <span className="text-xs text-[#065b4b]/60 font-medium">{experience}</span>
                    <div className="flex items-center gap-1 text-xs text-[#228573] font-semibold">
                        <Video size={12} />
                        <span>Online</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#228573] font-semibold">
                        <Hospital size={12} />
                        <span>In-clinic</span>
                    </div>
                </div>

                {/* Avatar */}
                <div
                    className="absolute -bottom-10 left-8 w-20 h-20 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xl font-bold"
                    style={{ backgroundColor: avatarColor }}
                >
                    {avatarInitials}
                </div>
            </div>

            {/* Info section */}
            <div className="pt-14 px-6 pb-6 flex flex-col gap-4 flex-1">
                <div>
                    <h3 className="text-[#065b4b] font-bold text-[17px]">{name}</h3>
                    <p className="text-[#065b4b]/60 text-sm">{specialization}</p>
                </div>

                {/* Specialty chips */}
                <div className="flex flex-wrap gap-2">
                    {specialties.map((s) => (
                        <span
                            key={s}
                            className="px-3 py-1 bg-[#e8f5f2] text-[#228573] text-xs font-semibold rounded-full border border-[#c8ebe3] whitespace-nowrap"
                        >
                            {s}
                        </span>
                    ))}
                </div>

                {/* Book button */}
                <button className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#228573] text-white font-semibold text-sm hover:bg-[#065b4b] hover:scale-[1.02] transition-all duration-200 hover:shadow-md">
                    <CalendarCheck size={16} />
                    Book Appointment
                </button>
            </div>
        </div>
    );
}
