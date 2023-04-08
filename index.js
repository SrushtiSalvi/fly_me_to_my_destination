function get_path(n, airports, start) {
  let path = [];
  let end = start + airports[start];
  start += 1;
  let reached_end = false;
  let max_fuel_plane = 0;
  let airports_to_travel = 0;

  for (let i = start; i <= end; i++) {
    path.push(airports[i]);
    if (max_fuel_plane <= airports[i]) {
      max_fuel_plane = airports[i];
      airports_to_travel += 1;
    }

    if (i === n - 1) {
      reached_end = true;
      break;
    }
  }

  return [path, reached_end, max_fuel_plane, airports_to_travel];
}

function minimum_planes(n, airports) {
  let planes_used = -1;
  let optimal_path = [];
  let i = 0;
  let got_path = true;
  while (got_path) {
    console.log(`value of i is ${i}`);
    if (!(i < n)) {
      break;
    }
    let plane_fuel = airports[i];
    optimal_path.push(plane_fuel);
    planes_used += 1;
    console.log(`Optimal_path >>>>> ${optimal_path}`);

    if (i + plane_fuel >= n - 1) {
      optimal_path.push(airports[n - 1]);
      planes_used += 1;
      break;
    }

    console.log(`path from ${airports[i]}`);
    let [possible_path, reached_end, max_fuel_plane, airports_to_travel] =
      get_path(n, airports, i);
    console.log(`possible_path -> ${possible_path}`);

    if (!(i + max_fuel_plane < n)) {
      optimal_path.push(max_fuel_plane);
      break;
    }

    console.log(`Choosing max ->${max_fuel_plane}`);
    console.log(`airports_to_travel ->${airports_to_travel}`);

    if (max_fuel_plane === 0) {
      return [-1, optimal_path];
    }

    i += airports_to_travel;

    if (reached_end) {
      if (plane_fuel !== max_fuel_plane) {
        optimal_path.push(max_fuel_plane);
        planes_used += 1;
      }
      optimal_path.push(airports[n - 1]);
      got_path = true;
      break;
    }

    console.log("---------------");
  }

  return [planes_used, optimal_path];
}

// let fuel = [1, 6, 3, 4, 5, 0, 0, 0, 6];
let airports = [2, 1, 2, 3, 1];
let [output, optimal_path] = minimum_planes(airports.length, airports);
console.log("----------------------");
console.log(`Output:- ${output}`);
console.log(`Optimal_path:- ${optimal_path}`);

/*
  2 → 2→ 1.
  Output: 2
  */
