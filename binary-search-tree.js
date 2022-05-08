class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    //if tree empty insert at root
    if(this.root === null) {
      this.root = new Node(val);
      return this;
    }
    //else find correct spot for new node.
    var current = this.root;
    while(true) {
      if(val < current.val) {
        if(current.left === null) {
          current.left = new Node(val);
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if(current.right === null) {
          current.right = new Node(val);
            return this;
          
        } else {
          current = current.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current=this.root) {
    //for empty tree, insert at root
    if(this.root === null) {
      this.root = new Node(val);
      return this;
    }
    if(val < current.val){
      if(current.left === null){
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if(current.right === null) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    let foundVal = false;

    if(val === currentNode.val)
    return currentNode;

    while(currentNode && !foundVal) {
      if(val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        foundVal = true;
      }
    }
    if(!foundVal) return undefined;
    return currentNode;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current=this.root) {
    if(this.root === null) return undefined;

    if(val < current.val) {
      if(current.left === null) return undefined;
      return this.findRecursively(val, current.left);
    } else if(val > current.val){
      if(current.right === null) return undefined;
      return this.findRecursively(val, current.right);
    }
    return current;

  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let data = [];
    let current = this.root;

    function traverse(node){
      data.push(node.val);
      //go left
      node.left && traverse(node.left);
      //got right
      node.right && traverse(node.right);
    }
    traverse(current);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = [];
    let current = this.root;

    function traverse(node){
      node.left && traverse(node.left);
      data.push(node.val);

      node.right && traverse(node.right);
    }
    traverse(current);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let current = this.root;

    function traverse(node){
      node.left && traverse(node.left);

      node.right && traverse(node.right);
      data.push(node.val);
    }
    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node);

    while(queue.length) {
      node = queue.shift();
      data.push(node.val);
      if(node.left) {
        queue.push(node.left);
      }
      if(node.right){
        queue.push(node.right);
      }
    }
    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeRemove = this.root;
    let parent;

    while(nodeRemove.val !== val){
      parent = nodeRemove;
      if(val < nodeRemove.val){
        nodeRemove = nodeRemove.left;
      } else {
        nodeRemove = nodeRemove.right;
      }
    }
    if(nodeRemove !== this.root) {
      if(nodeRemove.left === null && nodeRemove.right === null){
        if(parent.left === nodeRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if(nodeRemove.left !== null && nodeRemove.right !== null) {
        let rightParent = nodeRemove;
        let right = nodeRemove.right;
        if(right.left === null){
          right.left = nodeRemove.left;
          
          if(parent.left === nodeRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while(right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if(parent.left === nodeRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          } 
          if(right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if(parent.left === nodeRemove) {
          if(nodeRemove.right === null) {
            parent.left = nodeRemove.left;
          } else {
            parent.left = nodeRemove.right;
          }
        } else {
          if (nodeRemove.right === null) {
            parent.right = nodeRemove.left;
          } else {
            if(nodeRemove.right === null) {
              parent.right = nodeRemove.left;
            } else {
              parent.right = nodeRemove.right;
            }
          }
        }
      }
    }
    return nodeRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current = this.root) {
    if (current === null) return;
    return maximumDepth(current) - minimumDepth(current) <= 1;

    function minimumDepth(current) {
      if (current === null) return 0;
      return 1 + Math.min(minimumDepth(current.left), minimumDepth(current.right));
    }

    function maximumDepth(current) {
      if (current === null) return 0;
      return 1 + Math.max(maximumDepth(current.left), maximumDepth(current.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current=this.root) {
    // for small tree, return
    if (!this.root || (!this.root.left && !this.root.right)) return;

    while (current) {
      // Current is largest and has a left subtree and 2nd largest is the largest in that subtree
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }
      // Current is parent of largest and largest has no children so current is 2nd largest
      if (current.right && (!current.right.left && !current.right.right)) {
        return current.val;
      }
      current = current.right;
    }
  }

  dfsInOrderIterative() {
    let cur = this.root;
    let stack = [];
    let dfs = [];
    while (stack.length > 0 || cur) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      if (cur) {
        dfs.push(cur.val);
        cur = cur.right;
      }
    }
    return dfs;
  }
}

module.exports = BinarySearchTree;
