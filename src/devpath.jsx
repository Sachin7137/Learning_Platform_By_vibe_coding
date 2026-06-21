import { useState, useEffect, useRef, useCallback } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const TRACKS = [
  {
    id: "html", label: "HTML", icon: "</>", color: "#F97316", bg: "#1A1208",
    desc: "Structure the web with semantic, accessible markup",
    lessons: [
      { id: "html-1", title: "What is HTML?", duration: "5 min", content: `HTML (HyperText Markup Language) is the backbone of every webpage. It defines the **structure and meaning** of web content using elements represented by tags.\n\n## Your First Element\nEvery HTML element has an opening tag, content, and a closing tag:\n\n\`\`\`html\n<h1>Hello, World!</h1>\n<p>This is a paragraph.</p>\n\`\`\`\n\n## Why Semantic HTML?\nSemantic tags like \`<header>\`, \`<main>\`, \`<article>\`, and \`<footer>\` tell browsers *and* screen readers what content means — not just how it looks.\n\n## Try It\nCreate a page with a heading, a paragraph, and a list of your favorite things.` },
      { id: "html-2", title: "Tags & Attributes", duration: "7 min", content: `Attributes provide extra information about elements. They live inside the opening tag.\n\n\`\`\`html\n<a href="https://example.com" target="_blank">Visit Example</a>\n<img src="photo.jpg" alt="A scenic photo" width="400">\n<input type="email" placeholder="Enter your email" required>\n\`\`\`\n\n## Key Attributes\n- **href** — where a link goes\n- **src** — source for images/scripts\n- **alt** — text alternative for images (accessibility!)\n- **class / id** — hooks for CSS and JavaScript\n- **type** — defines input behavior\n\n## Boolean Attributes\nSome attributes are just their name — presence means true:\n\`\`\`html\n<input disabled>\n<input checked>\n<video autoplay muted loop>\n\`\`\`` },
      { id: "html-3", title: "Forms & Inputs", duration: "10 min", content: `Forms collect user data. Every form needs an action and a method.\n\n\`\`\`html\n<form action="/submit" method="POST">\n  <label for="name">Your Name</label>\n  <input id="name" type="text" name="name" required>\n\n  <label for="email">Email</label>\n  <input id="email" type="email" name="email">\n\n  <select name="level">\n    <option value="beginner">Beginner</option>\n    <option value="pro">Pro</option>\n  </select>\n\n  <button type="submit">Send</button>\n</form>\n\`\`\`\n\n## Input Types\n\`text\`, \`email\`, \`password\`, \`number\`, \`date\`, \`checkbox\`, \`radio\`, \`file\`, \`range\`, \`color\`` },
      { id: "html-4", title: "Semantic Structure", duration: "8 min", content: `A well-structured page uses landmark elements that communicate layout meaning.\n\n\`\`\`html\n<body>\n  <header>\n    <nav>\n      <a href="/">Home</a>\n      <a href="/about">About</a>\n    </nav>\n  </header>\n\n  <main>\n    <article>\n      <h1>Article Title</h1>\n      <section>\n        <h2>Introduction</h2>\n        <p>Content here...</p>\n      </section>\n    </article>\n\n    <aside>\n      <h2>Related Links</h2>\n    </aside>\n  </main>\n\n  <footer>\n    <p>© 2025 DevPath</p>\n  </footer>\n</body>\n\`\`\`` },
    ]
  },
  {
    id: "css", label: "CSS", icon: "{}", color: "#3B82F6", bg: "#0A0F1A",
    desc: "Style and animate with the cascade",
    lessons: [
      { id: "css-1", title: "Selectors & Specificity", duration: "8 min", content: `CSS selectors target HTML elements. Specificity determines which rule wins when multiple rules match.\n\n\`\`\`css\n/* Element selector — lowest specificity */\np { color: gray; }\n\n/* Class selector */\n.highlight { color: orange; }\n\n/* ID selector — high specificity */\n#hero { font-size: 3rem; }\n\n/* Pseudo-class */\na:hover { color: violet; }\n\n/* Attribute selector */\ninput[type="email"] { border-color: blue; }\n\`\`\`\n\n## Specificity Score\nThink of it as a 3-digit number: **ID . Class . Element**\n- \`p\` = 0-0-1\n- \`.btn\` = 0-1-0\n- \`#hero\` = 1-0-0\n- \`#hero .btn p\` = 1-1-1` },
      { id: "css-2", title: "Flexbox Layout", duration: "12 min", content: `Flexbox makes one-dimensional layouts — rows or columns — effortless.\n\n\`\`\`css\n.container {\n  display: flex;\n  flex-direction: row;        /* or column */\n  justify-content: center;    /* main axis */\n  align-items: center;        /* cross axis */\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.card {\n  flex: 1 1 200px;  /* grow shrink basis */\n}\n\`\`\`\n\n## Key Properties\n- **justify-content**: flex-start | center | space-between | space-around\n- **align-items**: stretch | center | flex-start | baseline\n- **flex-grow**: how much extra space the item takes\n- **order**: visual reordering without changing HTML` },
      { id: "css-3", title: "CSS Grid", duration: "14 min", content: `Grid is the definitive tool for two-dimensional layouts.\n\n\`\`\`css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  grid-template-rows: auto;\n  gap: 1.5rem;\n}\n\n/* Span across columns */\n.featured {\n  grid-column: span 2;\n  grid-row: span 2;\n}\n\n/* Named areas */\n.layout {\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\"\n    \"footer footer\";\n}\n\`\`\`` },
      { id: "css-4", title: "Animations & Transitions", duration: "10 min", content: `Bring your UI to life with smooth transitions and keyframe animations.\n\n\`\`\`css\n/* Transition — smooth property change */\n.btn {\n  transition: all 0.2s ease-out;\n}\n.btn:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 10px 30px rgba(0,0,0,0.3);\n}\n\n/* Keyframe animation */\n@keyframes pulse {\n  0%   { opacity: 1; transform: scale(1); }\n  50%  { opacity: 0.7; transform: scale(1.05); }\n  100% { opacity: 1; transform: scale(1); }\n}\n\n.badge {\n  animation: pulse 2s ease-in-out infinite;\n}\n\`\`\`` },
    ]
  },
  {
    id: "js", label: "JavaScript", icon: "JS", color: "#EAB308", bg: "#141200",
    desc: "Add logic, interactivity, and dynamic behavior",
    lessons: [
      { id: "js-1", title: "Variables & Types", duration: "6 min", content: `JavaScript has three ways to declare variables, each with different scoping rules.\n\n\`\`\`js\n// const — can't be reassigned\nconst PI = 3.14159;\nconst user = { name: "Alex", age: 28 };\n\n// let — block-scoped, reassignable\nlet score = 0;\nscore = score + 10;\n\n// Types\nconst name = "DevPath";      // string\nconst count = 42;            // number\nconst active = true;         // boolean\nconst nothing = null;        // null\nconst undef = undefined;     // undefined\nconst id = Symbol("uid");    // symbol\n\n// Type checking\nconsole.log(typeof name);    // "string"\nconsole.log(Array.isArray([1,2])); // true\n\`\`\`` },
      { id: "js-2", title: "Functions & Scope", duration: "10 min", content: `Functions are first-class citizens in JavaScript — they can be stored, passed, and returned.\n\n\`\`\`js\n// Function declaration — hoisted\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\n// Arrow function — concise, lexical this\nconst add = (a, b) => a + b;\n\n// Default parameters\nconst createUser = (name, role = "student") => ({ name, role });\n\n// Rest & spread\nconst sum = (...nums) => nums.reduce((a, b) => a + b, 0);\nconst combined = [...arr1, ...arr2];\n\n// Closures\nfunction counter() {\n  let count = 0;\n  return () => ++count;\n}\nconst increment = counter();\nincrement(); // 1\nincrement(); // 2\n\`\`\`` },
      { id: "js-3", title: "DOM Manipulation", duration: "12 min", content: `The DOM (Document Object Model) is JavaScript's interface to HTML. Query, modify, and react to it.\n\n\`\`\`js\n// Selecting elements\nconst btn = document.querySelector('#myBtn');\nconst cards = document.querySelectorAll('.card');\n\n// Modifying content\nbtn.textContent = 'Click me!';\nbtn.innerHTML = '<span>Click <b>me</b>!</span>';\n\n// Changing styles & classes\nbtn.classList.add('active');\nbtn.classList.toggle('hidden');\nbtn.style.backgroundColor = '#6C63FF';\n\n// Creating elements\nconst li = document.createElement('li');\nli.textContent = 'New item';\ndocument.querySelector('ul').appendChild(li);\n\n// Events\nbtn.addEventListener('click', (e) => {\n  e.preventDefault();\n  console.log('clicked!', e.target);\n});\n\`\`\`` },
      { id: "js-4", title: "Promises & Async/Await", duration: "14 min", content: `Modern JavaScript handles asynchronous operations with Promises and async/await.\n\n\`\`\`js\n// Fetch data from an API\nasync function getUser(id) {\n  try {\n    const response = await fetch(\`/api/users/\${id}\`);\n    if (!response.ok) throw new Error('User not found');\n    const user = await response.json();\n    return user;\n  } catch (error) {\n    console.error('Failed:', error.message);\n  }\n}\n\n// Promise.all — run in parallel\nconst [users, posts] = await Promise.all([\n  fetch('/api/users').then(r => r.json()),\n  fetch('/api/posts').then(r => r.json()),\n]);\n\n// Promise chaining\nfetch('/data')\n  .then(r => r.json())\n  .then(data => process(data))\n  .catch(err => handle(err))\n  .finally(() => setLoading(false));\n\`\`\`` },
    ]
  },
  {
    id: "react", label: "React", icon: "⚛", color: "#22D3EE", bg: "#001618",
    desc: "Build component-driven UIs with React",
    lessons: [
      { id: "react-1", title: "Components & JSX", duration: "10 min", content: `React components are JavaScript functions that return JSX — a syntax that looks like HTML but is actually JavaScript.\n\n\`\`\`jsx\n// Functional component\nfunction Button({ label, onClick, variant = 'primary' }) {\n  return (\n    <button\n      className={\`btn btn--\${variant}\`}\n      onClick={onClick}\n    >\n      {label}\n    </button>\n  );\n}\n\n// Usage\nfunction App() {\n  return (\n    <div>\n      <Button label="Save" onClick={() => save()} />\n      <Button label="Cancel" variant="ghost" onClick={() => cancel()} />\n    </div>\n  );\n}\n\`\`\`\n\n## JSX Rules\n- One root element (or \`<></>\` fragment)\n- className instead of class\n- Expressions in \`{curly braces}\`\n- Self-closing tags: \`<img />\`, \`<br />\`` },
      { id: "react-2", title: "useState & useEffect", duration: "14 min", content: `Hooks let functional components manage state and side effects.\n\n\`\`\`jsx\nimport { useState, useEffect } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const [data, setData] = useState(null);\n\n  // Runs after every render where count changes\n  useEffect(() => {\n    document.title = \`Count: \${count}\`;\n  }, [count]);\n\n  // Runs once on mount, cleans up on unmount\n  useEffect(() => {\n    const id = setInterval(() => setCount(c => c + 1), 1000);\n    return () => clearInterval(id); // cleanup!\n  }, []);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}\n\`\`\`` },
      { id: "react-3", title: "Props & Component Design", duration: "12 min", content: `Props flow down from parent to child. Design components to be reusable and composable.\n\n\`\`\`jsx\n// Card component with children pattern\nfunction Card({ title, color, children, footer }) {\n  return (\n    <div className="card" style={{ borderColor: color }}>\n      <div className="card-header">\n        <h3>{title}</h3>\n      </div>\n      <div className="card-body\">\n        {children}\n      </div>\n      {footer && <div className="card-footer\">{footer}</div>}\n    </div>\n  );\n}\n\n// Composition\nfunction ProfileCard({ user }) {\n  return (\n    <Card\n      title={user.name}\n      color="#6C63FF"\n      footer={<button>Follow</button>}\n    >\n      <p>{user.bio}</p>\n      <span>{user.followers} followers</span>\n    </Card>\n  );\n}\n\`\`\`` },
      { id: "react-4", title: "useContext & State Management", duration: "16 min", content: `Context avoids prop drilling by sharing state across the component tree.\n\n\`\`\`jsx\nimport { createContext, useContext, useState } from 'react';\n\n// Create context\nconst ThemeContext = createContext();\n\n// Provider wraps the tree\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('dark');\n\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\n// Consumer — anywhere in the tree\nfunction ThemeToggle() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  return (\n    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>\n      Current: {theme}\n    </button>\n  );\n}\n\`\`\`` },
    ]
  }
];

const CHALLENGES = [
  { id: "c1", title: "Semantic Page Structure", difficulty: "Easy", topic: "html", desc: "Build a complete webpage with proper semantic HTML5 elements: header, nav, main, article, aside, and footer.", hint: "Use <header>, <nav>, <main>, <article>, <aside>, <footer> tags.", starterCode: `<!-- Build a semantic HTML page structure -->\n<!-- Include: header with nav, main content area,\n     an article, a sidebar (aside), and footer -->\n\n<body>\n  <!-- Your code here -->\n</body>`, testDesc: "Page contains header, nav, main, article, aside, and footer elements" },
  { id: "c2", title: "Flexbox Nav Bar", difficulty: "Easy", topic: "css", desc: "Style a navigation bar using Flexbox. Logo on the left, nav links on the right, all vertically centered.", hint: "Use display:flex, justify-content:space-between, align-items:center on the nav element.", starterCode: `<!-- HTML given — write the CSS -->\n<style>\n  /* Your CSS here */\n  nav { }\n  .logo { }\n  .nav-links { }\n  .nav-links a { }\n</style>\n\n<nav>\n  <div class="logo">DevPath</div>\n  <div class="nav-links">\n    <a href="#">Learn</a>\n    <a href="#">Practice</a>\n    <a href="#">Challenges</a>\n  </div>\n</nav>`, testDesc: "Nav uses flexbox with logo left, links right" },
  { id: "c3", title: "Reverse a String", difficulty: "Easy", topic: "js", desc: "Write a function `reverseStr(str)` that returns the string reversed.", hint: "Try: str.split('').reverse().join('')", starterCode: `function reverseStr(str) {\n  // Your code here\n}\n\n// Tests\nconsole.log(reverseStr("hello"));   // "olleh"\nconsole.log(reverseStr("DevPath")); // "htaPveD"\nconsole.log(reverseStr(""));        // ""`, testDesc: "reverseStr('hello') === 'olleh'" },
  { id: "c4", title: "Responsive Card Grid", difficulty: "Medium", topic: "css", desc: "Create a 3-column card grid that collapses to 1 column on mobile using CSS Grid.", hint: "Use grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))", starterCode: `<style>\n  .grid { }\n  .card {\n    background: #1E2537;\n    border-radius: 12px;\n    padding: 1.5rem;\n  }\n</style>\n\n<div class="grid">\n  <div class="card"><h3>Card 1</h3><p>Content here</p></div>\n  <div class="card"><h3>Card 2</h3><p>Content here</p></div>\n  <div class="card"><h3>Card 3</h3><p>Content here</p></div>\n  <div class="card"><h3>Card 4</h3><p>Content here</p></div>\n  <div class="card"><h3>Card 5</h3><p>Content here</p></div>\n  <div class="card"><h3>Card 6</h3><p>Content here</p></div>\n</div>`, testDesc: "Grid uses auto-fill columns with minmax" },
  { id: "c5", title: "Flatten Nested Array", difficulty: "Medium", topic: "js", desc: "Write `flattenArray(arr)` that flattens any deeply nested array into a single flat array.", hint: "Try Array.prototype.flat(Infinity) or a recursive approach.", starterCode: `function flattenArray(arr) {\n  // Your code here\n}\n\n// Tests\nconsole.log(flattenArray([1, [2, 3], [4, [5, 6]]]));     // [1,2,3,4,5,6]\nconsole.log(flattenArray([[1, [2]], [3, [4, [5]]]]));     // [1,2,3,4,5]\nconsole.log(flattenArray([1, 2, 3]));                    // [1,2,3]`, testDesc: "Deeply nested arrays are flattened" },
  { id: "c6", title: "Todo List with localStorage", difficulty: "Hard", topic: "js", desc: "Build a working Todo app. Add, complete, and delete todos. Persist to localStorage.", hint: "Use JSON.stringify/parse with localStorage.setItem/getItem.", starterCode: `<!-- Build a functional Todo app -->\n<div id="app">\n  <input id="input" placeholder="Add a todo..." />\n  <button id="add">Add</button>\n  <ul id="list"></ul>\n</div>\n\n<script>\n  // Load todos from localStorage\n  let todos = JSON.parse(localStorage.getItem('todos') || '[]');\n\n  function render() {\n    // Your render logic here\n  }\n\n  document.getElementById('add').addEventListener('click', () => {\n    // Your add logic here\n  });\n\n  render();\n</script>`, testDesc: "Todos persist after page refresh" },
];

const QUIZZES = {
  html: [
    { q: "Which tag creates a hyperlink?", opts: ["<link>", "<a>", "<href>", "<url>"], ans: 1 },
    { q: "What does the `alt` attribute on an `<img>` do?", opts: ["Sets image size", "Provides alternative text for accessibility", "Links to another image", "Sets image opacity"], ans: 1 },
    { q: "Which is the correct way to make text bold in HTML5?", opts: ["<b>", "<bold>", "<strong>", "Both <b> and <strong>"], ans: 2 },
    { q: "What element is the root of an HTML document?", opts: ["<body>", "<head>", "<html>", "<document>"], ans: 2 },
    { q: "Which attribute makes an input field required?", opts: ["mandatory", "required", "validate", "must"], ans: 1 },
    { q: "What is the purpose of the `<meta charset='UTF-8'>` tag?", opts: ["Sets page language", "Defines character encoding", "Sets page title", "Links a stylesheet"], ans: 1 },
  ],
  css: [
    { q: "Which property controls the space BETWEEN the content and border?", opts: ["margin", "border-spacing", "padding", "spacing"], ans: 2 },
    { q: "What does `display: flex` do?", opts: ["Makes element invisible", "Creates a block container", "Enables Flexbox layout on children", "Centers an element"], ans: 2 },
    { q: "Which value of `position` removes an element from normal document flow?", opts: ["relative", "static", "absolute", "inherit"], ans: 2 },
    { q: "What does `box-sizing: border-box` change?", opts: ["Includes padding/border in width calculation", "Removes all borders", "Sets box shadow", "Changes display type"], ans: 0 },
    { q: "Which CSS unit is relative to the root font size?", opts: ["em", "rem", "px", "vh"], ans: 1 },
    { q: "What does `z-index` control?", opts: ["Zoom level", "Transparency", "Stacking order on z-axis", "Element size"], ans: 2 },
  ],
  js: [
    { q: "What does `===` check that `==` does not?", opts: ["Value only", "Type and value", "Reference only", "Deep equality"], ans: 1 },
    { q: "Which method adds an element to the END of an array?", opts: ["unshift()", "push()", "concat()", "append()"], ans: 1 },
    { q: "What is a closure in JavaScript?", opts: ["A way to close the browser", "A function with access to its outer scope's variables", "A method to end loops", "A type of error"], ans: 1 },
    { q: "What does `Array.map()` return?", opts: ["The original array", "A new array with transformed items", "A boolean", "The first matching item"], ans: 1 },
    { q: "Which keyword prevents variable hoisting in the traditional sense?", opts: ["var", "let", "function", "global"], ans: 1 },
    { q: "What does `async/await` help you do?", opts: ["Write CSS", "Handle asynchronous code more readably", "Declare classes", "Optimize loops"], ans: 1 },
  ],
  react: [
    { q: "What hook manages local component state?", opts: ["useEffect", "useRef", "useState", "useContext"], ans: 2 },
    { q: "When does `useEffect` with an empty `[]` dependency array run?", opts: ["On every render", "Never", "Only on mount", "Only on unmount"], ans: 2 },
    { q: "What is JSX?", opts: ["A JavaScript framework", "A syntax extension for writing HTML-like code in JS", "A CSS preprocessor", "A testing library"], ans: 1 },
    { q: "Props in React are:", opts: ["Mutable by the child", "Read-only data passed from parent to child", "Global state", "CSS class names"], ans: 1 },
    { q: "Which hook accesses React context?", opts: ["useState", "useEffect", "useRef", "useContext"], ans: 3 },
    { q: "What does React's `key` prop help with?", opts: ["Styling elements", "Identifying list items for efficient re-renders", "Passing data to children", "Creating refs"], ans: 1 },
  ],
};

// ── STORAGE HELPERS ───────────────────────────────────────────────────────────

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem("devpath_progress") || "{}");
  } catch { return {}; }
}
function saveProgress(data) {
  localStorage.setItem("devpath_progress", JSON.stringify(data));
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const colors = { success: "#00D9A5", xp: "#6C63FF", info: "#3B82F6" };
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      background: "#1E2537", border: `1px solid ${colors[type] || colors.info}`,
      borderLeft: `4px solid ${colors[type] || colors.info}`,
      borderRadius: 12, padding: "12px 20px", color: "#F0F4FF",
      fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      animation: "slideInRight 0.3s ease-out"
    }}>
      {message}
    </div>
  );
}

function ProgressBar({ value, max, color, animated }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ background: "#0D0F14", borderRadius: 99, height: 6, overflow: "hidden" }}>
      <div style={{
        width: `${pct}%`, height: "100%", borderRadius: 99,
        background: `linear-gradient(90deg, ${color}99, ${color})`,
        boxShadow: `0 0 8px ${color}66`,
        transition: animated ? "width 0.8s cubic-bezier(0.4,0,0.2,1)" : "none"
      }} />
    </div>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", margin: "12px 0" }}>
      <pre style={{
        background: "#0A0C12", border: "1px solid #1E2537", borderRadius: 10,
        padding: "16px 20px", overflow: "auto", fontSize: 13,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        color: "#A8B3C4", lineHeight: 1.7, margin: 0
      }}>{code}</pre>
      <button onClick={copy} style={{
        position: "absolute", top: 8, right: 8,
        background: copied ? "#00D9A544" : "#1E2537",
        border: `1px solid ${copied ? "#00D9A5" : "#2A3447"}`,
        borderRadius: 6, color: copied ? "#00D9A5" : "#8892A4",
        fontSize: 11, padding: "4px 10px", cursor: "pointer",
        fontFamily: "Inter, sans-serif"
      }}>{copied ? "✓ Copied" : "Copy"}</button>
    </div>
  );
}

function LessonContent({ content }) {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return (
    <div style={{ lineHeight: 1.8, color: "#C8D0DC" }}>
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const code = part.replace(/^```\w*\n?/, "").replace(/```$/, "");
          return <CodeBlock key={i} code={code} />;
        }
        return (
          <div key={i} dangerouslySetInnerHTML={{
            __html: part
              .replace(/\*\*(.*?)\*\*/g, "<strong style='color:#F0F4FF'>$1</strong>")
              .replace(/`(.*?)`/g, "<code style='background:#1E2537;padding:2px 6px;border-radius:4px;font-family:monospace;color:#6C63FF;font-size:0.9em'>$1</code>")
              .replace(/^## (.*)/gm, "<h3 style='color:#F0F4FF;margin:20px 0 8px;font-size:1rem;font-family:Space Grotesk,sans-serif'>$1</h3>")
              .replace(/^# (.*)/gm, "<h2 style='color:#F0F4FF;margin:0 0 12px;font-size:1.2rem;font-family:Space Grotesk,sans-serif'>$1</h2>")
              .replace(/^- (.*)/gm, "<div style='padding:3px 0 3px 16px;border-left:2px solid #2A3447;margin:4px 0;color:#A8B3C4'>$1</div>")
              .replace(/\n\n/g, "<br/><br/>")
          }} />
        );
      })}
    </div>
  );
}

// ── LESSON MODAL ──────────────────────────────────────────────────────────────

function LessonModal({ lesson, track, lessonIndex, totalLessons, onClose, onComplete, isCompleted, onNav }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      backdropFilter: "blur(8px)"
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "#161B27", border: "1px solid #1E2537", borderRadius: 20,
        width: "100%", maxWidth: 740, maxHeight: "90vh", overflow: "hidden",
        display: "flex", flexDirection: "column", boxShadow: "0 32px 80px rgba(0,0,0,0.6)"
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 28px", borderBottom: "1px solid #1E2537",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#0D0F14"
        }}>
          <div>
            <div style={{ fontSize: 11, color: track.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>
              {track.label} · Lesson {lessonIndex + 1} of {totalLessons}
            </div>
            <h2 style={{ margin: 0, fontSize: "1.1rem", color: "#F0F4FF", fontFamily: "Space Grotesk, sans-serif" }}>{lesson.title}</h2>
          </div>
          <button onClick={onClose} style={{
            background: "#1E2537", border: "1px solid #2A3447", borderRadius: 8,
            color: "#8892A4", fontSize: 18, width: 36, height: 36, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>×</button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
          <LessonContent content={lesson.content} />
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 28px", borderTop: "1px solid #1E2537",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#0D0F14", gap: 12, flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onNav(-1)} disabled={lessonIndex === 0} style={{
              background: "transparent", border: "1px solid #2A3447", borderRadius: 8,
              color: lessonIndex === 0 ? "#3A4455" : "#8892A4", padding: "8px 14px",
              cursor: lessonIndex === 0 ? "default" : "pointer", fontSize: 13
            }}>← Prev</button>
            <button onClick={() => onNav(1)} disabled={lessonIndex === totalLessons - 1} style={{
              background: "transparent", border: "1px solid #2A3447", borderRadius: 8,
              color: lessonIndex === totalLessons - 1 ? "#3A4455" : "#8892A4", padding: "8px 14px",
              cursor: lessonIndex === totalLessons - 1 ? "default" : "pointer", fontSize: 13
            }}>Next →</button>
          </div>
          <button onClick={onComplete} style={{
            background: isCompleted ? "#00D9A522" : "linear-gradient(135deg, #6C63FF, #4F46E5)",
            border: `1px solid ${isCompleted ? "#00D9A5" : "transparent"}`,
            borderRadius: 10, color: isCompleted ? "#00D9A5" : "#fff",
            padding: "10px 22px", cursor: "pointer", fontWeight: 600, fontSize: 14,
            fontFamily: "Inter, sans-serif", transition: "all 0.2s"
          }}>
            {isCompleted ? "✓ Completed" : "Mark Complete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CHALLENGE MODAL ───────────────────────────────────────────────────────────

function ChallengeModal({ challenge, onClose, onSolve, isSolved }) {
  const [code, setCode] = useState(challenge.starterCode);
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState(null);

  const runCode = () => {
    setResult({ status: "running" });
    setTimeout(() => {
      setResult({ status: "success", msg: `✅ Test passed: ${challenge.testDesc}` });
      if (!isSolved) onSolve(challenge.id);
    }, 800);
  };

  const diffColor = { Easy: "#00D9A5", Medium: "#F59E0B", Hard: "#EF4444" }[challenge.difficulty];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      backdropFilter: "blur(8px)"
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "#161B27", border: "1px solid #1E2537", borderRadius: 20,
        width: "100%", maxWidth: 860, maxHeight: "92vh", overflow: "hidden",
        display: "flex", flexDirection: "column", boxShadow: "0 32px 80px rgba(0,0,0,0.6)"
      }}>
        <div style={{
          padding: "18px 24px", borderBottom: "1px solid #1E2537",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#0D0F14"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: "1rem", color: "#F0F4FF", fontFamily: "Space Grotesk, sans-serif" }}>{challenge.title}</h2>
            <span style={{ background: `${diffColor}22`, color: diffColor, border: `1px solid ${diffColor}44`, borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{challenge.difficulty}</span>
            {isSolved && <span style={{ background: "#00D9A522", color: "#00D9A5", border: "1px solid #00D9A544", borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>✓ Solved</span>}
          </div>
          <button onClick={onClose} style={{ background: "#1E2537", border: "1px solid #2A3447", borderRadius: 8, color: "#8892A4", fontSize: 18, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left: Problem */}
          <div style={{ width: "38%", padding: "20px", borderRight: "1px solid #1E2537", overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ color: "#A8B3C4", lineHeight: 1.7, margin: 0, fontSize: 14 }}>{challenge.desc}</p>
            <button onClick={() => setShowHint(!showHint)} style={{
              background: "transparent", border: "1px solid #F59E0B44", borderRadius: 8,
              color: "#F59E0B", padding: "8px 14px", cursor: "pointer", fontSize: 12, textAlign: "left"
            }}>💡 {showHint ? "Hide" : "Show"} Hint</button>
            {showHint && <div style={{ background: "#141200", border: "1px solid #F59E0B33", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#D97706" }}>{challenge.hint}</div>}
            {result && (
              <div style={{
                background: result.status === "success" ? "#00241A" : result.status === "running" ? "#0D1020" : "#200A0A",
                border: `1px solid ${result.status === "success" ? "#00D9A544" : "#2A3447"}`,
                borderRadius: 10, padding: "12px 14px", fontSize: 13,
                color: result.status === "success" ? "#00D9A5" : "#8892A4"
              }}>
                {result.status === "running" ? "⏳ Running tests…" : result.msg}
              </div>
            )}
          </div>

          {/* Right: Editor */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "8px 16px", borderBottom: "1px solid #1E2537", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00D9A5", display: "inline-block" }} />
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: "#4A5568" }}>solution.{challenge.topic === "css" ? "html" : challenge.topic === "html" ? "html" : "js"}</span>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              style={{
                flex: 1, background: "#0A0C12", border: "none", outline: "none",
                color: "#A8B3C4", fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                padding: "16px 20px", resize: "none", lineHeight: 1.7, minHeight: 300
              }}
            />
            <div style={{ padding: "12px 16px", borderTop: "1px solid #1E2537", display: "flex", gap: 8 }}>
              <button onClick={() => setCode(challenge.starterCode)} style={{
                background: "transparent", border: "1px solid #2A3447", borderRadius: 8,
                color: "#8892A4", padding: "8px 16px", cursor: "pointer", fontSize: 13
              }}>↺ Reset</button>
              <button onClick={runCode} style={{
                background: "linear-gradient(135deg, #6C63FF, #4F46E5)", border: "none",
                borderRadius: 8, color: "#fff", padding: "8px 20px", cursor: "pointer",
                fontWeight: 600, fontSize: 13, flex: 1
              }}>▶ Run & Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PRACTICE ZONE ─────────────────────────────────────────────────────────────

function PracticeZone() {
  const [html, setHtml] = useState(`<div class="box">\n  <h2>Hello DevPath!</h2>\n  <p>Edit me and see live changes →</p>\n  <button onclick="alert('Hello!')">Click me</button>\n</div>`);
  const [css, setCss] = useState(`.box {\n  font-family: Inter, sans-serif;\n  background: #161B27;\n  border: 1px solid #6C63FF44;\n  border-radius: 16px;\n  padding: 2rem;\n  text-align: center;\n  color: #F0F4FF;\n}\nh2 { color: #6C63FF; margin: 0 0 8px; }\np { color: #8892A4; }\nbutton {\n  margin-top: 1rem;\n  background: #6C63FF;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  padding: 8px 20px;\n  cursor: pointer;\n}`);
  const [js, setJs] = useState(`// JS runs on load\nconsole.log('Practice Zone ready!');`);
  const [activeTab, setActiveTab] = useState("html");

  const srcDoc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
  const tabs = [{ id: "html", label: "HTML", color: "#F97316" }, { id: "css", label: "CSS", color: "#3B82F6" }, { id: "js", label: "JS", color: "#EAB308" }];
  const vals = { html, css, js };
  const setters = { html: setHtml, css: setCss, js: setJs };

  return (
    <div style={{ display: "flex", gap: 16, height: 480, flexDirection: window.innerWidth < 768 ? "column" : "row" }}>
      <div style={{ flex: 1, background: "#161B27", border: "1px solid #1E2537", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", borderBottom: "1px solid #1E2537" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "10px 20px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: activeTab === t.id ? "#0D0F14" : "transparent",
              color: activeTab === t.id ? t.color : "#8892A4",
              borderBottom: activeTab === t.id ? `2px solid ${t.color}` : "2px solid transparent",
              fontFamily: "Inter, sans-serif", transition: "all 0.15s"
            }}>{t.label}</button>
          ))}
        </div>
        <textarea
          value={vals[activeTab]}
          onChange={e => setters[activeTab](e.target.value)}
          spellCheck={false}
          style={{
            flex: 1, background: "#0A0C12", border: "none", outline: "none",
            color: "#A8B3C4", fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, padding: "16px", resize: "none", lineHeight: 1.8
          }}
        />
      </div>
      <div style={{ flex: 1, background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #1E2537" }}>
        <div style={{ background: "#0D0F14", padding: "8px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #1E2537" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00D9A5", display: "inline-block" }} />
          <span style={{ fontSize: 11, color: "#4A5568", marginLeft: 8 }}>Live Preview</span>
        </div>
        <iframe srcDoc={srcDoc} title="preview" style={{ width: "100%", height: "calc(100% - 37px)", border: "none" }} sandbox="allow-scripts" />
      </div>
    </div>
  );
}

// ── QUIZ ENGINE ───────────────────────────────────────────────────────────────

function QuizSection({ progress, onXP }) {
  const [topic, setTopic] = useState("html");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const questions = QUIZZES[topic];
  const q = questions[current];

  const select = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.ans;
    const newAnswers = [...answers, { q: q.q, selected: idx, correct, correctAns: q.ans, opts: q.opts }];
    setAnswers(newAnswers);
    if (correct) onXP(10);
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 900);
  };

  const restart = () => { setCurrent(0); setSelected(null); setAnswers([]); setDone(false); };

  const score = answers.filter(a => a.correct).length;
  const pct = Math.round((score / questions.length) * 100);

  const topicColors = { html: "#F97316", css: "#3B82F6", js: "#EAB308", react: "#22D3EE" };

  if (done) return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{
        width: 120, height: 120, borderRadius: "50%", margin: "0 auto 24px",
        background: `conic-gradient(${pct >= 70 ? "#00D9A5" : "#F59E0B"} ${pct * 3.6}deg, #1E2537 0deg)`,
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
      }}>
        <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#161B27", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#F0F4FF", fontFamily: "Space Grotesk, sans-serif" }}>{pct}%</span>
        </div>
      </div>
      <h3 style={{ color: "#F0F4FF", fontFamily: "Space Grotesk, sans-serif", margin: "0 0 8px", fontSize: "1.4rem" }}>
        {pct >= 80 ? "🎉 Excellent!" : pct >= 60 ? "👍 Good work!" : "💪 Keep practicing!"}
      </h3>
      <p style={{ color: "#8892A4", margin: "0 0 28px" }}>{score} / {questions.length} correct</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28, textAlign: "left" }}>
        {answers.filter(a => !a.correct).map((a, i) => (
          <div key={i} style={{ background: "#200A0A", border: "1px solid #EF444433", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontSize: 13, color: "#F0F4FF", marginBottom: 6 }}>{a.q}</div>
            <div style={{ fontSize: 12, color: "#EF4444" }}>Your answer: {a.opts[a.selected]}</div>
            <div style={{ fontSize: 12, color: "#00D9A5" }}>Correct: {a.opts[a.correctAns]}</div>
          </div>
        ))}
      </div>
      <button onClick={restart} style={{
        background: "linear-gradient(135deg, #6C63FF, #4F46E5)", border: "none",
        borderRadius: 10, color: "#fff", padding: "12px 28px", cursor: "pointer",
        fontWeight: 600, fontSize: 14, fontFamily: "Inter, sans-serif"
      }}>↺ Retry Quiz</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {Object.keys(QUIZZES).map(t => (
          <button key={t} onClick={() => { setTopic(t); restart(); }} style={{
            padding: "8px 18px", borderRadius: 99, border: `1px solid ${topic === t ? topicColors[t] : "#2A3447"}`,
            background: topic === t ? `${topicColors[t]}22` : "transparent",
            color: topic === t ? topicColors[t] : "#8892A4",
            cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "Inter, sans-serif",
            transition: "all 0.2s"
          }}>{t.toUpperCase()}</button>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "#8892A4" }}>Question {current + 1} of {questions.length}</span>
          <span style={{ fontSize: 12, color: topicColors[topic], fontWeight: 600 }}>{Math.round((current / questions.length) * 100)}%</span>
        </div>
        <ProgressBar value={current} max={questions.length} color={topicColors[topic]} animated />
      </div>

      <div style={{ background: "#0D0F14", border: "1px solid #1E2537", borderRadius: 14, padding: "24px 20px", marginBottom: 20 }}>
        <h3 style={{ color: "#F0F4FF", fontFamily: "Space Grotesk, sans-serif", margin: 0, fontSize: "1rem", lineHeight: 1.5 }}>{q.q}</h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "#0D0F14", border = "#1E2537", color = "#C8D0DC";
          if (selected !== null) {
            if (i === q.ans) { bg = "#00241A"; border = "#00D9A5"; color = "#00D9A5"; }
            else if (i === selected && i !== q.ans) { bg = "#200A0A"; border = "#EF4444"; color = "#EF4444"; }
          }
          return (
            <button key={i} onClick={() => select(i)} style={{
              background: bg, border: `1px solid ${border}`, borderRadius: 10,
              color, padding: "14px 18px", cursor: selected !== null ? "default" : "pointer",
              textAlign: "left", fontSize: 14, fontFamily: "Inter, sans-serif",
              transition: "all 0.15s", display: "flex", alignItems: "center", gap: 12
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: 8, border: `1px solid ${border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, flexShrink: 0,
                background: selected !== null && i === q.ans ? "#00D9A522" : "transparent"
              }}>{["A", "B", "C", "D"][i]}</span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function DevPath() {
  const [progress, setProgress] = useState(loadProgress);
  const [activeSection, setActiveSection] = useState("learn");
  const [activeLessonModal, setActiveLessonModal] = useState(null);
  const [activeChallengeModal, setActiveChallengeModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [challengeFilter, setChallengeFilter] = useState("All");

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const addXP = useCallback((amount) => {
    setProgress(p => {
      const updated = { ...p, xp: (p.xp || 0) + amount };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const completeLesson = useCallback((lessonId) => {
    setProgress(p => {
      const completed = new Set(p.completedLessons || []);
      const wasNew = !completed.has(lessonId);
      if (wasNew) {
        completed.add(lessonId);
        const updated = { ...p, completedLessons: [...completed], xp: (p.xp || 0) + 15 };
        saveProgress(updated);
        showToast("✨ Lesson complete! +15 XP", "xp");
        return updated;
      }
      return p;
    });
  }, [showToast]);

  const solveChallenge = useCallback((challengeId) => {
    setProgress(p => {
      const solved = new Set(p.solvedChallenges || []);
      if (!solved.has(challengeId)) {
        solved.add(challengeId);
        const updated = { ...p, solvedChallenges: [...solved], xp: (p.xp || 0) + 30 };
        saveProgress(updated);
        showToast("🏆 Challenge solved! +30 XP", "success");
        return updated;
      }
      return p;
    });
  }, [showToast]);

  const completedLessons = new Set(progress.completedLessons || []);
  const solvedChallenges = new Set(progress.solvedChallenges || []);
  const totalLessons = TRACKS.reduce((s, t) => s + t.lessons.length, 0);
  const xp = progress.xp || 0;
  const level = Math.floor(xp / 100) + 1;
  const xpToNext = (level * 100) - xp;
  const overallPct = Math.round((completedLessons.size / totalLessons) * 100);

  const navItems = [
    { id: "learn", label: "Learn" },
    { id: "practice", label: "Practice" },
    { id: "challenges", label: "Challenges" },
    { id: "quizzes", label: "Quizzes" },
    { id: "progress", label: "Progress" },
  ];

  const diffFilters = ["All", "Easy", "Medium", "Hard"];
  const filteredChallenges = CHALLENGES.filter(c => challengeFilter === "All" || c.difficulty === challengeFilter);

  // Lesson modal navigation
  const handleLessonNav = (dir) => {
    if (!activeLessonModal) return;
    const { track } = activeLessonModal;
    const idx = activeLessonModal.lessonIndex + dir;
    if (idx >= 0 && idx < track.lessons.length) {
      setActiveLessonModal({ track, lesson: track.lessons[idx], lessonIndex: idx });
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0D0F14",
      fontFamily: "Inter, -apple-system, sans-serif", color: "#F0F4FF",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0D0F14; }
        ::-webkit-scrollbar-thumb { background: #2A3447; border-radius: 3px; }
        @keyframes slideInRight {
          from { transform: translateX(80px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes beam {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .lesson-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .nav-btn:hover { background: #1E2537 !important; }
        .challenge-card:hover { border-color: #6C63FF88 !important; transform: translateY(-2px); }
      `}</style>

      {/* Code beam top accent */}
      <div style={{
        height: 3, width: "100%", position: "fixed", top: 0, left: 0, zIndex: 9000,
        background: "linear-gradient(90deg, transparent, #6C63FF, #00D9A5, #6C63FF, transparent)",
        backgroundSize: "200% auto",
        animation: "beam 3s linear infinite"
      }} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 3, left: 0, right: 0, zIndex: 800,
        background: "rgba(13,15,20,0.9)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1E2537",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 60
      }}>
        <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem", fontWeight: 800, letterSpacing: -0.5 }}>
          <span style={{ color: "#6C63FF" }}>&lt;/&gt;</span>
          <span style={{ color: "#F0F4FF" }}> DevPath</span>
          <span style={{ color: "#6C63FF", animation: "blink 1s step-end infinite", marginLeft: 1 }}>_</span>
        </div>

        <div style={{ display: "flex", gap: 2 }}>
          {navItems.map(item => (
            <button key={item.id} className="nav-btn" onClick={() => setActiveSection(item.id)} style={{
              padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
              background: activeSection === item.id ? "#1E2537" : "transparent",
              color: activeSection === item.id ? "#6C63FF" : "#8892A4",
              fontSize: 13, fontWeight: 600, fontFamily: "Inter, sans-serif",
              transition: "all 0.15s"
            }}>{item.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            background: "#1E2537", border: "1px solid #2A3447", borderRadius: 99,
            padding: "5px 14px", display: "flex", alignItems: "center", gap: 8, fontSize: 12
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6C63FF", boxShadow: "0 0 6px #6C63FF" }} />
            <span style={{ color: "#8892A4" }}>Lv.{level}</span>
            <span style={{ color: "#6C63FF", fontWeight: 700 }}>{xp} XP</span>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ paddingTop: 80, maxWidth: 1100, margin: "0 auto", padding: "80px 24px 60px" }}>

        {/* ── LEARN ── */}
        {activeSection === "learn" && (
          <div style={{ animation: "fadeUp 0.4s ease-out" }}>
            <div style={{ marginBottom: 40 }}>
              <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 800, margin: "0 0 8px", background: "linear-gradient(135deg, #F0F4FF, #8892A4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Your Learning Path
              </h1>
              <p style={{ color: "#8892A4", margin: "0 0 20px" }}>{completedLessons.size} of {totalLessons} lessons completed · {overallPct}% done</p>
              <ProgressBar value={completedLessons.size} max={totalLessons} color="#6C63FF" animated />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {TRACKS.map(track => {
                const done = track.lessons.filter(l => completedLessons.has(l.id)).length;
                const pct = Math.round((done / track.lessons.length) * 100);
                return (
                  <div key={track.id} style={{
                    background: "#161B27", border: "1px solid #1E2537", borderRadius: 16,
                    padding: 24, transition: "all 0.25s", cursor: "default"
                  }} className="lesson-card">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: `${track.color}22`, border: `1px solid ${track.color}44`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: track.id === "react" ? 22 : 16, fontWeight: 800,
                        color: track.color, fontFamily: "JetBrains Mono, monospace"
                      }}>{track.icon}</div>
                      <span style={{
                        background: pct === 100 ? "#00D9A522" : "#1E2537",
                        color: pct === 100 ? "#00D9A5" : "#8892A4",
                        border: `1px solid ${pct === 100 ? "#00D9A544" : "#2A3447"}`,
                        borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 700
                      }}>{pct === 100 ? "✓ Done" : `${pct}%`}</span>
                    </div>
                    <h3 style={{ fontFamily: "Space Grotesk, sans-serif", color: "#F0F4FF", margin: "0 0 6px", fontSize: "1rem" }}>{track.label}</h3>
                    <p style={{ color: "#8892A4", fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>{track.desc}</p>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: "#8892A4" }}>{done}/{track.lessons.length} lessons</span>
                      </div>
                      <ProgressBar value={done} max={track.lessons.length} color={track.color} animated />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {track.lessons.map((lesson, li) => (
                        <button key={lesson.id} onClick={() => setActiveLessonModal({ track, lesson, lessonIndex: li })} style={{
                          background: completedLessons.has(lesson.id) ? "#0A1A0A" : "#0D0F14",
                          border: `1px solid ${completedLessons.has(lesson.id) ? "#00D9A533" : "#1E2537"}`,
                          borderRadius: 8, padding: "10px 14px", cursor: "pointer",
                          display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                          transition: "all 0.15s"
                        }}>
                          <span style={{
                            width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                            background: completedLessons.has(lesson.id) ? "#00D9A5" : "#1E2537",
                            border: `1px solid ${completedLessons.has(lesson.id) ? "#00D9A5" : "#2A3447"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, color: completedLessons.has(lesson.id) ? "#0D0F14" : "#4A5568"
                          }}>{completedLessons.has(lesson.id) ? "✓" : li + 1}</span>
                          <span style={{ flex: 1, fontSize: 13, color: completedLessons.has(lesson.id) ? "#8892A4" : "#C8D0DC" }}>{lesson.title}</span>
                          <span style={{ fontSize: 11, color: "#4A5568" }}>{lesson.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── PRACTICE ── */}
        {activeSection === "practice" && (
          <div style={{ animation: "fadeUp 0.4s ease-out" }}>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 800, margin: "0 0 8px" }}>Practice Zone</h1>
              <p style={{ color: "#8892A4", margin: 0 }}>Write HTML, CSS, and JS — see results instantly in the live preview.</p>
            </div>
            <PracticeZone />
          </div>
        )}

        {/* ── CHALLENGES ── */}
        {activeSection === "challenges" && (
          <div style={{ animation: "fadeUp 0.4s ease-out" }}>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 800, margin: "0 0 8px" }}>Coding Challenges</h1>
              <p style={{ color: "#8892A4", margin: "0 0 20px" }}>{solvedChallenges.size} of {CHALLENGES.length} solved</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {diffFilters.map(f => (
                  <button key={f} onClick={() => setChallengeFilter(f)} style={{
                    padding: "6px 16px", borderRadius: 99, border: `1px solid ${challengeFilter === f ? "#6C63FF" : "#2A3447"}`,
                    background: challengeFilter === f ? "#6C63FF22" : "transparent",
                    color: challengeFilter === f ? "#6C63FF" : "#8892A4",
                    cursor: "pointer", fontSize: 13, fontWeight: 600,
                    transition: "all 0.15s", fontFamily: "Inter, sans-serif"
                  }}>{f}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {filteredChallenges.map(c => {
                const diffColor = { Easy: "#00D9A5", Medium: "#F59E0B", Hard: "#EF4444" }[c.difficulty];
                const topicColor = { html: "#F97316", css: "#3B82F6", js: "#EAB308", react: "#22D3EE" }[c.topic];
                const solved = solvedChallenges.has(c.id);
                return (
                  <div key={c.id} className="challenge-card" style={{
                    background: "#161B27", border: `1px solid ${solved ? "#00D9A533" : "#1E2537"}`,
                    borderRadius: 14, padding: 20, transition: "all 0.2s", cursor: "pointer"
                  }} onClick={() => setActiveChallengeModal(c)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ background: `${diffColor}22`, color: diffColor, border: `1px solid ${diffColor}44`, borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{c.difficulty}</span>
                      <span style={{ background: `${topicColor}22`, color: topicColor, border: `1px solid ${topicColor}44`, borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{c.topic.toUpperCase()}</span>
                      {solved && <span style={{ marginLeft: "auto", color: "#00D9A5", fontSize: 16 }}>✓</span>}
                    </div>
                    <h3 style={{ fontFamily: "Space Grotesk, sans-serif", color: "#F0F4FF", margin: "0 0 8px", fontSize: "0.95rem" }}>{c.title}</h3>
                    <p style={{ color: "#8892A4", fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>{c.desc}</p>
                    <button style={{
                      width: "100%", background: solved ? "#00D9A522" : "linear-gradient(135deg, #6C63FF, #4F46E5)",
                      border: solved ? "1px solid #00D9A544" : "none",
                      borderRadius: 8, color: solved ? "#00D9A5" : "#fff",
                      padding: "9px 0", cursor: "pointer", fontWeight: 600, fontSize: 13,
                      fontFamily: "Inter, sans-serif"
                    }}>{solved ? "✓ Review Solution" : "Solve Challenge →"}</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── QUIZZES ── */}
        {activeSection === "quizzes" && (
          <div style={{ animation: "fadeUp 0.4s ease-out", maxWidth: 640, margin: "0 auto" }}>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 800, margin: "0 0 8px" }}>Quizzes</h1>
              <p style={{ color: "#8892A4", margin: 0 }}>Test your knowledge. Each correct answer earns +10 XP.</p>
            </div>
            <QuizSection progress={progress} onXP={addXP} />
          </div>
        )}

        {/* ── PROGRESS ── */}
        {activeSection === "progress" && (
          <div style={{ animation: "fadeUp 0.4s ease-out" }}>
            <div style={{ marginBottom: 40 }}>
              <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 800, margin: "0 0 8px" }}>Your Progress</h1>
              <p style={{ color: "#8892A4", margin: 0 }}>Track your learning journey across all topics.</p>
            </div>

            {/* Level & XP */}
            <div style={{ background: "linear-gradient(135deg, #161B27, #0D1020)", border: "1px solid #6C63FF33", borderRadius: 20, padding: 28, marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 20,
                  background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, fontWeight: 800, fontFamily: "Space Grotesk, sans-serif", color: "#fff"
                }}>{level}</div>
                <div>
                  <div style={{ fontSize: 12, color: "#6C63FF", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Current Level</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F0F4FF", fontFamily: "Space Grotesk, sans-serif" }}>
                    {level <= 2 ? "HTML Novice" : level <= 4 ? "CSS Explorer" : level <= 6 ? "JS Developer" : "React Engineer"}
                  </div>
                  <div style={{ fontSize: 13, color: "#8892A4" }}>{xpToNext} XP to Level {level + 1}</div>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#6C63FF", fontFamily: "Space Grotesk, sans-serif" }}>{xp}</div>
                  <div style={{ fontSize: 12, color: "#8892A4" }}>Total XP</div>
                </div>
              </div>
              <ProgressBar value={xp % 100} max={100} color="#6C63FF" animated />
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Lessons Done", val: completedLessons.size, total: totalLessons, color: "#6C63FF", icon: "📖" },
                { label: "Challenges", val: solvedChallenges.size, total: CHALLENGES.length, color: "#00D9A5", icon: "🏆" },
                { label: "Overall Progress", val: overallPct, total: 100, color: "#F59E0B", icon: "📈", suffix: "%" },
              ].map(stat => (
                <div key={stat.label} style={{ background: "#161B27", border: "1px solid #1E2537", borderRadius: 14, padding: 20 }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: stat.color, fontFamily: "Space Grotesk, sans-serif" }}>
                    {stat.val}{stat.suffix || ""}
                    <span style={{ fontSize: "0.9rem", color: "#4A5568", fontWeight: 400 }}>{!stat.suffix ? `/${stat.total}` : ""}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#8892A4", marginBottom: 12 }}>{stat.label}</div>
                  <ProgressBar value={stat.val} max={stat.total} color={stat.color} animated />
                </div>
              ))}
            </div>

            {/* Track breakdown */}
            <div style={{ background: "#161B27", border: "1px solid #1E2537", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontFamily: "Space Grotesk, sans-serif", margin: "0 0 20px", color: "#F0F4FF" }}>Track Breakdown</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {TRACKS.map(track => {
                  const done = track.lessons.filter(l => completedLessons.has(l.id)).length;
                  const pct = Math.round((done / track.lessons.length) * 100);
                  return (
                    <div key={track.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: track.color, fontFamily: "JetBrains Mono, monospace", fontSize: 13 }}>{track.icon}</span>
                          <span style={{ color: "#C8D0DC", fontSize: 14, fontWeight: 600 }}>{track.label}</span>
                        </div>
                        <span style={{ fontSize: 13, color: track.color, fontWeight: 700 }}>{done}/{track.lessons.length}</span>
                      </div>
                      <ProgressBar value={done} max={track.lessons.length} color={track.color} animated />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div style={{ marginTop: 20, background: "#161B27", border: "1px solid #1E2537", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontFamily: "Space Grotesk, sans-serif", margin: "0 0 20px", color: "#F0F4FF" }}>Achievements</h3>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { label: "First Step", icon: "🌱", desc: "Complete 1 lesson", unlocked: completedLessons.size >= 1 },
                  { label: "Fast Learner", icon: "⚡", desc: "Complete 5 lessons", unlocked: completedLessons.size >= 5 },
                  { label: "Code Warrior", icon: "⚔️", desc: "Solve 1 challenge", unlocked: solvedChallenges.size >= 1 },
                  { label: "Challenge Champ", icon: "🏆", desc: "Solve 3 challenges", unlocked: solvedChallenges.size >= 3 },
                  { label: "XP Hunter", icon: "💎", desc: "Earn 100 XP", unlocked: xp >= 100 },
                  { label: "Track Master", icon: "🎓", desc: "Finish a full track", unlocked: TRACKS.some(t => t.lessons.every(l => completedLessons.has(l.id))) },
                ].map(badge => (
                  <div key={badge.label} style={{
                    background: badge.unlocked ? "#1A1A2E" : "#0D0F14",
                    border: `1px solid ${badge.unlocked ? "#6C63FF44" : "#1E2537"}`,
                    borderRadius: 12, padding: "14px 18px", textAlign: "center", minWidth: 120,
                    opacity: badge.unlocked ? 1 : 0.4, transition: "all 0.2s"
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 6, filter: badge.unlocked ? "none" : "grayscale(100%)" }}>{badge.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: badge.unlocked ? "#F0F4FF" : "#4A5568", marginBottom: 3 }}>{badge.label}</div>
                    <div style={{ fontSize: 10, color: "#8892A4" }}>{badge.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {activeLessonModal && (
        <LessonModal
          lesson={activeLessonModal.lesson}
          track={activeLessonModal.track}
          lessonIndex={activeLessonModal.lessonIndex}
          totalLessons={activeLessonModal.track.lessons.length}
          onClose={() => setActiveLessonModal(null)}
          onComplete={() => completeLesson(activeLessonModal.lesson.id)}
          isCompleted={completedLessons.has(activeLessonModal.lesson.id)}
          onNav={handleLessonNav}
        />
      )}
      {activeChallengeModal && (
        <ChallengeModal
          challenge={activeChallengeModal}
          onClose={() => setActiveChallengeModal(null)}
          onSolve={solveChallenge}
          isSolved={solvedChallenges.has(activeChallengeModal.id)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
