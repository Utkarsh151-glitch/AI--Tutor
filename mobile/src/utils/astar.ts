/**
 * A* Pathfinding – Condensed Macro-Step Generator
 * Produces 10-12 meaningful steps for clear visualization and teaching.
 */

export type GridCell = {
  row: number;
  col: number;
};

export type AStarStep = {
  type: 'init' | 'expand' | 'choose' | 'pathFound' | 'noPath';
  node: GridCell;
  g: number;
  h: number;
  f: number;
  openSet: GridCell[];
  closedSet: GridCell[];
  path: GridCell[];
  neighborsAdded: GridCell[];
  stepNumber: number;
  description: string;
};

export type GridState = {
  rows: number;
  cols: number;
  start: GridCell;
  end: GridCell;
  obstacles: GridCell[];
};

const heuristic = (a: GridCell, b: GridCell): number =>
  Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

const cellKey = (c: GridCell) => `${c.row},${c.col}`;
const cellEq = (a: GridCell, b: GridCell) => a.row === b.row && a.col === b.col;

const getNeighbors = (node: GridCell, rows: number, cols: number): GridCell[] => {
  const dirs = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
  ];
  return dirs
    .map((d) => ({ row: node.row + d.row, col: node.col + d.col }))
    .filter((n) => n.row >= 0 && n.row < rows && n.col >= 0 && n.col < cols);
};

/**
 * Generate a 6x6 grid with fewer obstacles for a clean 10-step demo.
 */
export const generateDefaultGrid = (): GridState => {
  const rows = 6;
  const cols = 6;
  const start: GridCell = { row: 0, col: 0 };
  const end: GridCell = { row: 5, col: 5 };

  const obstacles: GridCell[] = [
    { row: 1, col: 1 }, { row: 2, col: 1 },
    { row: 3, col: 3 }, { row: 3, col: 4 },
    { row: 4, col: 1 },
  ];

  return { rows, cols, start, end, obstacles };
};

/**
 * Run A* but emit only 10-12 condensed macro-steps.
 * Each step is a meaningful decision point.
 */
export const generateAStarSteps = (grid: GridState): AStarStep[] => {
  const macroSteps: AStarStep[] = [];
  const { rows, cols, start, end, obstacles } = grid;
  const obstacleSet = new Set(obstacles.map(cellKey));

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const cameFrom = new Map<string, GridCell>();
  const openSetMap = new Map<string, GridCell>();
  const closedSetArr: GridCell[] = [];
  const closedSetKeys = new Set<string>();

  gScore.set(cellKey(start), 0);
  const startH = heuristic(start, end);
  fScore.set(cellKey(start), startH);
  openSetMap.set(cellKey(start), start);

  let stepNum = 0;

  // Step 1: Init
  stepNum++;
  macroSteps.push({
    type: 'init',
    node: start,
    g: 0, h: startH, f: startH,
    openSet: [start],
    closedSet: [],
    path: [],
    neighborsAdded: [],
    stepNumber: stepNum,
    description: `Initialize A* at (${start.row},${start.col}). Goal is (${end.row},${end.col}). Heuristic h=${startH}. The algorithm begins by placing the start in the open set.`,
  });

  const reconstructPath = (current: GridCell): GridCell[] => {
    const path = [current];
    let c = current;
    while (cameFrom.has(cellKey(c))) {
      c = cameFrom.get(cellKey(c))!;
      path.unshift(c);
    }
    return path;
  };

  const MAX_STEPS = 11;

  while (openSetMap.size > 0 && stepNum < MAX_STEPS) {
    // Pick best node
    let current: GridCell | null = null;
    let bestF = Infinity;
    for (const [, node] of openSetMap) {
      const f = fScore.get(cellKey(node)) ?? Infinity;
      if (f < bestF) {
        bestF = f;
        current = node;
      }
    }
    if (!current) break;

    const currentG = gScore.get(cellKey(current)) ?? Infinity;
    const currentH = heuristic(current, end);

    // Check goal
    if (cellEq(current, end)) {
      const path = reconstructPath(current);
      stepNum++;
      macroSteps.push({
        type: 'pathFound',
        node: current,
        g: currentG, h: 0, f: currentG,
        openSet: Array.from(openSetMap.values()),
        closedSet: [...closedSetArr],
        path,
        neighborsAdded: [],
        stepNumber: stepNum,
        description: `🎯 Goal reached! Path found with ${path.length} nodes and total cost ${currentG}. A* guarantees this is the optimal shortest path because the heuristic never overestimates.`,
      });
      return macroSteps;
    }

    // Move to closed
    openSetMap.delete(cellKey(current));
    closedSetArr.push(current);
    closedSetKeys.add(cellKey(current));

    // Expand neighbors (this is one macro-step: "choose + expand")
    const neighbors = getNeighbors(current, rows, cols);
    const addedNeighbors: GridCell[] = [];

    for (const neighbor of neighbors) {
      const nKey = cellKey(neighbor);
      if (closedSetKeys.has(nKey) || obstacleSet.has(nKey)) continue;

      const tentativeG = currentG + 1;
      const prevG = gScore.get(nKey) ?? Infinity;

      if (tentativeG < prevG) {
        cameFrom.set(nKey, current);
        gScore.set(nKey, tentativeG);
        const nH = heuristic(neighbor, end);
        fScore.set(nKey, tentativeG + nH);

        if (!openSetMap.has(nKey)) {
          openSetMap.set(nKey, neighbor);
          addedNeighbors.push(neighbor);
        }
      }
    }

    stepNum++;
    const isFirstExpand = stepNum === 2;
    macroSteps.push({
      type: isFirstExpand ? 'expand' : 'choose',
      node: current,
      g: currentG, h: currentH, f: bestF,
      openSet: Array.from(openSetMap.values()),
      closedSet: [...closedSetArr],
      path: [],
      neighborsAdded: addedNeighbors,
      stepNumber: stepNum,
      description: isFirstExpand
        ? `Expand start node (${current.row},${current.col}). Added ${addedNeighbors.length} neighbors to open set. Each gets f = g + h. The algorithm now has multiple paths to evaluate.`
        : `Choose node (${current.row},${current.col}) with lowest f=${bestF} (g=${currentG}, h=${currentH}). Explore ${addedNeighbors.length} new neighbor(s). This node is the most promising path toward the goal.`,
    });
  }

  // If we ran out of steps but haven't found path, do one final step
  if (openSetMap.size > 0) {
    // Fast-forward to find path
    while (openSetMap.size > 0) {
      let current: GridCell | null = null;
      let bestF = Infinity;
      for (const [, node] of openSetMap) {
        const f = fScore.get(cellKey(node)) ?? Infinity;
        if (f < bestF) { bestF = f; current = node; }
      }
      if (!current) break;

      const currentG = gScore.get(cellKey(current)) ?? Infinity;

      if (cellEq(current, end)) {
        const path = reconstructPath(current);
        stepNum++;
        macroSteps.push({
          type: 'pathFound',
          node: current,
          g: currentG, h: 0, f: currentG,
          openSet: Array.from(openSetMap.values()),
          closedSet: [...closedSetArr],
          path,
          neighborsAdded: [],
          stepNumber: stepNum,
          description: `🎯 Goal reached! Optimal path found with ${path.length} nodes and total cost ${currentG}. A* guarantees optimality with an admissible heuristic.`,
        });
        return macroSteps;
      }

      openSetMap.delete(cellKey(current));
      closedSetArr.push(current);
      closedSetKeys.add(cellKey(current));

      for (const neighbor of getNeighbors(current, rows, cols)) {
        const nKey = cellKey(neighbor);
        if (closedSetKeys.has(nKey) || obstacleSet.has(nKey)) continue;
        const tentativeG = currentG + 1;
        if (tentativeG < (gScore.get(nKey) ?? Infinity)) {
          cameFrom.set(nKey, current);
          gScore.set(nKey, tentativeG);
          fScore.set(nKey, tentativeG + heuristic(neighbor, end));
          if (!openSetMap.has(nKey)) openSetMap.set(nKey, neighbor);
        }
      }
    }
  }

  stepNum++;
  macroSteps.push({
    type: 'noPath',
    node: end,
    g: 0, h: 0, f: 0,
    openSet: [],
    closedSet: [...closedSetArr],
    path: [],
    neighborsAdded: [],
    stepNumber: stepNum,
    description: 'No path exists. All reachable nodes have been explored without finding the goal.',
  });

  return macroSteps;
};

export const describeAStarStep = (step: AStarStep): string => step.description;
