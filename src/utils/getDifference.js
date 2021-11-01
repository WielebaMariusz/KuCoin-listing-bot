const getDifference = (curr, prev) => {
  console.log('curr', prev, curr)
  // return curr.filter(i => !prev.includes(i)).concat(prev.filter(i => !curr.includes(i)));
  return curr.filter(coin => !prev.includes(coin))
};

module.exports = getDifference;
