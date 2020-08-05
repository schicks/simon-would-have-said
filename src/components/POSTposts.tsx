import * as React from "react";
import { Link } from "gatsby";
import usePostsList from "../hooks/usePostsList";

const plannedPosts = {
  "proof-of-spare-time": "Introduction",
  "proof-of-spare-time-messaging":
    "What sorts of messages we need to keep states in sync",
  "proof-of-spare-time-designing-actions":
    "How we can design actions to obey the consistency rule",
  "proof-of-spare-time-testing":
    "How we can test that our system obeys the consistency rule",
  "proof-of-spare-time-implementation":
    "How we can implement the system with WebRTC",
};

type PlannedPost = keyof typeof plannedPosts;

type Props = {
  slug: string
  onlyPublished?: boolean
}

export default ({ slug: currentSlug, onlyPublished }: Props) => {
  const posts = usePostsList();
  const relevantPosts = posts.reduce<{ [key in PlannedPost]?: Date }>(
    (acc, { slug, status, date }) => {
      if (status === "published" && slug in plannedPosts)
        return {
          ...acc,
          [slug]: date,
        };
      else return acc;
    },
    {}
  );
  return (
    <ul>
      {(Object.keys(plannedPosts) as PlannedPost[])
        .filter(slug => slug !== currentSlug && (!onlyPublished || relevantPosts[slug]))
        .sort((aSlug, bSlug) => {
          return (relevantPosts[aSlug] ?? Date.now()) > (relevantPosts[bSlug] ?? Date.now())
            ? 1
            : -1
        })
        .map(slug => {
          const content = relevantPosts[slug] ? (
            <Link to={`/${slug}`}>{plannedPosts[slug]}</Link>
          ) : (
            `Planned Post: ${plannedPosts[slug]}`
          );

          return <li key={slug}>{content}</li>;
        })}
    </ul>
  );
};
