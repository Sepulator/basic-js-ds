const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  #root = null;

  root() {
    return this.#root;
  }

  add(data) {
    this.#root = this.#addNode(this.#root, data);
  }

  #addNode(node, data) {
    if (!node) return new Node(data);

    if (node.data === data) return node;

    if (data > node.data)
      node.right = this.#addNode(node.right, data);
    else node.left = this.#addNode(node.left, data);

    return node;
  }

  has(data) {
    return this.#searchNode(this.#root, data);
  }

  #searchNode(node, data) {
    if (!node) return false;

    if (node.data === data) return true;

    return data > node.data ?
      this.#searchNode(node.right, data) :
      this.#searchNode(node.left, data);
  }

  find(data) {
    return this.#findNode(this.#root, data);
  }

  #findNode(node, data) {
    if (!node) return null;

    if (node.data === data) return node;

    return data > node.data ?
      this.#findNode(node.right, data) :
      this.#findNode(node.left, data);
  }

  remove(data) {
    this.root = this.#removeNode(this.#root, data);
  }

  #removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this.#removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.#removeNode(node.right, data);
      return node;
    } else {

      if (!node.left && !node.right) return null;

      if (!node.left) {
        node = node.right;
        return node;
      }

      if (!node.right) {
        node = node.left;
        return node;
      }

      let minRight = node.right;

      while (minRight.left) minRight = minRight.left;

      node.data = minRight.data;
      node.right = this.#removeNode(node.right, minRight.data);

      return node;
    }
  }

  min() {
    if (!this.#root) return null;
    let node = this.#root;

    while (node.left) node = node.left;

    return node.data;
  }

  max() {
    if (!this.#root) return null;
    let node = this.#root;

    while (node.right) node = node.right;

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};