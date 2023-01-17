const createTree = value => {
  return {
    data: value,
    children: null,
    parent: null
  }
}
const addChild = (node, value) => {
  const newNode = {
    data: value,
    children: null,
    parent: node
  }
  node.children = node.children || []
  node.children.push(newNode)
  return newNode
}
const travel = (tree, fn) => {
  fn(tree)
  if (!tree.children) {
    return
  }
  for (let i = 0; i < tree.children.length; i++) {
    travel(tree.children[i], fn)
  }
}

const find = (tree, node) => {
  if (tree === node) {
    return tree
  } else if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      const result = find(tree.children[i], node)
      if (result) {
        return result
      }
    }
    return undefined
  } else {
    return undefined
  }
}

const removeNode = (tree, node) => {
  const siblings = node.parent.children
  let index = 0
  for (let i = 1; i < siblings.length; i++) {
    if (siblings[i] === node) {
      index = i
    }
  }
  siblings.splice(index, 1)
}

const tree = createTree(10)
const node2 = addChild(tree, 20)
const node3 = addChild(tree, 30)
addChild(tree, 40)
const node5 = addChild(tree, 50)
addChild(node2, 201)
addChild(node2, 202)
addChild(node2, 203)
addChild(node2, 204)
console.log(tree)

const fn = node => {
  console.log(node.data)
}

removeNode(tree, node5)
console.log(tree)
