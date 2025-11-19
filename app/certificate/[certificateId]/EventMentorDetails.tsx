import { format } from "date-fns";
import Image from "next/image";

interface EventMentorDetailsProps {
  certificateDetails: {
    courseName: string;
    completionDate: string;
    signatures: Array<{
      name: string;
      title: string;
    }>;
  };
  eventData: {
    startDate: string | Date;
    endDate: string | Date;
    mentors?: Array<{
      fullName: string;
      role: string;
      image?: {
        url: string;
      };
    }>;
  };
}

export default function EventMentorDetails({
  certificateDetails,
  eventData,
}: EventMentorDetailsProps) {
  return (
    <div className="pb-20 px-4 md:px-8 bg-slate-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Workshop Info Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-slate-900">Workshop Details</h4>
            </div>

            <h5 className="font-semibold text-slate-900 mb-3 text-lg">
              {certificateDetails.courseName}
            </h5>
            {/* <p className="text-slate-700 text-sm leading-relaxed mb-4">
              A professional development workshop focused on practical skills
              and industry knowledge.
            </p> */}

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <svg
                  className="w-4 h-4 text-slate-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-slate-600">Duration:</span>
                <span className="font-medium text-slate-900 ml-2">
                  {(() => {
                    try {
                      const startDate = new Date(eventData.startDate);
                      const endDate = new Date(eventData.endDate);
                      if (
                        isNaN(startDate.getTime()) ||
                        isNaN(endDate.getTime())
                      ) {
                        return "Date information unavailable";
                      }
                      return `${format(startDate, "MMM d")} - ${format(
                        endDate,
                        "MMM d, yyyy"
                      )}`;
                    } catch (error) {
                      return "Date information unavailable";
                    }
                  })()}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <svg
                  className="w-4 h-4 text-slate-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <span className="text-slate-600">Awarded:</span>
                <span className="font-medium text-slate-900 ml-2">
                  {certificateDetails.completionDate}
                </span>
              </div>
            </div>
          </div>

          {/* Faculty Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-slate-900">Expert Faculty</h4>
            </div>

            <div className="space-y-4">
              {(eventData.mentors?.slice(0, 2) || []).map((mentor, index) => (
                <div
                  key={mentor.fullName}
                  className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg"
                >
                  <div className="w-12 h-12 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {mentor.image?.url ? (
                      <Image
                        src={mentor.image.url}
                        alt={mentor.fullName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-slate-600 font-bold text-sm">
                        {mentor.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-slate-900 text-sm">
                      {mentor.fullName}
                    </h5>
                    <p className="text-xs text-slate-600">{mentor.role}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {index === 0 ? "Lead" : "Expert"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
