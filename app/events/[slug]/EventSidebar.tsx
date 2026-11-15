import { Calendar, MapPin, Video, Users, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventTypes } from "@/types/events";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function formatFullDateRange(
  startDateStr?: Date | string,
  endDateStr?: Date | string | null
): string {
  if (!startDateStr) return "";
  const startDate = new Date(startDateStr);
  const startMonth = MONTHS[startDate.getMonth()];
  const startDay = startDate.getDate();
  const startYear = startDate.getFullYear();

  if (!endDateStr) {
    return `${startMonth} ${startDay}, ${startYear}`;
  }

  const endDate = new Date(endDateStr);
  const endMonth = MONTHS[endDate.getMonth()];
  const endDay = endDate.getDate();
  const endYear = endDate.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return startDay === endDay
        ? `${startMonth} ${startDay}, ${startYear}`
        : `${startMonth} ${startDay} – ${endDay}, ${startYear}`;
    }
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`;
  }

  return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
}

function formatFullTimeWindow(startTime?: string, endTime?: string): string {
  if (!startTime) return "";

  const formatSingle = (timeStr: string) => {
    const parts = timeStr.split(":");
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1] || "00";
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const startFormatted = formatSingle(startTime);
  if (!endTime) return `${startFormatted} onwards`;
  const endFormatted = formatSingle(endTime);
  return `${startFormatted} – ${endFormatted}`;
}

interface EventSidebarProps {
  event: EventTypes;
}

export function EventSidebar({ event }: EventSidebarProps) {
  const fullDate = formatFullDateRange(event.startDate, event.endDate);
  const fullTime = formatFullTimeWindow(event.startTime, event.endTime);
  const isVirtual =
    event.location === "Google Meet" ||
    event.location?.toLowerCase().includes("online");

  // Registration availability & link
  const isRegistrationOpen = event.registrationOpen ?? true;
  const registrationUrl = event.registrationFormUrl || null;

  // Format fee label
  const renderFee = () => {
    if (event.registrationFeeBMC && event.registrationFee && event.registrationFeeBMC !== event.registrationFee) {
      return `Rs. ${event.registrationFeeBMC} (BMC) / Rs. ${event.registrationFee}`;
    }
    if (event.registrationFee && event.registrationFee > 0) {
      return `Rs. ${event.registrationFee}`;
    }
    if (event.registrationFeeBMC && event.registrationFeeBMC > 0) {
      return `Rs. ${event.registrationFeeBMC}`;
    }
    return "Free";
  };

  return (
    <aside aria-label="Event Details Sidebar" className="w-full">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
        <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">
          Event details
        </h3>

        {/* Schedule & Location Details */}
        <div className="space-y-4 text-sm text-slate-700 mb-7">
          {fullDate && (
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-slate-900">{fullDate}</p>
                {fullTime && (
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{fullTime}</p>
                )}
              </div>
            </div>
          )}

          {event.location && (
            <div className="flex items-start gap-3">
              {isVirtual ? (
                <Video className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              ) : (
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              )}
              <span className="font-medium text-slate-800">{event.location}</span>
            </div>
          )}

          {event.organizer && (
            <div className="pt-3 border-t border-slate-100 flex items-start justify-between">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Organizer:</span>
              </span>
              <span className="font-semibold text-slate-900 text-right">{event.organizer}</span>
            </div>
          )}

          {typeof event.availableSeats === "number" && event.availableSeats > 0 && (
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Available seats:</span>
              <span className="font-semibold text-slate-900">{event.availableSeats}</span>
            </div>
          )}

          <div className="flex items-start justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-slate-400" />
              <span>Registration fee:</span>
            </span>
            <span className="font-bold text-slate-900">{renderFee()}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="pt-2 border-t border-slate-100">
          {isRegistrationOpen && registrationUrl ? (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-sm transition-all shadow-primary/20 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Register now</span>
            </a>
          ) : (
            <Button className="w-full h-11 rounded-xl text-sm font-semibold" disabled>
              Registration Closed
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
