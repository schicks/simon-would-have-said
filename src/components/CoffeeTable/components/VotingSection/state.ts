import { useReducer } from "react";
import { Topic, State, Action, reducer } from "./reducer";

const topicVotes = (topic: Topic | undefined) =>
  topic
    ? Object.keys(topic.votes).reduce(
        (sum, voter) => sum + (topic.votes[voter] ?? 0),
        0
      )
    : undefined;

type Api = {
  topics: State;
  upvote: (topicId: string, voter: string) => void;
  downvote: (topicId: string, voter: string) => void;
  remove: (topicId: string, remover: string) => void;
  add: (topic: string, proposer: string) => void;
  topicVotes: (topicId: string) => number | undefined;
  title: string;
  user: string;
};

const makeApi = (
  topics: State,
  dispatch: (_: Action) => void,
  title: string,
  user: string
): Api => ({
  topics,
  topicVotes: (topicId: string) => topicVotes(topics[topicId]),
  upvote: (topicId: string, actor: string) =>
    dispatch({ action: { type: "upvote", topicId }, actor }),
  downvote: (topicId: string, actor: string) =>
    dispatch({ action: { type: "downvote", topicId }, actor }),
  remove: (topicId: string, actor: string) =>
    dispatch({ action: { type: "remove", topicId }, actor }),
  add: (topic: string, actor: string) =>
    dispatch({
      action: {
        type: "add",
        topic: { topic },
      },
      actor,
    }),
  title,
  user,
});

type Controlled = { id: string; controlled: true };
type Uncontrolled = { title: string; user: string; controlled?: false };
type Init = Controlled | Uncontrolled;
const isControlled = (init: Init): init is Controlled => init?.controlled ?? false;

export default (init: Init): Api | null => {
  const id = isControlled(init) ? init.id : null;
  const sections: {
    [id in string]?: {
      title: string;
      user: string;
      topics: State;
      dispatch: (_: Action) => void;
    };
  } = {};
  const [localTopics, localDispatch] = useReducer(reducer, {});
  if (isControlled(init)) {
    const section = sections[id as string];
    if (!section) return null;
    const { title, user, topics, dispatch } = section;
    return makeApi(topics, dispatch, title, user);
  } else {
    return makeApi(localTopics, localDispatch, init.title, init.user);
  }
};

export { State, Action, reducer };
