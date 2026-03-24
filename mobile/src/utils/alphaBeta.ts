/**
 * Alpha-Beta Pruning – Condensed Macro-Step Generator
 * Produces 10-12 meaningful steps showing only key decision points and pruning events.
 */

export type TreeNode = {
  id: string;
  value: number | null;
  children: TreeNode[];
  isMaximizing: boolean;
  depth: number;
};

export type AlphaBetaStep = {
  type: 'visit' | 'evaluate' | 'prune' | 'complete';
  nodeId: string;
  depth: number;
  alpha: number;
  beta: number;
  value: number | null;
  pruned: boolean;
  prunedChildren: string[];
  bestValue: number | null;
  path: string[];
  stepNumber: number;
  description: string;
};

/**
 * Generate a compact game tree (depth 3, branching factor 2)
 * that produces exactly ~10-12 meaningful steps.
 */
export const generateSampleTree = (): TreeNode => {
  // These values guarantee 2 prune events:
  // Prune 1: At R.0.1 (MAX node) — after leaf 6 makes α=6 ≥ β=5, leaf 9 is skipped
  // Prune 2: At R.1 (MIN node) — after R.1.0 returns 2, β=2 ≤ α=5, entire R.1.1 subtree skipped
  const leafValues = [3, 5, 6, 9, 1, 2, 0, 7];
  let leafIdx = 0;

  const buildNode = (id: string, depth: number, isMax: boolean): TreeNode => {
    if (depth === 3) {
      return {
        id,
        value: leafValues[leafIdx++] ?? Math.floor(Math.random() * 15) + 1,
        children: [],
        isMaximizing: isMax,
        depth,
      };
    }

    const children: TreeNode[] = [];
    for (let i = 0; i < 2; i++) {
      children.push(buildNode(`${id}.${i}`, depth + 1, !isMax));
    }

    return { id, value: null, children, isMaximizing: isMax, depth };
  };

  return buildNode('R', 0, true);
};

/**
 * Flatten tree for rendering.
 */
export const flattenTree = (node: TreeNode): TreeNode[] => {
  const result: TreeNode[] = [node];
  for (const child of node.children) {
    result.push(...flattenTree(child));
  }
  return result;
};

/**
 * Run Alpha-Beta and emit only key decision points + pruning events.
 */
export const generateAlphaBetaSteps = (root: TreeNode): AlphaBetaStep[] => {
  const steps: AlphaBetaStep[] = [];
  const pathStack: string[] = [];
  let stepNum = 0;

  const alphaBeta = (
    node: TreeNode,
    alpha: number,
    beta: number,
    isMax: boolean,
  ): number => {
    pathStack.push(node.id);

    // Leaf node – always emit
    if (node.children.length === 0) {
      const val = node.value ?? 0;
      stepNum++;
      steps.push({
        type: 'evaluate',
        nodeId: node.id,
        depth: node.depth,
        alpha, beta,
        value: val,
        pruned: false,
        prunedChildren: [],
        bestValue: val,
        path: [...pathStack],
        stepNumber: stepNum,
        description: `Leaf ${node.id} has value ${val}. This is a terminal position — the algorithm reads the game outcome directly.`,
      });
      pathStack.pop();
      return val;
    }

    // Internal node – emit visit
    stepNum++;
    steps.push({
      type: 'visit',
      nodeId: node.id,
      depth: node.depth,
      alpha, beta,
      value: null,
      pruned: false,
      prunedChildren: [],
      bestValue: null,
      path: [...pathStack],
      stepNumber: stepNum,
      description: `Enter ${isMax ? 'MAX' : 'MIN'} node ${node.id} (depth ${node.depth}). α=${alpha === -Infinity ? '-∞' : alpha}, β=${beta === Infinity ? '∞' : beta}. ${isMax ? 'Maximizer wants the highest value.' : 'Minimizer wants the lowest value.'}`,
    });

    let bestVal = isMax ? -Infinity : Infinity;
    const prunedIds: string[] = [];

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const childVal = alphaBeta(child, alpha, beta, !isMax);

      if (isMax) {
        bestVal = Math.max(bestVal, childVal);
        alpha = Math.max(alpha, bestVal);
      } else {
        bestVal = Math.min(bestVal, childVal);
        beta = Math.min(beta, bestVal);
      }

      // Check pruning
      if (beta <= alpha) {
        for (let j = i + 1; j < node.children.length; j++) {
          prunedIds.push(node.children[j].id);
        }

        stepNum++;
        steps.push({
          type: 'prune',
          nodeId: node.id,
          depth: node.depth,
          alpha, beta,
          value: bestVal,
          pruned: true,
          prunedChildren: prunedIds,
          bestValue: bestVal,
          path: [...pathStack],
          stepNumber: stepNum,
          description: `✂️ PRUNE at ${node.id}! β(${beta}) ≤ α(${alpha}). Branch${prunedIds.length > 1 ? 'es' : ''} ${prunedIds.join(', ')} skipped — they cannot change the outcome. This saves computation!`,
        });

        break;
      }
    }

    node.value = bestVal;

    // Emit evaluation result for internal nodes
    stepNum++;
    steps.push({
      type: 'evaluate',
      nodeId: node.id,
      depth: node.depth,
      alpha, beta,
      value: bestVal,
      pruned: false,
      prunedChildren: prunedIds,
      bestValue: bestVal,
      path: [...pathStack],
      stepNumber: stepNum,
      description: `${isMax ? 'MAX' : 'MIN'} node ${node.id} resolves to ${bestVal}. ${isMax ? 'The maximizer picked the best option available.' : 'The minimizer chose the lowest value to limit the opponent.'}`,
    });

    pathStack.pop();
    return bestVal;
  };

  alphaBeta(root, -Infinity, Infinity, true);

  stepNum++;
  steps.push({
    type: 'complete',
    nodeId: root.id,
    depth: 0,
    alpha: -Infinity, beta: Infinity,
    value: root.value,
    pruned: false,
    prunedChildren: [],
    bestValue: root.value,
    path: [],
    stepNumber: stepNum,
    description: `✅ Alpha-Beta complete! Optimal game value: ${root.value}. The algorithm found the best move while pruning unnecessary branches.`,
  });

  return steps;
};

export const describeAlphaBetaStep = (step: AlphaBetaStep): string => step.description;
