---
title: "React Native's New Architecture in Production: What Actually Changed"
description: "We migrated a 200-screen fintech app to React Native's New Architecture. Here's the real impact on performance, DX, and the migration pain points."
date: "2025-01-15"
category: "Mobile"
readTime: "12 min read"
accent: "primary"
---

React Native's New Architecture has been "coming soon" for years. With React Native 0.76+, it's finally the default. I recently led a migration of a 200-screen fintech application from the old architecture, and I want to share what actually changed — not the theory, but the measurable impact.

## What's Actually New

The New Architecture has three core pillars:

1. **JSI (JavaScript Interface)** — Direct communication between JS and native, replacing the old JSON bridge
2. **Fabric** — A new rendering system with synchronous layout
3. **Turbo Modules** — Lazy-loaded native modules with type-safe interfaces

If you've been following React Native, you've heard these terms. But what do they mean in practice?

### The Bridge Is Gone

The old architecture had a single bottleneck: the **bridge**. Every communication between JavaScript and native went through an asynchronous JSON queue. Tap a button? JS serializes a message, bridge queues it, native deserializes it. Need layout info? Same round-trip in reverse.

```
OLD: JS → serialize JSON → Bridge Queue → deserialize → Native
NEW: JS → JSI (direct C++ calls) → Native
```

JSI replaces this with direct C++ bindings. JavaScript can call native functions synchronously, and native can call into JS the same way. No serialization. No queue. No async overhead for operations that should be instant.

## The Migration: What We Were Working With

Our app:
- **200+ screens** across 6 navigation stacks
- **43 native modules** (camera, biometrics, secure storage, push notifications, analytics, etc.)
- **12 third-party native libraries** (react-native-reanimated, react-native-gesture-handler, react-native-maps, etc.)
- **Team of 5 mobile developers**
- **~180K monthly active users**

We started the migration on React Native 0.76 and completed it over 8 weeks.

## Performance: The Numbers

Here's what we measured before and after, on a mid-range Android device (Samsung Galaxy A54):

### App Startup

| Metric | Old Arch | New Arch | Change |
|---|---|---|---|
| JS bundle parse | 890ms | 640ms | -28% |
| Native module init | 1200ms | 180ms | -85% |
| Time to interactive | 3.1s | 1.4s | -55% |

The **Turbo Modules** win is dramatic. Old architecture eagerly initialized every native module at startup — all 43 of them, whether the user needed them or not. Turbo Modules are lazy: they initialize on first use. The camera module doesn't load until you open the camera screen.

### UI Responsiveness

| Metric | Old Arch | New Arch | Change |
|---|---|---|---|
| List scroll FPS (1000 items) | 48 avg | 59 avg | +23% |
| Touch-to-response latency | 80ms | 12ms | -85% |
| Complex animation jank frames | 14/sec | 2/sec | -86% |
| Screen transition time | 320ms | 180ms | -44% |

The touch-to-response improvement is the one users **feel**. On the old bridge, every touch event had to cross the async queue. With JSI, the gesture handler communicates directly with the native side. The app feels like a different product.

### Memory

| Metric | Old Arch | New Arch | Change |
|---|---|---|---|
| Idle memory usage | 210MB | 165MB | -21% |
| Peak (heavy screen) | 380MB | 290MB | -24% |

Less serialization overhead, fewer duplicate data structures crossing the bridge, lazy module loading — it all adds up.

## The Migration Pain Points

It wasn't all smooth. Here's where we spent the most time:

### 1. Native Module Compatibility

Of our 43 native modules, 8 needed updates for the New Architecture. Three patterns:

**Drop-in compatible (32 modules):** Major libraries like `react-native-reanimated`, `react-native-gesture-handler`, and `react-native-screens` already supported the New Architecture. Just update to the latest version.

**Minor changes needed (8 modules):** Some libraries needed Turbo Module spec files (codegen). The community had PRs open for most of these. We contributed patches to two libraries.

**Full rewrite (3 modules):** Three internal native modules required rewriting from the old `NativeModule` pattern to Turbo Module specs:

```typescript
// Old: Bridge-based module
import { NativeModules } from "react-native";
const { SecureStorage } = NativeModules;

// Usage: always async, even for simple operations
const token = await SecureStorage.getItem("auth_token");
```

```typescript
// New: Turbo Module with codegen spec
import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>("SecureStorage");
```

The Turbo Module spec doubles as the type definition and the codegen input. TypeScript-first, which is a genuine improvement over the old bridge pattern where types were an afterthought.

### 2. Fabric Rendering Differences

Fabric's synchronous layout solved most of our jank issues, but it also exposed bugs we didn't know we had:

- **Layout measurements were now synchronous.** Code that relied on `onLayout` firing asynchronously sometimes ran in a different order.
- **Shadow tree updates are batched differently.** A few complex animations needed timing adjustments.
- **Some third-party components rendered differently.** Minor pixel-level differences in custom native views that we caught during QA.

### 3. Hermes Engine Quirks

Hermes (the JS engine) is now tightly integrated with the New Architecture. It's fast, but we hit two issues:

- **BigInt support gaps** — Our crypto library used BigInt, which Hermes didn't fully support. Workaround: polyfill.
- **Proxy behavior** — Some state management patterns using Proxies behaved differently. MobX users, beware.

## What Improved Beyond Performance

### Concurrent Features

Fabric brings React's concurrent rendering to mobile. We can now use `useTransition` to keep the UI responsive during heavy state updates:

```tsx
function TransactionList() {
  const [filter, setFilter] = useState("all");
  const [isPending, startTransition] = useTransition();

  const handleFilter = (newFilter: string) => {
    startTransition(() => {
      setFilter(newFilter); // Non-blocking update
    });
  };

  return (
    <>
      <FilterBar onChange={handleFilter} />
      {isPending ? <Skeleton /> : <TransactionTable filter={filter} />}
    </>
  );
}
```

On the old architecture, filtering 5000 transactions would freeze the UI for 200ms. With concurrent features, the filter tabs remain interactive while the list updates in the background.

### Type-Safe Native Modules

Turbo Modules with codegen mean that the TypeScript types, the JavaScript interface, and the native implementation are all derived from a single spec. If the native side changes a function signature, the build fails. No more runtime crashes from bridge serialization mismatches.

### Shared C++ Code

JSI opens the door to writing performance-critical logic in C++ that's shared across iOS and Android. We moved our transaction encryption logic to a shared C++ module:

```cpp
// shared/crypto.cpp — runs on both platforms
#include <jsi/jsi.h>

using namespace facebook;

void installCrypto(jsi::Runtime& runtime) {
  auto encrypt = jsi::Function::createFromHostFunction(
    runtime,
    jsi::PropNameID::forAscii(runtime, "encrypt"),
    2,
    [](jsi::Runtime& rt, const jsi::Value&, const jsi::Value* args, size_t) {
      std::string data = args[0].getString(rt).utf8(rt);
      std::string key = args[1].getString(rt).utf8(rt);
      // ... encryption logic
      return jsi::String::createFromUtf8(rt, encrypted);
    }
  );
  runtime.global().setProperty(runtime, "nativeCrypto", std::move(encrypt));
}
```

One implementation, two platforms, no bridge overhead. This pattern is a game-changer for performance-sensitive operations.

## Migration Strategy That Worked

For teams considering the migration, here's what worked for us:

1. **Audit native modules first.** Check every dependency against the [reactnative.directory](https://reactnative.directory) compatibility list. This determines your timeline.
2. **Enable the New Architecture on a branch.** In `react-native.config.js`, flip the flag and see what breaks. Most issues surface immediately.
3. **Migrate native modules one at a time.** Don't try to convert everything at once. Turbo Modules and legacy modules can coexist during migration.
4. **Invest in automated testing.** We caught three rendering regressions through snapshot tests that would have shipped otherwise.
5. **Profile before and after.** Measure startup time, scroll performance, and touch latency with real devices. Emulators hide performance issues.

## Is It Worth It?

Unequivocally, yes — but timing matters. If you're starting a new React Native project, use the New Architecture from day one. If you're maintaining an existing app, the migration effort scales with your native module count.

For our fintech app, the 55% startup improvement alone justified the 8-week investment. Users noticed. Our app store rating went from 4.1 to 4.5 in the month after release, with multiple reviews mentioning "feels faster."

The New Architecture isn't just a technical upgrade. It's React Native closing the gap with native development. The days of "it feels like a React Native app" (said disparagingly) are numbered.
