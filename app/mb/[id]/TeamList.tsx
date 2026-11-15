import { MemberTypes } from "@/types/Members";
import qs from "qs";
import { fetchWithToken } from "@/lib/fetch";
import NotFound from "@/app/not-found";
import { membersListFormatter } from "@/lib/members";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MemberCard } from "@/components/shared/MemberCard";

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
        <SectionHeading
          highlight="Our Team"
          title="Executive Committee"
          subtitle="The people who keep the community running — events, mentorship, design, and everything in between."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
          {TeamDetails.map((member: MemberTypes, index: number) => (
            <MemberCard
              key={member.memberId || index}
              member={{
                memberId: member.memberId,
                fullName: member.fullName,
                post: member.post,
                image: member.image?.url,
                description: member.description,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
