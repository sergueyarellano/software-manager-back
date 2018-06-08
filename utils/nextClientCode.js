module.exports = (list) => {
  return nextCodeAux(list, 0, 0)
}

function nextCodeAux (list, i, code) {
  return (i > list.length - 1 || code > 0)
    ? code
    : (list[i] === list[i + 1] - 1)
      ? nextCodeAux(list, i + 1, code)
      : nextCodeAux(list, i + 1, list[i] + 1)
}
