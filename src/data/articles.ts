import { ArticleStatus, type Article, type ArticleTag } from "../types/article";

// Mock article tags
export const mockTags: ArticleTag[] = [
  { id: "tag-1", name: "JavaScript", slug: "javascript" },
  { id: "tag-2", name: "Web Development", slug: "web-development" },
  { id: "tag-3", name: "Beginner", slug: "beginner" },
  { id: "tag-4", name: "React", slug: "react" },
  { id: "tag-5", name: "Frontend", slug: "frontend" },
  { id: "tag-6", name: "Components", slug: "components" },
  { id: "tag-7", name: "Node.js", slug: "nodejs" },
  { id: "tag-8", name: "Backend", slug: "backend" },
  { id: "tag-9", name: "Server", slug: "server" },
];

// Mock articles data
export const mockArticles: Article[] = [
  {
    id: "article-1",
    title: "Getting Started with JavaScript",
    slug: "getting-started-with-javascript",
    content: `# Getting Started with JavaScript

JavaScript is one of the most popular programming languages in the world. It powers the interactive elements on websites and is essential for modern web development.

## Why Learn JavaScript?

JavaScript is the language of the web. If you want to create interactive websites or web applications, JavaScript is a must-know technology. Here are some reasons to learn JavaScript:

1. **Ubiquity**: JavaScript runs in every web browser, making it the most accessible programming language.
2. **Versatility**: With Node.js, you can use JavaScript for backend development as well.
3. **Job Opportunities**: JavaScript developers are in high demand.
4. **Rich Ecosystem**: The npm registry has thousands of packages you can use in your projects.

## Setting Up Your Development Environment

To start coding in JavaScript, you need very little:

- A text editor (like VS Code, Sublime Text, or Atom)
- A web browser (Chrome, Firefox, etc.)

That's it! You can write JavaScript directly in your browser's console or create HTML files with embedded JavaScript.

## Your First JavaScript Program

Let's write a simple "Hello, World!" program:

\`\`\`javascript
// This is a comment
console.log("Hello, World!");
\`\`\`

You can run this code by:
1. Opening your browser's developer tools (F12 or right-click and select "Inspect")
2. Going to the "Console" tab
3. Typing or pasting the code and pressing Enter

## Next Steps

Now that you've written your first JavaScript program, here are some topics to explore next:

- Variables and data types
- Functions
- Control flow (if statements, loops)
- DOM manipulation
- Event handling

Happy coding!`,
    excerpt:
      "Learn the basics of JavaScript, the programming language of the web, and start your journey as a web developer.",
    authorId: "user-2",
    status: ArticleStatus.PUBLISHED,
    featuredImage: "/placeholder.svg?height=400&width=800",
    tags: [mockTags[0], mockTags[1], mockTags[2]], // JavaScript, Web Development, Beginner
    readTime: 5,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
    publishedAt: new Date("2023-01-10"),
    viewCount: 1250,
    likeCount: 89,
  },
  {
    id: "article-2",
    title: "Understanding React Components",
    slug: "understanding-react-components",
    content: `# Understanding React Components

Components are the building blocks of React applications. They allow you to split the UI into independent, reusable pieces.

## What is a Component?

In React, a component is a JavaScript function or class that optionally accepts inputs (called "props") and returns a React element that describes how a section of the UI should appear.

## Types of Components

React has two types of components:

### Functional Components

Functional components are JavaScript functions that accept props and return JSX:

\`\`\`jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

With the introduction of Hooks in React 16.8, functional components can now use state and other React features.

### Class Components

Class components are ES6 classes that extend React.Component:

\`\`\`jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
\`\`\`

## Component Composition

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail.

\`\`\`jsx
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
\`\`\`

## Props

Props (short for "properties") are inputs to components. They are passed from parent to child components:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}
\`\`\`

## State

State allows React components to change their output over time in response to user actions, network responses, and anything else.

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Conclusion

Components are the heart of React. Understanding how to create and compose components is essential for building React applications. As you become more comfortable with components, you'll appreciate the reusability and organization they bring to your code.`,
    excerpt:
      "Learn about React components, the building blocks of React applications, and how to use them effectively.",
    authorId: "user-5",
    status: ArticleStatus.PUBLISHED,
    featuredImage: "/placeholder.svg?height=400&width=800",
    tags: [mockTags[3], mockTags[0], mockTags[4], mockTags[5]], // React, JavaScript, Frontend, Components
    readTime: 8,
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-20"),
    publishedAt: new Date("2023-02-15"),
    viewCount: 2100,
    likeCount: 156,
  },
  {
    id: "article-3",
    title: "Introduction to Node.js",
    slug: "introduction-to-nodejs",
    content: `# Introduction to Node.js

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server side.

## Why Use Node.js?

Node.js has several advantages:

1. **JavaScript Everywhere**: Use the same language for both frontend and backend.
2. **Non-blocking I/O**: Node.js is designed to handle asynchronous operations efficiently.
3. **Large Ecosystem**: The npm registry has thousands of packages you can use.
4. **Fast Execution**: The V8 engine compiles JavaScript to native machine code.

## Installing Node.js

Visit the [official Node.js website](https://nodejs.org/) and download the LTS (Long Term Support) version for your operating system.

After installation, you can verify it by opening a terminal and running:

\`\`\`bash
node -v
npm -v
\`\`\`

## Your First Node.js Application

Let's create a simple HTTP server:

\`\`\`javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\\n');
});

server.listen(port, hostname, () => {
  console.log(\`Server running at http://\${hostname}:\${port}/\`);
});
\`\`\`

Save this code in a file called \`server.js\` and run it with:

\`\`\`bash
node server.js
\`\`\`

Visit \`http://localhost:3000\` in your browser to see your server in action!

## Working with Modules

Node.js uses the CommonJS module system. You can create reusable modules:

\`\`\`javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };
\`\`\`

\`\`\`javascript
// app.js
const { add, subtract } = require('./math');

console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
\`\`\`

## Next Steps

Now that you understand the basics of Node.js, explore these topics:

- Express.js for web applications
- Working with databases
- Asynchronous programming with Promises and async/await
- Building RESTful APIs
- Package management with npm

Happy coding with Node.js!`,
    excerpt:
      "Learn about Node.js, a JavaScript runtime for server-side development, and how to create a simple HTTP server.",
    authorId: "user-3",
    status: ArticleStatus.PUBLISHED,
    featuredImage: "/placeholder.svg?height=400&width=800",
    tags: [mockTags[6], mockTags[0], mockTags[7], mockTags[8]], // Node.js, JavaScript, Backend, Server
    readTime: 7,
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-05"),
    publishedAt: new Date("2023-03-01"),
    viewCount: 1800,
    likeCount: 134,
  },
];
