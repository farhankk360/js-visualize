import React from "react";
import Astar from "../src/components/PathFindingAlgos/Astar";
import BubbleSort from "../src/components/SortingAlgos/BubbleSort";
import QuickSort from "../src/components/SortingAlgos/QuickSort";
import AudioVisualization from "../src/components/MusicVis/AudioVisualization";

const sections = [
  {
    name: "Path finding algorithms",
    routes: [
      {
        name: "A-Star",
        title: "Visualize A* path finding algorithm",
        description: "Create obstacles by drawing on the grid.",
        path: "/astar",
        gif: "https://www.dropbox.com/s/twb7pq488vj0oza/astar.gif?raw=1",
        screenShot:
          "https://www.dropbox.com/s/jzrjjejmaymr1eu/astar-screenshot.jpg?raw=1",
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
        title: "Bubble sort",
        description:
          "Visualize bubble sort algorithm with d3 force simulation.",
        gif: "https://www.dropbox.com/s/0xiiu8sg1vd186m/bubble-sort.gif?raw=1",
        screenShot:
          "https://www.dropbox.com/s/irvog0wciwbcfqo/bubble-sort-screenshot.jpg?raw=1",
        component: props => <BubbleSort {...props} />
      },
      {
        name: "Quick Sort",
        path: "/quick-sort",
        title: "Quick sort",
        description: "Visualize quick sort algorithm in d3 radial chart",
        gif: "https://www.dropbox.com/s/urojm5cbs2ooh72/quick-sort.gif?raw=1",
        screenShot:
          "https://www.dropbox.com/s/8cqlb60mywv6ka9/quick-sort-screenshot.jpg?raw=1",
        component: props => <QuickSort {...props} />
      }
    ]
  },
  {
    name: "Music",
    routes: [
      {
        name: "Audio Visualizer",
        title: "Visualize Audio using WebApi and d3",
        description: "",
        path: "/audio-visualization",
        gif:
          "https://www.dropbox.com/s/e18b80011i1hnep/audio-visualization.gif?raw=1",
        screenShot:
          "https://www.dropbox.com/s/xwriw5h9oo8vrq7/audio-visualization-screenshot.jpg?raw=1",
        component: props => <AudioVisualization {...props} />
      }
    ]
  }
];

export default sections;
