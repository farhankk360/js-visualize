import React from "react";
import Astar from "../src/components/PathFindingAlgos/Astar/Astart";
import BubbleSort from "../src/components/SortingAlgos/BubbleSort/BubbleSort";

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
  },
  {
    name: "Sorting algorithms",
    routes: [
      {
        name: "Bubble Sort",
        path: "/bubble-sort",
        component: props => <BubbleSort {...props} />
      }
    ]
  }
];

export default sections;
