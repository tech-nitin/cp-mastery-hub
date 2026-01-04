// CP-31 Sheet Data - 31 Days of Competitive Programming Practice
export interface Problem {
  id: string;
  name: string;
  link: string;
  platform: 'codeforces' | 'codechef' | 'leetcode' | 'atcoder';
  difficulty: 'easy' | 'medium' | 'hard';
  rating?: number;
}

export interface DayPlan {
  day: number;
  topic: string;
  description: string;
  problems: Problem[];
  icon: string;
}

export const cp31Sheet: DayPlan[] = [
  {
    day: 1,
    topic: "Arrays Basics",
    description: "Master fundamental array operations and traversals",
    icon: "📊",
    problems: [
      { id: "1a", name: "Two Sum", link: "https://leetcode.com/problems/two-sum/", platform: "leetcode", difficulty: "easy" },
      { id: "1b", name: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", platform: "leetcode", difficulty: "easy" },
      { id: "1c", name: "Contains Duplicate", link: "https://leetcode.com/problems/contains-duplicate/", platform: "leetcode", difficulty: "easy" },
    ],
  },
  {
    day: 2,
    topic: "Strings Manipulation",
    description: "Learn string processing and pattern matching",
    icon: "📝",
    problems: [
      { id: "2a", name: "Valid Anagram", link: "https://leetcode.com/problems/valid-anagram/", platform: "leetcode", difficulty: "easy" },
      { id: "2b", name: "Longest Common Prefix", link: "https://leetcode.com/problems/longest-common-prefix/", platform: "leetcode", difficulty: "easy" },
      { id: "2c", name: "Group Anagrams", link: "https://leetcode.com/problems/group-anagrams/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 3,
    topic: "Two Pointers",
    description: "Optimize with the two pointer technique",
    icon: "👆",
    problems: [
      { id: "3a", name: "3Sum", link: "https://leetcode.com/problems/3sum/", platform: "leetcode", difficulty: "medium" },
      { id: "3b", name: "Container With Most Water", link: "https://leetcode.com/problems/container-with-most-water/", platform: "leetcode", difficulty: "medium" },
      { id: "3c", name: "Trapping Rain Water", link: "https://leetcode.com/problems/trapping-rain-water/", platform: "leetcode", difficulty: "hard" },
    ],
  },
  {
    day: 4,
    topic: "Sliding Window",
    description: "Master the sliding window pattern",
    icon: "🪟",
    problems: [
      { id: "4a", name: "Maximum Subarray", link: "https://leetcode.com/problems/maximum-subarray/", platform: "leetcode", difficulty: "medium" },
      { id: "4b", name: "Longest Substring Without Repeating Characters", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", platform: "leetcode", difficulty: "medium" },
      { id: "4c", name: "Minimum Window Substring", link: "https://leetcode.com/problems/minimum-window-substring/", platform: "leetcode", difficulty: "hard" },
    ],
  },
  {
    day: 5,
    topic: "Stack & Queue",
    description: "Implement stack and queue-based solutions",
    icon: "📚",
    problems: [
      { id: "5a", name: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/", platform: "leetcode", difficulty: "easy" },
      { id: "5b", name: "Min Stack", link: "https://leetcode.com/problems/min-stack/", platform: "leetcode", difficulty: "medium" },
      { id: "5c", name: "Daily Temperatures", link: "https://leetcode.com/problems/daily-temperatures/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 6,
    topic: "Linked Lists",
    description: "Pointer manipulation in linked lists",
    icon: "🔗",
    problems: [
      { id: "6a", name: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/", platform: "leetcode", difficulty: "easy" },
      { id: "6b", name: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/", platform: "leetcode", difficulty: "easy" },
      { id: "6c", name: "LRU Cache", link: "https://leetcode.com/problems/lru-cache/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 7,
    topic: "Hashing",
    description: "Use hash maps for O(1) lookups",
    icon: "#️⃣",
    problems: [
      { id: "7a", name: "First Unique Character", link: "https://leetcode.com/problems/first-unique-character-in-a-string/", platform: "leetcode", difficulty: "easy" },
      { id: "7b", name: "Subarray Sum Equals K", link: "https://leetcode.com/problems/subarray-sum-equals-k/", platform: "leetcode", difficulty: "medium" },
      { id: "7c", name: "Longest Consecutive Sequence", link: "https://leetcode.com/problems/longest-consecutive-sequence/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 8,
    topic: "Binary Search",
    description: "Divide and conquer search techniques",
    icon: "🔍",
    problems: [
      { id: "8a", name: "Binary Search", link: "https://leetcode.com/problems/binary-search/", platform: "leetcode", difficulty: "easy" },
      { id: "8b", name: "Search in Rotated Sorted Array", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", platform: "leetcode", difficulty: "medium" },
      { id: "8c", name: "Median of Two Sorted Arrays", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", platform: "leetcode", difficulty: "hard" },
    ],
  },
  {
    day: 9,
    topic: "Sorting",
    description: "Implement and use sorting algorithms",
    icon: "↕️",
    problems: [
      { id: "9a", name: "Merge Intervals", link: "https://leetcode.com/problems/merge-intervals/", platform: "leetcode", difficulty: "medium" },
      { id: "9b", name: "Sort Colors", link: "https://leetcode.com/problems/sort-colors/", platform: "leetcode", difficulty: "medium" },
      { id: "9c", name: "Kth Largest Element", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 10,
    topic: "Recursion",
    description: "Build recursive thinking patterns",
    icon: "🔄",
    problems: [
      { id: "10a", name: "Pow(x, n)", link: "https://leetcode.com/problems/powx-n/", platform: "leetcode", difficulty: "medium" },
      { id: "10b", name: "Subsets", link: "https://leetcode.com/problems/subsets/", platform: "leetcode", difficulty: "medium" },
      { id: "10c", name: "Permutations", link: "https://leetcode.com/problems/permutations/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 11,
    topic: "Backtracking",
    description: "Explore all possibilities systematically",
    icon: "🔙",
    problems: [
      { id: "11a", name: "N-Queens", link: "https://leetcode.com/problems/n-queens/", platform: "leetcode", difficulty: "hard" },
      { id: "11b", name: "Combination Sum", link: "https://leetcode.com/problems/combination-sum/", platform: "leetcode", difficulty: "medium" },
      { id: "11c", name: "Word Search", link: "https://leetcode.com/problems/word-search/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 12,
    topic: "Binary Trees",
    description: "Tree traversals and operations",
    icon: "🌳",
    problems: [
      { id: "12a", name: "Maximum Depth of Binary Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", platform: "leetcode", difficulty: "easy" },
      { id: "12b", name: "Validate BST", link: "https://leetcode.com/problems/validate-binary-search-tree/", platform: "leetcode", difficulty: "medium" },
      { id: "12c", name: "Binary Tree Level Order Traversal", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 13,
    topic: "Binary Search Trees",
    description: "Master BST operations and properties",
    icon: "🌲",
    problems: [
      { id: "13a", name: "Lowest Common Ancestor of BST", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", platform: "leetcode", difficulty: "medium" },
      { id: "13b", name: "Kth Smallest Element in BST", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", platform: "leetcode", difficulty: "medium" },
      { id: "13c", name: "Serialize and Deserialize BST", link: "https://leetcode.com/problems/serialize-and-deserialize-bst/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 14,
    topic: "Heaps/Priority Queue",
    description: "Efficient min/max extraction",
    icon: "🗻",
    problems: [
      { id: "14a", name: "Top K Frequent Elements", link: "https://leetcode.com/problems/top-k-frequent-elements/", platform: "leetcode", difficulty: "medium" },
      { id: "14b", name: "Find Median from Data Stream", link: "https://leetcode.com/problems/find-median-from-data-stream/", platform: "leetcode", difficulty: "hard" },
      { id: "14c", name: "Merge K Sorted Lists", link: "https://leetcode.com/problems/merge-k-sorted-lists/", platform: "leetcode", difficulty: "hard" },
    ],
  },
  {
    day: 15,
    topic: "Graphs - BFS",
    description: "Breadth-first graph traversal",
    icon: "🌐",
    problems: [
      { id: "15a", name: "Number of Islands", link: "https://leetcode.com/problems/number-of-islands/", platform: "leetcode", difficulty: "medium" },
      { id: "15b", name: "Rotting Oranges", link: "https://leetcode.com/problems/rotting-oranges/", platform: "leetcode", difficulty: "medium" },
      { id: "15c", name: "Word Ladder", link: "https://leetcode.com/problems/word-ladder/", platform: "leetcode", difficulty: "hard" },
    ],
  },
  {
    day: 16,
    topic: "Graphs - DFS",
    description: "Depth-first graph traversal",
    icon: "🔎",
    problems: [
      { id: "16a", name: "Clone Graph", link: "https://leetcode.com/problems/clone-graph/", platform: "leetcode", difficulty: "medium" },
      { id: "16b", name: "Course Schedule", link: "https://leetcode.com/problems/course-schedule/", platform: "leetcode", difficulty: "medium" },
      { id: "16c", name: "Pacific Atlantic Water Flow", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 17,
    topic: "Greedy Algorithms",
    description: "Make optimal local choices",
    icon: "🎯",
    problems: [
      { id: "17a", name: "Jump Game", link: "https://leetcode.com/problems/jump-game/", platform: "leetcode", difficulty: "medium" },
      { id: "17b", name: "Gas Station", link: "https://leetcode.com/problems/gas-station/", platform: "leetcode", difficulty: "medium" },
      { id: "17c", name: "Task Scheduler", link: "https://leetcode.com/problems/task-scheduler/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 18,
    topic: "Dynamic Programming - 1D",
    description: "Introduction to DP concepts",
    icon: "📈",
    problems: [
      { id: "18a", name: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/", platform: "leetcode", difficulty: "easy" },
      { id: "18b", name: "House Robber", link: "https://leetcode.com/problems/house-robber/", platform: "leetcode", difficulty: "medium" },
      { id: "18c", name: "Coin Change", link: "https://leetcode.com/problems/coin-change/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 19,
    topic: "Dynamic Programming - 2D",
    description: "Multi-dimensional DP solutions",
    icon: "🧮",
    problems: [
      { id: "19a", name: "Unique Paths", link: "https://leetcode.com/problems/unique-paths/", platform: "leetcode", difficulty: "medium" },
      { id: "19b", name: "Longest Common Subsequence", link: "https://leetcode.com/problems/longest-common-subsequence/", platform: "leetcode", difficulty: "medium" },
      { id: "19c", name: "Edit Distance", link: "https://leetcode.com/problems/edit-distance/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 20,
    topic: "DP - Knapsack",
    description: "Classic knapsack variations",
    icon: "🎒",
    problems: [
      { id: "20a", name: "Partition Equal Subset Sum", link: "https://leetcode.com/problems/partition-equal-subset-sum/", platform: "leetcode", difficulty: "medium" },
      { id: "20b", name: "Target Sum", link: "https://leetcode.com/problems/target-sum/", platform: "leetcode", difficulty: "medium" },
      { id: "20c", name: "0/1 Knapsack", link: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 21,
    topic: "Bit Manipulation",
    description: "Low-level binary operations",
    icon: "🔢",
    problems: [
      { id: "21a", name: "Single Number", link: "https://leetcode.com/problems/single-number/", platform: "leetcode", difficulty: "easy" },
      { id: "21b", name: "Counting Bits", link: "https://leetcode.com/problems/counting-bits/", platform: "leetcode", difficulty: "easy" },
      { id: "21c", name: "Sum of Two Integers", link: "https://leetcode.com/problems/sum-of-two-integers/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 22,
    topic: "Math & Number Theory",
    description: "Mathematical algorithms",
    icon: "➕",
    problems: [
      { id: "22a", name: "Rotate Image", link: "https://leetcode.com/problems/rotate-image/", platform: "leetcode", difficulty: "medium" },
      { id: "22b", name: "Spiral Matrix", link: "https://leetcode.com/problems/spiral-matrix/", platform: "leetcode", difficulty: "medium" },
      { id: "22c", name: "Happy Number", link: "https://leetcode.com/problems/happy-number/", platform: "leetcode", difficulty: "easy" },
    ],
  },
  {
    day: 23,
    topic: "Tries",
    description: "Prefix trees for string operations",
    icon: "🌿",
    problems: [
      { id: "23a", name: "Implement Trie", link: "https://leetcode.com/problems/implement-trie-prefix-tree/", platform: "leetcode", difficulty: "medium" },
      { id: "23b", name: "Word Search II", link: "https://leetcode.com/problems/word-search-ii/", platform: "leetcode", difficulty: "hard" },
      { id: "23c", name: "Design Add and Search Words", link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 24,
    topic: "Union Find",
    description: "Disjoint set data structure",
    icon: "🔀",
    problems: [
      { id: "24a", name: "Number of Connected Components", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", platform: "leetcode", difficulty: "medium" },
      { id: "24b", name: "Redundant Connection", link: "https://leetcode.com/problems/redundant-connection/", platform: "leetcode", difficulty: "medium" },
      { id: "24c", name: "Accounts Merge", link: "https://leetcode.com/problems/accounts-merge/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 25,
    topic: "Segment Trees",
    description: "Range query optimization",
    icon: "📏",
    problems: [
      { id: "25a", name: "Range Sum Query - Mutable", link: "https://leetcode.com/problems/range-sum-query-mutable/", platform: "leetcode", difficulty: "medium" },
      { id: "25b", name: "Count of Smaller Numbers After Self", link: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", platform: "leetcode", difficulty: "hard" },
      { id: "25c", name: "Range Sum Query 2D - Mutable", link: "https://leetcode.com/problems/range-sum-query-2d-mutable/", platform: "leetcode", difficulty: "hard" },
    ],
  },
  {
    day: 26,
    topic: "Graph Algorithms",
    description: "Advanced graph techniques",
    icon: "🗺️",
    problems: [
      { id: "26a", name: "Network Delay Time (Dijkstra)", link: "https://leetcode.com/problems/network-delay-time/", platform: "leetcode", difficulty: "medium" },
      { id: "26b", name: "Cheapest Flights Within K Stops", link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", platform: "leetcode", difficulty: "medium" },
      { id: "26c", name: "Alien Dictionary", link: "https://leetcode.com/problems/alien-dictionary/", platform: "leetcode", difficulty: "hard" },
    ],
  },
  {
    day: 27,
    topic: "Codeforces Practice",
    description: "Competitive programming on Codeforces",
    icon: "⚔️",
    problems: [
      { id: "27a", name: "Watermelon", link: "https://codeforces.com/problemset/problem/4/A", platform: "codeforces", difficulty: "easy", rating: 800 },
      { id: "27b", name: "Theatre Square", link: "https://codeforces.com/problemset/problem/1/A", platform: "codeforces", difficulty: "easy", rating: 1000 },
      { id: "27c", name: "Bit++", link: "https://codeforces.com/problemset/problem/282/A", platform: "codeforces", difficulty: "easy", rating: 800 },
    ],
  },
  {
    day: 28,
    topic: "Codeforces - Intermediate",
    description: "Medium difficulty CF problems",
    icon: "🏋️",
    problems: [
      { id: "28a", name: "Even Odds", link: "https://codeforces.com/problemset/problem/318/A", platform: "codeforces", difficulty: "medium", rating: 900 },
      { id: "28b", name: "Choosing Teams", link: "https://codeforces.com/problemset/problem/432/A", platform: "codeforces", difficulty: "medium", rating: 800 },
      { id: "28c", name: "I Wanna Be the Guy", link: "https://codeforces.com/problemset/problem/469/A", platform: "codeforces", difficulty: "medium", rating: 800 },
    ],
  },
  {
    day: 29,
    topic: "System Design Basics",
    description: "High-level architecture concepts",
    icon: "🏗️",
    problems: [
      { id: "29a", name: "Design HashMap", link: "https://leetcode.com/problems/design-hashmap/", platform: "leetcode", difficulty: "easy" },
      { id: "29b", name: "Design Twitter", link: "https://leetcode.com/problems/design-twitter/", platform: "leetcode", difficulty: "medium" },
      { id: "29c", name: "Design Browser History", link: "https://leetcode.com/problems/design-browser-history/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 30,
    topic: "Contest Simulation",
    description: "Timed problem solving practice",
    icon: "⏱️",
    problems: [
      { id: "30a", name: "Product of Array Except Self", link: "https://leetcode.com/problems/product-of-array-except-self/", platform: "leetcode", difficulty: "medium" },
      { id: "30b", name: "Decode Ways", link: "https://leetcode.com/problems/decode-ways/", platform: "leetcode", difficulty: "medium" },
      { id: "30c", name: "Maximum Product Subarray", link: "https://leetcode.com/problems/maximum-product-subarray/", platform: "leetcode", difficulty: "medium" },
    ],
  },
  {
    day: 31,
    topic: "Final Challenge",
    description: "Test your complete CP skills",
    icon: "🏆",
    problems: [
      { id: "31a", name: "Regular Expression Matching", link: "https://leetcode.com/problems/regular-expression-matching/", platform: "leetcode", difficulty: "hard" },
      { id: "31b", name: "Burst Balloons", link: "https://leetcode.com/problems/burst-balloons/", platform: "leetcode", difficulty: "hard" },
      { id: "31c", name: "Longest Increasing Path in Matrix", link: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", platform: "leetcode", difficulty: "hard" },
    ],
  },
];

// Get all unique topics
export const getAllTopics = (): string[] => {
  return [...new Set(cp31Sheet.map(day => day.topic))];
};

// Get problem count by difficulty
export const getProblemStats = () => {
  let easy = 0, medium = 0, hard = 0;
  cp31Sheet.forEach(day => {
    day.problems.forEach(problem => {
      if (problem.difficulty === 'easy') easy++;
      else if (problem.difficulty === 'medium') medium++;
      else hard++;
    });
  });
  return { easy, medium, hard, total: easy + medium + hard };
};
