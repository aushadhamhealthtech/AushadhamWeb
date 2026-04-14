import { notFound } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";

const SECTION_TITLES: Record<string, string> = {
  appointments: "Appointments",
  "health-profile": "Health Profile",
  "medical-reports": "Medical Reports",
  prescription: "Prescription",
  "medical-history": "Medical History",
  messages: "Messages",
  settings: "Settings",
  doctors: "Doctors",
  prescriptions: "Prescriptions",
  notifications: "Notifications",
};

export default async function PatientSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const title = SECTION_TITLES[section];

  if (!title) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 lg:ml-20 px-6 py-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8">
          <h1 className="text-3xl font-bold text-[#065b4b]">{title}</h1>
          <p className="mt-3 text-gray-600">
            This is the patient {title.toLowerCase()} screen.
          </p>
        </div>
      </main>
    </div>
  );
}
