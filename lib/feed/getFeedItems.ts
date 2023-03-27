import { getDocs, orderBy, query } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";
import getUsersFollowing from "@/lib/followers/getUsersFollowing";
import { getCurrentUser } from "@/lib/getUser";

import getFeedComments from "./getFeedComments";

const getFeedItems = async (params?: { filterByFollowing?: boolean }) => {
  const currentUserId = await getCurrentUser().then((user) => user.id);
  const filterByFollowing = params?.filterByFollowing ?? false;
  const followingIds = await getUsersFollowing().then((users) =>
    users.map((user) => user.id)
  );

  const q = query(feedCol, orderBy("timestamp", "desc"));
  const feedSnapshot = await getDocs(q);

  return Promise.all(
    feedSnapshot.docs
      .filter(
        (doc) =>
          !filterByFollowing ||
          doc.data().userId === currentUserId ||
          followingIds.includes(doc.data().userId)
      )
      .map(async (doc) => {
        const docId = doc.id;
        const comments = await getFeedComments(docId);
        return {
          id: doc.id,
          ...doc.data(),
          comments,
        };
      })
  );
};

export default getFeedItems;
