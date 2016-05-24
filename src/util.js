/**
* Find all pojos with criteria in an array of pojos
*
* @param resource The array of objects to search
* @param queryParameters The query object with the criteria
*
* @returns An array of the objects in the resource which match the queryParameters
*/
export function findSelected(resource, queryParameters) {
  if (Object.keys(queryParameters).length === 0) return resource;

  let selection = [];

  resource.map(el => {
    let matches = true;
    for (let key in queryParameters) {
      if (el[key] === undefined || queryParameters[key] !== el[key].toString()) {
        matches = false;
        break;
      }
    }
    if (matches) selection.push(el);
  });

  return selection;
}
