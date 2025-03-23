"use client";

export const mdxContent = `
# Sample Markdown Content

This is a sample Markdown document that demonstrates various features of Markdown syntax.

## Text Formatting

You can format text in *italic* or **bold**. You can also use ~~strikethrough~~ for deleted text.

## Lists

### Unordered List

- Item 1
- Item 2
  - Nested Item 1
  - Nested Item 2
- Item 3

### Ordered List

1. First item
2. Second item
3. Third item

## Code Blocks

Inline code: \`const greeting = "Hello, world!"\`

\`\`\`javascript
// This is a JavaScript code block
function greet(name) {
  return \`Hello, \${name}!\`;
}

const result = greet('Developer');
console.log(result); // Output: Hello, Developer!
\`\`\`

\`\`\`tsx
// This is a TypeScript React component
import { useState } from 'react';

interface CounterProps {
  initialCount: number;
}

export default function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
\`\`\`

## Blockquotes

> This is a blockquote.
> 
> It can span multiple lines.

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Links

[Visit Next.js](https://nextjs.org)

## Images

![Placeholder Image](https://via.placeholder.com/150)
`;
