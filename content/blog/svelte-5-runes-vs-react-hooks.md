---
title: "Svelte 5 Runes vs React Hooks: A Practical Comparison"
description: "Svelte 5's runes bring fine-grained reactivity to the framework. Here's how they stack up against React hooks after building the same app in both."
date: "2025-02-24"
category: "Frameworks"
readTime: "10 min read"
accent: "secondary"
---

I recently rebuilt a client's internal dashboard in both React 19 and Svelte 5 as a proof-of-concept. The goal was to evaluate Svelte for future projects. What I found changed how I think about reactivity in UI frameworks.

## The Reactivity Models

React and Svelte solve the same problem — keeping UI in sync with state — but their approaches are fundamentally different.

**React** uses a pull-based model. You call `setState`, React schedules a re-render, the entire component function re-executes, and React diffs the output to figure out what changed in the DOM.

**Svelte 5** uses a push-based model with **runes**. When reactive state changes, Svelte knows exactly which DOM nodes depend on it and updates only those. No diffing, no re-running component functions.

```tsx
// React — the whole function re-runs on every state change
function Counter() {
  const [count, setCount] = useState(0);
  console.log("Component re-executed"); // Logs every time count changes

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

```svelte
<!-- Svelte 5 — only the text node updates -->
<script>
  let count = $state(0);
  console.log("Script runs once"); // Logs only on mount
</script>

<button onclick={() => count++}>{count}</button>
```

This isn't just a syntax difference. It has real performance implications.

## Runes: Svelte's Answer to Hooks

Svelte 5 introduced **runes** — compiler directives that start with `$`. They replace Svelte 4's implicit reactivity (`let` was reactive in components) with explicit, composable primitives.

The core runes:

### `$state` — Reactive State

```svelte
<script>
  let name = $state("Adnan");
  let todos = $state([
    { text: "Ship feature", done: false },
    { text: "Write blog post", done: true },
  ]);
</script>
```

Unlike `useState`, `$state` creates deeply reactive state. Mutating a nested property triggers updates automatically:

```svelte
<script>
  // Svelte 5 — direct mutation works
  todos[0].done = true; // UI updates

  // React — you'd need spread operators or immer
  // setTodos(todos.map((t, i) => i === 0 ? {...t, done: true} : t))
</script>
```

### `$derived` — Computed Values

```svelte
<script>
  let todos = $state([...]);
  let remaining = $derived(todos.filter(t => !t.done).length);
</script>

<p>{remaining} tasks left</p>
```

React equivalent: `useMemo`. But `$derived` automatically tracks its dependencies — no dependency array to manage, no stale closure bugs.

```tsx
// React — manual dependency tracking
const remaining = useMemo(
  () => todos.filter((t) => !t.done).length,
  [todos] // Forget this and you get stale data
);
```

### `$effect` — Side Effects

```svelte
<script>
  let query = $state("");

  $effect(() => {
    // Automatically tracks `query`, re-runs when it changes
    const results = await search(query);
    // ...
  });
</script>
```

React equivalent: `useEffect`. Same difference — no dependency array.

## The Dependency Array Problem

This is where Svelte's approach genuinely shines. React's dependency arrays are a constant source of bugs:

```tsx
// React — common bugs
useEffect(() => {
  fetchData(userId, filter);
}, [userId]); // Bug: forgot `filter` in deps

const formatted = useMemo(() => {
  return expensiveFormat(data, locale);
}, [data]); // Bug: forgot `locale` in deps
```

Svelte's compiler analyzes which reactive values your code reads and tracks them automatically. You literally cannot have a stale dependency.

```svelte
<script>
  $effect(() => {
    // Compiler knows this reads `userId` and `filter`
    fetchData(userId, filter);
    // No dependency array. No bugs.
  });
</script>
```

## Component Composition

Both frameworks handle composition well, but the patterns differ.

**React — Props and Hooks:**

```tsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle] as const;
}

function Accordion({ children, title }: Props) {
  const [open, toggle] = useToggle();
  return (
    <div>
      <button onClick={toggle}>{title}</button>
      {open && children}
    </div>
  );
}
```

**Svelte 5 — Props and Runes:**

```svelte
<!-- useToggle.svelte.ts -->
<script module>
  export function useToggle(initial = false) {
    let value = $state(initial);
    return {
      get value() { return value },
      toggle() { value = !value }
    };
  }
</script>

<!-- Accordion.svelte -->
<script>
  import { useToggle } from './useToggle.svelte.ts';

  let { children, title } = $props();
  const { value: open, toggle } = useToggle();
</script>

<div>
  <button onclick={toggle}>{title}</button>
  {#if open}
    {@render children()}
  {/if}
</div>
```

Svelte's `$props()` rune is cleaner than destructuring props in React — and it's type-safe by default with TypeScript.

## Performance: The Numbers

For the dashboard POC (data tables, charts, real-time updates, ~50 components):

| Metric | React 19 | Svelte 5 |
|---|---|---|
| Bundle size (gzipped) | 87KB | 22KB |
| Initial load (3G) | 1.8s | 0.7s |
| Table re-render (1000 rows) | 12ms | 3ms |
| Memory (idle) | 14MB | 8MB |

Svelte's compiler advantage is real. It compiles components to imperative DOM operations — no virtual DOM, no runtime diffing algorithm. The framework "disappears" at build time.

## Developer Experience

After two weeks with Svelte 5:

**What I prefer in Svelte:**
- No dependency arrays. Ever.
- Direct mutation of state (no spread operators for nested updates)
- Smaller bundles with zero config
- Built-in transitions and animations
- Scoped CSS by default

**What I prefer in React:**
- Massive ecosystem (component libraries, tooling, talent pool)
- React Server Components for hybrid rendering
- Better debugging tools (React DevTools is excellent)
- More battle-tested at scale (Meta, Vercel, Netflix)
- Easier to hire for

## When I'd Reach for Svelte

- **Internal tools and dashboards** — smaller team, performance matters, ecosystem size less critical
- **Marketing sites** — tiny bundles, great animation primitives
- **Embedded widgets** — when you need minimal JS footprint
- **Solo/small team projects** — less boilerplate, faster iteration

## When React Stays the Default

- **Large teams** — more developers know React, more resources available
- **Complex data requirements** — Server Components + streaming is unmatched
- **Enterprise clients** — they want React on the resume, and the ecosystem de-risks the choice
- **Mobile companion needed** — React Native shares knowledge (and sometimes code)

## The Verdict

Svelte 5's runes are the most ergonomic reactivity system I've used. The dependency-array-free model alone eliminates an entire category of bugs. Combined with the compiler's performance advantages, it's a genuinely compelling alternative.

But React's ecosystem depth and Server Components keep it as my default for client work. The best framework is the one that fits the project constraints — team size, hiring pool, integration requirements, and scale.

I'm now offering Svelte as an option for smaller projects where bundle size and performance are priorities. It's earned a permanent spot in my toolkit.
