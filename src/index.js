function node() {
    let data;
    return { data, left: null, right: null };
}

function tree(array) {
    let sortedArray = sort(array);
    let root = buildTree(sortedArray);

    function insert(value) {
        let temp;
        let parent;
        let curr = obj.root;
        while (curr !== null) {
            parent = curr;
            if (curr.data === value || typeof value !== 'number') {
                return;
            }
            if (curr.data > value) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }
        temp = node();
        temp.data = value;
        if (parent.data > value) {
            parent.left = temp;
        } else {
            parent.right = temp;
        }
    }

    function deleteItem(value) {
        let curr = obj.root;
        let parent;
        let temp;
        let tempParent;
        let tPP;

        while (curr !== null) {
            if (typeof value !== 'number') {
                return;
            }
            if (curr.data === value) {
                if (curr.left === null && curr.right === null) {
                    if (parent.data > value) {
                        parent.left = null;
                    } else {
                        parent.right = null;
                    }
                    return;
                } else if (curr.left === null && curr.right !== null) {
                    parent.right = curr.right;
                    return;
                } else if (curr.left !== null && curr.right === null) {
                    parent.left = curr.left;
                    return;
                } else {
                    temp = curr.right;
                    while (temp !== null) {
                        tPP = tempParent;
                        tempParent = temp;
                        temp = temp.left;
                    }
                    curr.data = tempParent.data;
                    tPP.left = null;
                    return;
                }
            }
            parent = curr;
            if (curr.data > value) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }
    }

    function find(value) {
        let curr = obj.root;
        while (curr !== null) {
            if (curr.data === value) {
                return curr;
            } else if (curr.data < value) {
                curr = curr.right;
            } else {
                curr = curr.left;
            }
        }
    }

    function levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw Error('Agrument is not a function');
        }
        let tree = obj.root;
        let queue = [];
        let i = 0;
        queue.push(tree);
        while (i < queue.length) {
            callback(tree);
            if (tree.left !== null) {
                queue.push(tree.left);
            }
            if (tree.right !== null) {
                queue.push(tree.right);
            }
            i++;
            tree = queue[i];
        }
    }

    function inOrder(callback) {
        if (typeof callback !== 'function') {
            throw Error('Agrument is not a function');
        }
        let tree = obj.root;
        iterate(tree, callback);
        function iterate(tree, callback) {
            if (tree.left !== null) {
                iterate(tree.left, callback);
            }
            callback(tree);
            if (tree.right !== null) {
                iterate(tree.right, callback);
            }
        }
    }

    function preOrder(callback) {
        if (typeof callback !== 'function') {
            throw Error('Agrument is not a function');
        }
        let tree = obj.root;
        iterate(tree, callback);
        function iterate(tree, callback) {
            callback(tree);
            if (tree.left !== null) {
                iterate(tree.left, callback);
            }
            if (tree.right !== null) {
                iterate(tree.right, callback);
            }
        }
    }

    function postOrder(callback) {
        if (typeof callback !== 'function') {
            throw Error('Agrument is not a function');
        }
        let tree = obj.root;
        iterate(tree, callback);
        function iterate(tree, callback) {
            if (tree.left !== null) {
                iterate(tree.left, callback);
            }
            if (tree.right !== null) {
                iterate(tree.right, callback);
            }
            callback(tree);
        }
    }

    function height(node) {
        node = find(node);
        if (!node) {
            return;
        }
        return countHeight(node);
        function countHeight(node) {
            let num1 = 0;
            let num2 = 0;
            if (node.left !== null) {
                num1++;
                num1 += countHeight(node.left);
            }
            if (node.right !== null) {
                num2++;
                num2 += countHeight(node.right);
            }

            if (num1 > num2) {
                return num1;
            } else if (num1 < num2) {
                return num2;
            }

            return num1;
        }
    }

    function depth(node) {
        let tree = obj.root;
        node = find(node);
        if (!node) {
            return;
        }
        return countDepth(node);
        function countDepth(node) {
            let num = 0;
            while (tree.data !== node.data && tree !== null) {
                if (tree.data === node.data) {
                    return num;
                } else if (tree.data < node.data) {
                    num++;
                    tree = tree.right;
                } else {
                    num++;
                    tree = tree.left;
                }
            }
            return num;
        }
    }

    function isBalanced() {
        let tree = obj.root;
        let num = 0;
        return checkIfBalanced(tree);
        function checkIfBalanced(tree) {
            let num1 = 0;
            let num2 = 0;
            if (tree.left === null && tree.right === null) {
                return 0;
            }
            if (tree.left !== null) {
                let check = checkIfBalanced(tree.left);
                num1++;
                if (check === false) {
                    return false;
                }
                num1 += check;
            }
            if (tree.right !== null) {
                let check = checkIfBalanced(tree.right);
                num2++;
                if (check === false) {
                    return false;
                }
                num2 += check;
            }

            if (tree === obj.root) {
                if (num1 < num2 && num2 - num1 <= 1) {
                    return true;
                } else if (num1 > num2 && num1 - num2 <= 1) {
                    return true;
                } else if (num1 === num2) {
                    return true;
                }
            }

            if (num1 < num2) {
                if (num2 - num1 > 1) {
                    return false;
                }
                return num2;
            } else if (num1 > num2) {
                if (num1 - num2 > 1) {
                    return false;
                }
                return num1;
            } else if (num1 === num2) {
                return num1;
            }
        }
    }

    function rebalance() {
        if (isBalanced()) {
            return;
        }
        let arr = [];
        inOrder((num) => {
            arr.push(num.data);
        });
        obj.root = buildTree(arr);
    }

    let obj = {
        root,
        insert,
        deleteItem,
        find,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance,
    };
    return obj;
}

function buildTree(array) {
    let root = node();
    if (array.length === 1) {
        root.data = array[0];
        return root;
    } else if (array.length === 2) {
        root.data = array[0];
        root.right = buildTree(array.slice(1));
        return root;
    }
    let mid = Math.trunc((array.length - 1) / 2);
    root.data = array[mid];
    root.left = buildTree(array.slice(0, mid));
    root.right = buildTree(array.slice(mid + 1));
    return root;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

function sort(arr) {
    let temp = mergeSort(arr);
    let arr2 = [];
    temp.forEach((num) => {
        if (num === arr2[arr2.length - 1]) {
        } else {
            arr2.push(num);
        }
    });
    return arr2;
}

function mergeSort(arr) {
    if (arr.length <= 0) {
    }

    if (arr.length > 1) {
        let mid = Math.trunc(arr.length / 2);
        let left = arr.slice(0, mid);
        let right = arr.slice(mid);
        let lArray = mergeSort(left);
        let rArray = mergeSort(right);

        return merge(lArray, rArray);
    }
    return arr;
}

function merge(lA, rA) {
    let arr = [];
    let i = 0;
    let j = 0;
    while (i < lA.length && j < rA.length) {
        if (lA[i] < rA[j]) {
            arr.push(lA[i]);
            i++;
        } else if (lA[i] > rA[j]) {
            arr.push(rA[j]);
            j++;
        } else if (lA[i] === rA[j]) {
            arr.push(lA[i]);
            arr.push(rA[j]);
            i++;
            j++;
        }
    }
    for (i; i < lA.length; i++) {
        arr.push(lA[i]);
    }

    for (j; j < rA.length; j++) {
        arr.push(rA[j]);
    }

    return arr;
}

function randomArrayS() {
    let arr = [];
    for (let i = 0; i < 20; i++) {
        arr.push(Math.trunc(Math.random() * 100));
    }
    return arr;
}

function randomArrayB() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push(Math.trunc(Math.random() * 10000));
    }
    return arr;
}

let test = tree(randomArrayS());
console.log(test.isBalanced());
console.log('pre-order');
test.preOrder((node) => {
    console.log(node.data);
});
console.log('post-order');

test.postOrder((node) => {
    console.log(node.data);
});
console.log('in-order');

test.inOrder((node) => {
    console.log(node.data);
});
prettyPrint(test.root);

let numbers = randomArrayB();
for (let i = 0; i < numbers.length; i++) {
    test.insert(numbers[i]);
}

console.log(test.isBalanced());
test.rebalance();
console.log(test.isBalanced());
console.log('pre-order');
test.preOrder((node) => {
    console.log(node.data);
});
console.log('post-order');

test.postOrder((node) => {
    console.log(node.data);
});
console.log('in-order');

test.inOrder((node) => {
    console.log(node.data);
});
prettyPrint(test.root);
