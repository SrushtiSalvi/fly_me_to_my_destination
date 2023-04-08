function get_path(n, airports, start) {
  let path = []; //set path as empty array
  let end = start + airports[start]; //end is start + fuel of plane
  start += 1; //start is start + 1
  let reached_end = false; //set reached_end as false
  let max_fuel_plane = 0; //set max_fuel_plane as 0
  let airports_to_travel = 0; //set airports_to_travel as 0

  for (let i = start; i <= end; i++) {
    //loop from start to end
    path.push(airports[i]); //push airport to path
    if (max_fuel_plane <= airports[i]) {
      //if max_fuel_plane is less than or equal to airport
      max_fuel_plane = airports[i]; //set max_fuel_plane as airport
      airports_to_travel += 1; //increment airports_to_travel by 1
    }

    if (i === n - 1) {
      //if i is equal to n - 1
      reached_end = true; //set reached_end as true
      break; //break the loop
    }
  }

  return [path, reached_end, max_fuel_plane, airports_to_travel]; //return path, reached_end, max_fuel_plane, airports_to_travel from function get_path
}

function minimum_planes(n, airports) {
  //function minimum_planes with parameters n and airports
  let planes_used = -1; //set planes_used as -1
  let optimal_path = []; //set optimal_path as empty array
  let i = 0; //set i as 0
  let got_path = true; //set got_path as true
  while (got_path) {
    //loop while got_path is true
    console.log(`value of i is ${i}`); //print value of i
    if (!(i < n)) {
      //if i is not less than n
      break; //break the loop
    }
    let plane_fuel = airports[i]; //set plane_fuel as airport at index i
    optimal_path.push(plane_fuel); //push plane_fuel to optimal_path
    planes_used += 1; //increment planes_used by 1
    console.log(`Optimal_path >>>>> ${optimal_path}`); //print optimal_path

    if (i + plane_fuel >= n - 1) {
      //if i + plane_fuel is greater than or equal to n - 1
      optimal_path.push(airports[n - 1]); //push airport at index n - 1 to optimal_path
      planes_used += 1; //increment planes_used by 1
      break; //break the loop
    }

    console.log(`path from ${airports[i]}`); //print path from airport at index i
    let [possible_path, reached_end, max_fuel_plane, airports_to_travel] =
      get_path(n, airports, i); //set possible_path, reached_end, max_fuel_plane, airports_to_travel as get_path with parameters n, airports and i
    console.log(`possible_path -> ${possible_path}`); //print possible_path

    if (!(i + max_fuel_plane < n)) {
      //if i + max_fuel_plane is not less than n
      optimal_path.push(max_fuel_plane); //push max_fuel_plane to optimal_path
      break; //break the loop
    }

    console.log(`Choosing max ->${max_fuel_plane}`); //print Choosing max -> max_fuel_plane
    console.log(`airports_to_travel ->${airports_to_travel}`); //print airports_to_travel -> airports_to_travel

    if (max_fuel_plane === 0) {
      //if max_fuel_plane is equal to 0
      return [-1, optimal_path]; //return -1 and optimal_path from function minimum_planes
    }

    i += airports_to_travel; //increment i by airports_to_travel

    if (reached_end) {
      //if reached_end is true
      if (plane_fuel !== max_fuel_plane) {
        //if plane_fuel is not equal to max_fuel_plane
        optimal_path.push(max_fuel_plane); //push max_fuel_plane to optimal_path
        planes_used += 1; //increment planes_used by 1
      }
      optimal_path.push(airports[n - 1]); //push airport at index n - 1 to optimal_path
      got_path = true; //set got_path as true
      break; //break the loop
    }
  }

  return [planes_used, optimal_path]; //return planes_used and optimal_path from function minimum_planes
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
