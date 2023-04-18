/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    function minDepthHelper(node) {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;

      if (!node.left) return minDepthHelper(node.right) + 1;
      if (!node.right) return minDepthHelper(node.left) + 1;

      return Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1;
    }

    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    function maxDepthHelper(node) {
      if (!node) return 0;

      return Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1;
    }

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    function maxSumHelper(node) {
      if (!node) return [0, 0];

      const [leftMaxSum, leftMaxPath] = maxSumHelper(node.left);
      const [rightMaxSum, rightMaxPath] = maxSumHelper(node.right);

      const maxPath = Math.max(leftMaxPath + node.val, rightMaxPath + node.val, node.val);
      const maxSum = Math.max(leftMaxPath + node.val + rightMaxPath, leftMaxSum, rightMaxSum, maxPath);

      return [maxSum, maxPath];
    }

    const [maxSum] = maxSumHelper(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    function nextLargerHelper(node, lowerBound) {
      if (!node) return null;

      const left = nextLargerHelper(node.left, lowerBound);
      const right = nextLargerHelper(node.right, lowerBound);

      let candidates = [left, right];
      if (node.val > lowerBound) {
        candidates.push(node.val);
      }

      return candidates.reduce((min, value) => {
        if (value === null) return min;
        if (min === null) return value;
        return Math.min(min, value);
      }, null);
    }

    return nextLargerHelper(this.root, lowerBound);
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    let parent1 = null;
    let parent2 = null;
    let depth1 = -1;
    let depth2 = -1;

    function findDepthAndParent(node, target, depth = 0, parent = null) {
      if (!node) return;

      if (node === target) {
        return [depth, parent];
      }

      return (
        findDepthAndParent(node.left, target, depth + 1, node) ||
        findDepthAndParent(node.right, target, depth + 1, node)
      );
    }

    [depth1, parent1] = findDepthAndParent(this.root, node1);
    [depth2, parent2] = findDepthAndParent(this.root, node2);

    return depth1 === depth2 && parent1 !== parent2;
  }

  /** serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    function serializeHelper(node) {
      if (!node) return "null,";

      return (
        node.val.toString() +
        "," +
        serializeHelper(node.left) +
        serializeHelper(node.right)
      );
    }

    return serializeHelper(tree.root);
  }

  /** deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    let values = stringTree.split(",");

    function deserializeHelper() {
      const value = values.shift();

      if (value === "null") return null;

      const node = new BinaryTreeNode(parseInt(value, 10));
      node.left = deserializeHelper();
      node.right = deserializeHelper();

      return node;
    }

    const root = deserializeHelper();
    return new BinaryTree(root);
  }

  /** lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function findLowestCommonAncestor(node, p, q) {
      if (!node || node === p || node === q) return node;

      const left = findLowestCommonAncestor(node.left, p, q);
      const right = findLowestCommonAncestor(node.right, p, q);

      if (left && right) return node;
      return left ? left : right;
    }

    return findLowestCommonAncestor(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
