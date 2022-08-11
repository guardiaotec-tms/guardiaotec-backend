const removeEquals = (array) => {
  const currentInArray = (current, array) => {
    for (const value of array) {
      if (current[0] === value[0] && current[1] === value[1]) {
        return true;
      }
    }
    return false;
  };

  const initial = { eqidxs: [], visited: [] };

  array.reduce((previous, current, index, array) => {
    if (currentInArray(current, previous.visited)) {
      previous.eqidxs.push(index);
    } else {
      previous.visited.push(current);
    }
    // console.log(previous, current, index, "\n");
    return previous;
  }, initial);

  return array.filter((e, i) => !initial.eqidxs.includes(i));
};

module.exports = {
  removeEquals,
};
