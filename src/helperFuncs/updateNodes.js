export const findNodesGroupName = (obj, uri) => {
  let groupFound;

  Object.entries(obj).forEach(([key, val]) => {
    if (key == "uri" && val === uri) {
      return obj.uri;
    }
    if (key == "children") {
      val.forEach((object, i) => {
        if (object.uri == uri) {
          groupFound = obj.name;
        }
        if (object.children) {
          object.children.forEach((val, j) => {
            if (val.uri == uri) {
              groupFound = obj["children"][i].uri;
            }
          });
        }
      });
    }
  });

  return groupFound;
};

export const findGroupsUserBelongsTo = (obj, uri) => {
  let groupsArr = [];
  Object.entries(obj).map(([key, val]) => {
    if (key === "children") {
      val.map((object, i) => {
        if (object.children) {
          object.children.map((val, j) => {
            if (val.uri == uri) {
              let currGroup = obj["children"][i].name;
              groupsArr = [...groupsArr, currGroup];
            }
          });
        }
      });
    }
  });
  return groupsArr;
};

export const reshapeResource = data => {
  const map = new Map();
  const dataArray = data;

  // set up map of resources with descendants for lookup
  dataArray.map(resource => {
    map.set(resource.uri, resource);
  });

  // iterate over nodes with children
  for (let i = 0; i < dataArray.length; i++) {
    // iterate over children
    for (let j = 0; j < dataArray[i].children.length; j++) {
      let count = 0;

      while (count < dataArray[i].children.length) {
        let currNode = dataArray[i].children[count];

        if (map.has(currNode.uri)) {
          // update map since map are saved by reference
          map.get(dataArray[i].uri).children[count] = {
            ...map.get(currNode.uri),
            toggled: true,
            parent: dataArray[i].uri
          };
        } else {
          map.get(dataArray[i].uri).children[count] = {
            ...currNode,
            toggled: true,
            parent: dataArray[i].uri
          };
        }
        count++;
      }
    }
  }

  return { reshapedResources: map.get("Root") };
};
