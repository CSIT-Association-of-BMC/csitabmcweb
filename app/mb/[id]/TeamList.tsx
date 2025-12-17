import Image from "next/image";
import Link from "next/link";
import { MemberTypes } from "@/types/Members";
import qs from "qs";
import { fetchWithToken } from "@/lib/fetch";
import NotFound from "@/app/not-found";
import { membersListFormatter } from "@/lib/members";
export default async function TeamList() {
  const query = qs.stringify(
    {
      fields: ["fullName", "post", "memberId"],
      populate: {
        image: {
          fields: ["url"],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/members?${query}`
  );

  if (!res || res.status !== 200) {
    console.error("Failed to fetch team members", res);
    return <NotFound />;
  }

  const resJson = await res.json();
  const TeamDetails: MemberTypes[] = resJson.data;
  membersListFormatter(TeamDetails);

  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#2b3870]" />
            <span>Team</span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Our <span className="text-[#2b3870]">Teams</span>
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            The people who keep the community running—events, mentorship,
            design, and everything in between.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {TeamDetails.map((member: MemberTypes, index: number) => (
            <Link
              href={`/mb/${member.memberId}`}
              key={index}
              className="group bg-white shadow-sm rounded-lg border border-slate-200/70 hover:-translate-y-1 hover:shadow-md transition-all duration-300 p-4"
            >
              <Image
                src={member.image.url}
                alt={member.fullName}
                width={200}
                height={200}
                className="rounded-md aspect-[1/1] object-cover"
              />

              <div className="text-center pt-2">
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#2b3870] transition-colors">
                  {member.fullName}
                </h3>
                <p className="text-gray-600 text-sm">{member.post}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
