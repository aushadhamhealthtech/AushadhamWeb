import SectionHeading from "@/components/ui/section-heading";
import DoctorCard from "@/components/cards/doctor-card";
import { getDoctors } from "@/lib/data/doctors";

export default async function ExpertsSection() {
    const doctors = await getDoctors();

    return (
        <section id="experts" className="py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[92px]">
                <div className="mb-14">
                    <SectionHeading title="Meet our experts" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {doctors.map((doc) => (
                        <div key={doc.id} className="reveal-item w-full flex justify-center">
                            <DoctorCard {...doc} />
                        </div>
                    ))}
                </div>

                {/* View all CTA */}
                <div className="flex justify-center mt-12">
                    <button className="px-10 py-3.5 rounded-full border-2 border-[#228573] text-[#228573] font-semibold text-base hover:bg-[#228573] hover:text-white transition-all duration-200">
                        View All Doctors
                    </button>
                </div>
            </div>
        </section>
    );
}
