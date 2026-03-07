import { Star, Video, Hospital, CalendarCheck } from "lucide-react";

interface DoctorCardProps {
    name: string;
    specialization: string;
    experience: string;
    rating: number;
    reviewCount?: number;
    specialties: string[];
    avatarColor?: string;
    avatarInitials: string;
}

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
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#e8f5f2] card-hover transition-all duration-300 ease-out hover:scale-105 flex flex-col w-full max-w-[396px]">
            {/* Top card with avatar */}
            <div className="relative bg-gradient-to-br from-[#e8f5f2] to-[#c8ebe3] p-6 pb-16 min-h-[152px]">
                {/* Rating */}
                <div className="flex items-center gap-1 absolute top-5 right-5">
                    <span className="text-2xl font-extrabold text-[#228573]">{rating}</span>
                    <div className="flex flex-col gap-0.5 ml-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={10} className={`${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                        ))}
                    </div>
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
                <button className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#228573] text-white font-semibold text-sm hover:bg-[#065b4b] transition-all duration-200 hover:shadow-md">
                    <CalendarCheck size={16} />
                    Book Appointment
                </button>
            </div>
        </div>
    );
}
