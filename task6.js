class Graph {
  constructor(EdgeArray) {
    this.edge = EdgeArray;
  }

  bfs() {
    let Visited = '0';
    let index = 0;

    while (index < Visited.length) {
      let curVertex = Number(Visited[index]);

      this.edge.forEach(elem => {
        let newVertex = '';

        if (elem[0] === curVertex) {
          newVertex = String(elem[1]);
        }
        if (elem[1] === curVertex) {
          newVertex = String(elem[0]);
        }
        if (newVertex === '') {
          return;
        }
        if (Visited.includes(newVertex)) {
          return;
        }
        Visited += newVertex;
      });
      index += 1;
    }
    return 'BFS: ' + Visited;
  }

  dfsStep(vertex, Visited) {
    let verts = Visited;

    for (let i = 0; i < this.edge.length; i++) {
      const elem = this.edge[i];
      let newVertex = '';

      if (elem[0] === vertex) {
        newVertex = String(elem[1]);
      }
      if (elem[1] === vertex) {
        newVertex = String(elem[0]);
      }
      if (newVertex === '') {
        continue;
      }
      if (verts.includes(newVertex)) {
        continue;
      }
      verts += newVertex;
      verts = this.dfsStep(Number(newVertex), verts);
    }
    return verts;
  }

  dfs() {
    const Visited = this.dfsStep(0, '0');

    return 'DFS: ' + Visited;
  }

  shortestWayStep(vert, state) {
    let nextVertices = [];

    this.edge.forEach(elem => {
      let newVertex = -1;

      if (elem[0] === vert) {
        newVertex = elem[1];
      }
      if (elem[1] === vert) {
        newVertex = elem[0];
      }
      if (newVertex === -1) {
        return;
      }
      if (state[newVertex].WasVisited) {
        return;
      }
      state[newVertex].DistFromSt = Math.min(state[vert].DistFromSt + elem[2], state[newVertex].DistFromSt);
      nextVertices[nextVertices.length] = newVertex;
    });

    state[vert].WasVisited = true;

    return [nextVertices, state];
  }

  shortestWay(nodeStart, nodeEnd) {

    function Vertex(DistFromSt, WasVisited) {
      this.DistFromSt = DistFromSt;
      this.WasVisited = WasVisited;
    }

    let state = [];

    this.edge.forEach(elem => {
      for (let i = 0; i <= 1; i++) {
        if (state[elem[i]] === undefined || state[elem[i]] === null) {
          state[elem[i]] = new Vertex((elem[i] === nodeStart ? 0 : Number.MAX_SAFE_INTEGER), false);
        }
      }
    });

    let allVisited = state => {
      for (let i = 0; i < state.length; i++) {
        if (!state[i].WasVisited) {
          return false;
        }
      }
      return true;
    };

    let Visit = [0];

    while (!allVisited(state)) {
      let NewVisit = [];

      for (let i = 0; i < Visit.length; i++) {
        const result = this.shortestWayStep(Visit[i], state);

        state = result[1];
        NewVisit = NewVisit.concat(result[0]);
      }
      Visit = NewVisit;
    }

    return('Short distanсe: ' + state[nodeEnd].DistFromSt);
  }
}

const graph1 = new Graph([[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]);
const graph2 = new Graph([[0, 3, 5], [1, 3, 11], [2, 3, 56], [4, 3, 77], [5, 4, 89]]);

console.log(graph1.bfs());
console.log(graph1.dfs());
console.log(graph2.shortestWay(0, 4));
