import * as React from "react";
import useVotingState from "./state";

type Props =
  | {
      title: string;
      user: string;
      controlled?: false;
    }
  | {
      id: string;
      controlled: true;
    };

export default (props: Props) => {
  const state = useVotingState(props);
  if (!state) return null;
  const {
    topics,
    upvote,
    downvote,
    add,
    remove,
    topicVotes,
    user,
    title,
  } = state;

  const [newTopicText, setNewTopicText] = React.useState("");
  return (
    <section>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Topic</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(topics).map(topic => (
            <tr key={topic}>
              <td>
                <button onClick={() => remove(topic, user)}>X</button>
              </td>
              <td>{topic}</td>
              <td>{topicVotes(topic)}</td>
              <td>
                <button onClick={() => upvote(topic, user)}>+</button>
              </td>
              <td>
                <button onClick={() => downvote(topic, user)}>-</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <button
                onClick={() => {
                  add(newTopicText, user);
                  setNewTopicText("");
                }}
              >
                +
              </button>
            </td>
            <td>
              <input
                type="text"
                onChange={({ currentTarget: { value } }) =>
                  setNewTopicText(value)
                }
                value={newTopicText}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div></div>
    </section>
  );
};
