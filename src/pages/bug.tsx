import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const coords = ([x, y]: [number, number]): [number, number] => [x, y];

const coordValues = [-2, -1, 0, 1, 2] as const
type CoordValues = (typeof coordValues)[number]
type Coord = [CoordValues, CoordValues, CoordValues]
const cells = coordValues.reduce<Coord[]>((cells, r) => [
    ...cells,
    ...coordValues.reduce<Coord[]>((cells, g) => [
      ...cells,
      ...coordValues.reduce<Coord[]>((cells, b) => [
        ...cells,
        [r, g, b]
      ], [])
    ], [])
], [])

type Cell = {
  state?: "blue" | "green";
  place: [number, number];
};
const Cell = ({ place, state }: Cell) => {
  const [x, y] = coords(place);
  return (
    <polygon
      points="0,.8 1.3,0 2.6,.8 2.6,2 1.3,2.8 0,2"
      fill={state ?? "white"}
      stroke="black"
      strokeWidth={0.2}
      transform={`translate(1 1) translate(${x} ${y})`}
    />
  );
};

export default () => {
  return (
    <Layout>
      <SEO title="Home" />
      <svg height={100} width={100} viewBox="0 0 10 10">
        <Cell place={[0, 0]} />
        <Cell place={[2, 1]} />
      </svg>
    </Layout>
  );
};
