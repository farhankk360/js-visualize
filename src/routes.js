import React from "react";
import Astar from "../src/components/PathFindingAlgos/Astar/Astart";

const sections = [
  {
    name: "Path finding algorithms",
    routes: [
      {
        name: "A-Star",
        path: "/astar",
        component: props => <Astar {...props} />
      }
    ]
  }
];

export default sections;
