export default (array, property) =>
  array.map(element => element[property]).join(", ");
