(() => {
  if (window.__leetsenseInstalled) return;
  window.__leetsenseInstalled = true;
  const listenersInstalled = new WeakSet();
  const providers = new Set();
  const snippets = {
    python: [
      { label: 'listcomp', insertText: '[${1:x} for ${2:x} in ${3:items}]', detail: 'List comprehension' },
      { label: 'defaultdict', insertText: 'defaultdict(${1:int})', detail: 'collections.defaultdict' },
      { label: 'deque', insertText: 'deque(${1:[]})', detail: 'collections.deque' },
      { label: 'heapify', insertText: 'heapify(${1:nums})', detail: 'heapq.heapify' },
      { label: 'dfs', insertText: 'def dfs(${1:node}):\n\tif not ${1:node}:\n\t\treturn\n\t${2:# visit node}\n\tfor ${3:neighbor} in ${4:graph}[${1:node}]:\n\t\tdfs(${3:neighbor})', detail: 'Depth-first search' },
      { label: 'bfs', insertText: 'queue = deque([${1:start}])\nseen = {${1:start}}\nwhile queue:\n\t${2:node} = queue.popleft()\n\tfor ${3:neighbor} in ${4:graph}[${2:node}]:\n\t\tif ${3:neighbor} not in seen:\n\t\t\tseen.add(${3:neighbor})\n\t\t\tqueue.append(${3:neighbor})', detail: 'Breadth-first search' },
      { label: 'binarysearch', insertText: 'left, right = ${1:0}, len(${2:nums}) - 1\nwhile left <= right:\n\tmid = (left + right) // 2\n\tif ${2:nums}[mid] == ${3:target}:\n\t\treturn mid\n\telif ${2:nums}[mid] < ${3:target}:\n\t\tleft = mid + 1\n\telse:\n\t\tright = mid - 1', detail: 'Binary search' }
    ],
    javascript: [
      { label: 'mapget', insertText: 'map.get(${1:key}) ?? ${2:0}', detail: 'Map lookup with fallback' },
      { label: 'freqmap', insertText: 'const freq = new Map();\nfor (const ${1:value} of ${2:items}) {\n  freq.set(${1:value}, (freq.get(${1:value}) ?? 0) + 1);\n}', detail: 'Frequency map' },
      { label: 'dfs', insertText: 'function dfs(${1:node}) {\n  if (!${1:node}) return;\n  ${2:// visit node}\n  for (const ${3:neighbor} of ${4:graph}.get(${1:node}) ?? []) {\n    dfs(${3:neighbor});\n  }\n}', detail: 'Depth-first search' },
      { label: 'bfs', insertText: 'const queue = [${1:start}];\nconst seen = new Set(queue);\nfor (let i = 0; i < queue.length; i++) {\n  const ${2:node} = queue[i];\n  for (const ${3:neighbor} of ${4:graph}.get(${2:node}) ?? []) {\n    if (!seen.has(${3:neighbor})) { seen.add(${3:neighbor}); queue.push(${3:neighbor}); }\n  }\n}', detail: 'Breadth-first search' },
      { label: 'binarysearch', insertText: 'let left = 0, right = ${1:nums}.length - 1;\nwhile (left <= right) {\n  const mid = left + Math.floor((right - left) / 2);\n  if (${1:nums}[mid] === ${2:target}) return mid;\n  if (${1:nums}[mid] < ${2:target}) left = mid + 1;\n  else right = mid - 1;\n}', detail: 'Binary search' }
    ],
    typescript: [],
    cpp: [
      { label: 'unorderedmap', insertText: 'unordered_map<${1:int}, ${2:int}> ${3:counts};', detail: 'Hash map' },
      { label: 'priorityqueue', insertText: 'priority_queue<${1:int}, vector<${1:int}>, greater<${1:int}>> ${2:pq};', detail: 'Min priority queue' },
      { label: 'bfs', insertText: 'queue<${1:int}> q;\nq.push(${2:start});\nunordered_set<${1:int}> seen{${2:start}};\nwhile (!q.empty()) {\n  auto ${3:node} = q.front(); q.pop();\n  for (auto ${4:next} : graph[${3:node}]) {\n    if (seen.insert(${4:next}).second) q.push(${4:next});\n  }\n}', detail: 'Breadth-first search' },
      { label: 'binarysearch', insertText: 'int left = 0, right = static_cast<int>(${1:nums}.size()) - 1;\nwhile (left <= right) {\n  int mid = left + (right - left) / 2;\n  if (${1:nums}[mid] == ${2:target}) return mid;\n  if (${1:nums}[mid] < ${2:target}) left = mid + 1;\n  else right = mid - 1;\n}', detail: 'Binary search' }
    ]
  };
  snippets.typescript = snippets.javascript;

  function attach() {
    const monaco = window.monaco;
    const editors = monaco?.editor?.getEditors?.() || [];
    for (const editor of editors) {
      const model = editor.getModel?.();
      const monacoLanguageId = model?.getLanguageId?.() || '';
      if (!model || !monacoLanguageId) continue;
      // LeetCode uses ids like "python3" while we classify it as Python for
      // its model. Register the simple word provider for the exact selected
      // language id, whatever language LeetCode currently uses.
      if (!providers.has(monacoLanguageId)) {
        providers.add(monacoLanguageId);
        monaco.languages.registerCompletionItemProvider(monacoLanguageId, {
          triggerCharacters: [],
          provideCompletionItems(model, position) {
            const word = model.getWordUntilPosition(position);
            const range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn
            };
            const names = [...new Set(model.getValue().match(/\b[A-Za-z_$][\w$]*\b/g) || [])];
            return {
              suggestions: names.map(label => ({
                label,
                kind: monaco.languages.CompletionItemKind.Variable,
                insertText: label,
                range,
                sortText: `0${label}`
              }))
            };
          }
        });
      }
      if (listenersInstalled.has(editor)) continue;
      listenersInstalled.add(editor);
      editor.onDidChangeModelContent(() => {
        // Run after Monaco has updated the model and cursor position.
        setTimeout(() => {
          const model = editor.getModel?.();
          const position = editor.getPosition?.();
          if (!model || !position || editor.hasTextFocus?.() === false) return;
          const word = model.getWordUntilPosition(position);
          if (word.word.length === 0) return;
          editor.trigger('leetsense-word-suggest', 'editor.action.triggerSuggest', {});
        }, 0);
      });
    }
  }

  // LeetCode mounts/replaces Monaco editors after navigation and language changes.
  const observer = new MutationObserver(attach);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  const timer = setInterval(() => {
    attach();
  }, 750);
  // LeetCode uses a long-lived SPA; stop polling when this frame is unloaded.
  window.addEventListener('pagehide', () => {
    observer.disconnect();
    clearInterval(timer);
  }, { once: true });
})();
