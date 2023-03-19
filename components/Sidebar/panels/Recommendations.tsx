import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { getCurrentUser } from "@/lib/getUser";
import getRecommendations from "@/lib/recommendations/getRecommendations";

import BasePanel from "./BasePanel";

type RecommendationType = {
  id: string;
  image: string;
  title: string;
  artist: string;
};

const Recommendation = ({ rec }: { rec: RecommendationType }) => (
  <li>
    <div className="flex flex-row">
      <figure className="aspect-square">
        <Image
          src={rec.image}
          alt={`${rec.title} track image`}
          width={75}
          height={75}
        />
      </figure>
      <div className="flex flex-col ml-5 mt-2">
        <h2 className="text-lg font-semibold truncate">{rec.title}</h2>
        <p>{rec.artist}</p>
      </div>
    </div>
    <div className="divider" />
  </li>
);
const Recommendations = async () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  setIsFetching(true);
  const user = await getCurrentUser();
  const recsData = await getRecommendations(user.id);
  setIsFetching(false);
  startTransition(() => {
    // Refresh the current route and fetch new data from the server without
    // losing client-side browser or React state.
    router.refresh();
  });

  const recsArray = [
    {
      id: recsData.tracks[0].id,
      image: recsData.tracks[0].album.images[0].url,
      title: recsData.tracks[0].name,
      artist: recsData.tracks[0].artists[0].name,
    } as RecommendationType,
    {
      id: recsData.tracks[1].id,
      image: recsData.tracks[1].album.images[0].url,
      title: recsData.tracks[1].name,
      artist: recsData.tracks[1].artists[0].name,
    } as RecommendationType,
    {
      id: recsData.tracks[2].id,
      image: recsData.tracks[2].album.images[0].url,
      title: recsData.tracks[2].name,
      artist: recsData.tracks[2].artists[0].name,
    } as RecommendationType,
    {
      id: recsData.tracks[3].id,
      image: recsData.tracks[3].album.images[0].url,
      title: recsData.tracks[3].name,
      artist: recsData.tracks[3].artists[0].name,
    } as RecommendationType,
    {
      id: recsData.tracks[4].id,
      image: recsData.tracks[4].album.images[0].url,
      title: recsData.tracks[4].name,
      artist: recsData.tracks[4].artists[0].name,
    } as RecommendationType,
  ];

  return (
    <BasePanel title="Recommendations">
      <ul>
        {recsArray.map((rec) => (
          <Recommendation key={rec.id} rec={rec} />
        ))}
      </ul>
    </BasePanel>
  );
};

export default Recommendations;
