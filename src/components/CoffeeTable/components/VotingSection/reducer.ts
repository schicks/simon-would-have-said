export type Topic = {
  topic: string;
  description: string;
  proposer: string;
  votes: { [voter in string]?: 1 | 0 };
};

export type State = {
  [key in string]?: Topic;
};

type Upvote = {
  type: "upvote";
  topicId: string;
};

type Downvote = {
  type: "downvote";
  topicId: string;
};

type Add = {
  type: "add";
  topic: { topic: string };
};

type Remove = {
  type: "remove";
  topicId: string;
};

export type Action = {
  actor: string;
  action: Add | Remove | Upvote | Downvote;
};

export const reducer = (draft: State, { actor, action }: Action): State => {
  switch (action.type) {
    case "add": {
      return {
        ...draft,
        [action.topic.topic]: {
          ...action.topic,
          description: "",
          proposer: actor,
          votes: { [actor]: 1 },
        },
      };
    }
    case "remove": {
      return Object.keys(draft).reduce<State>((acc, key) => {
        if (key === action.topicId && draft[key]?.proposer === actor)
          return acc;
        else
          return {
            ...acc,
            [key]: draft[key],
          };
      }, {});
    }
    case "downvote":
    case "upvote": {
      const topic = draft[action.topicId];
      const voteValue = action.type === "upvote" ? 1 : 0;
      if (!topic) return draft;
      else
        return {
          ...draft,
          [topic.topic]: {
            ...topic,
            votes: Object.keys(topic.votes).reduce<{ [key in string]?: 1 | 0 }>(
              (acc, a) => ({
                ...acc,
                [a]: a === actor ? voteValue : acc[a],
              }),
              {}
            ),
          },
        };
    }
  }
};