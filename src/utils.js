
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
