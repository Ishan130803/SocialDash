"use client";

import { useGetRecommended } from "@/features/friends/api/use-get-recommended";
import { KnowPeopleBanner } from "./know-people-banner";

function PeopleYouMayKnowSection() {
  const recommendations = useGetRecommended("general_recommendations",{
    limit : 10
  }).data ?? [];

  return (
    <section className="">
      <h2 className="mx-10 text-xl my-5 font-bold ">People you may know</h2>
      <div className="flex gap-2 overflow-x-scroll mx-10">
        {recommendations.map((item) => (
          <KnowPeopleBanner {...item} key={item._id} />
        ))}
      </div>
    </section>
  );
}

export { PeopleYouMayKnowSection };
