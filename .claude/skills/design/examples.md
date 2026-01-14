# SpeedMooting Design System Component Examples

Complete component library following SpeedMooting's legal/formal aesthetic with dark green primary, bronze/gold accents, and flat minimal design.

## Design Principles
- **Color Identity**: Dark green (#0F2E26) + bronze/gold (#9A7B4F)
- **Typography**: Merriweather serif headings + Inter sans body
- **Flat Design**: No shadows, 4px border radius only (`rounded-sm`)
- **Legal Aesthetic**: Warm backgrounds, formal styling, wide letter-spacing on labels

## Table of Contents

- [Buttons](#buttons)
- [Cards](#cards)
- [Forms](#forms)
- [Tables](#tables)
- [Navigation](#navigation)
- [Badges & Pills](#badges--pills)
- [Modals & Dialogs](#modals--dialogs)
- [Empty States](#empty-states)
- [Loading States](#loading-states)

---

## Buttons

### Primary Button (Bronze/Gold)
```tsx
<button className="
  px-6 py-2
  bg-accent text-white
  rounded-sm
  text-[10px] font-heading font-bold uppercase tracking-widest
  hover:bg-accent/90
  active:bg-accent/80
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  START NEW EXERCISE
</button>
```

### Secondary Button
```tsx
<button className="
  px-4 py-2
  bg-white text-gray-700
  border border-gray-200
  rounded-sm
  text-sm font-medium
  hover:bg-gray-50
  active:bg-gray-100
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-gray-200
">
  Cancel
</button>
```

### Ghost Button
```tsx
<button className="
  px-4 py-2
  text-gray-700
  rounded-sm
  text-sm font-medium
  hover:bg-gray-100
  active:bg-gray-200
  transition-colors duration-150
">
  Learn More
</button>
```

### Destructive Button
```tsx
<button className="
  px-4 py-2
  bg-red-600 text-white
  rounded-sm
  text-sm font-medium
  hover:bg-red-700
  active:bg-red-800
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
">
  Delete Account
</button>
```

### Icon Button
```tsx
<button className="
  p-2
  text-gray-500
  rounded-sm
  hover:bg-gray-100
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-gray-200
" aria-label="Settings">
  <Settings className="w-5 h-5" />
</button>
```

### Button with Icon
```tsx
<button className="
  inline-flex items-center gap-2
  px-4 py-2
  bg-accent text-white
  rounded-sm
  text-sm font-medium
  hover:bg-gray-800
  transition-colors duration-150
">
  <Plus className="w-4 h-4" />
  <span>New Project</span>
</button>
```

---

## Cards

### Basic Card (Borders-only approach)
```tsx
<div className="
  p-6
  bg-white
  border border-gray-200
  rounded-sm
">
  <h3 className="text-base font-semibold text-gray-900">Card Title</h3>
  <p className="mt-2 text-sm text-gray-600">
    Card content goes here with proper spacing and hierarchy.
  </p>
</div>
```

### Interactive Card
```tsx
<button className="
  w-full
  p-6
  bg-white
  border border-gray-200
  rounded-sm
  text-left
  hover:border-accent
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
">
  <h3 className="text-base font-semibold text-gray-900">Clickable Card</h3>
  <p className="mt-2 text-sm text-gray-600">
    This card responds to hover and click interactions.
  </p>
</button>
```

### Metric Card
```tsx
<div className="p-6 bg-white border border-gray-200 rounded-sm">
  <div className="flex items-center justify-between mb-4">
    <span className="text-sm font-medium text-gray-600">Total Revenue</span>
    <div className="p-2 bg-green-50 rounded-sm">
      <TrendingUp className="w-4 h-4 text-green-600" />
    </div>
  </div>
  <div className="font-mono text-3xl font-semibold tabular-nums text-gray-900">
    $45,231.89
  </div>
  <p className="mt-2 text-xs text-gray-500">
    <span className="text-green-600 font-medium">+20.1%</span> from last month
  </p>
</div>
```

### Feature Card with Icon
```tsx
<div className="p-6 bg-white border border-gray-200 rounded-sm">
  <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-sm mb-4">
    <Zap className="w-6 h-6 text-blue-600" />
  </div>
  <h3 className="text-base font-semibold text-gray-900">Lightning Fast</h3>
  <p className="mt-2 text-sm text-gray-600">
    Optimized for speed with sub-100ms response times.
  </p>
</div>
```

### List Card
```tsx
<div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
  <div className="px-6 py-4 border-b border-gray-100">
    <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
  </div>
  <div className="divide-y divide-gray-100">
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <p className="text-sm text-gray-900">Project created</p>
      <p className="mt-1 text-xs text-gray-500">2 hours ago</p>
    </div>
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <p className="text-sm text-gray-900">Team member added</p>
      <p className="mt-1 text-xs text-gray-500">5 hours ago</p>
    </div>
  </div>
</div>
```

---

## Forms

### Text Input
```tsx
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email address
  </label>
  <input
    id="email"
    type="email"
    className="
      w-full
      px-3 py-2
      bg-white
      border border-gray-200
      rounded-sm
      text-sm text-gray-900
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
      transition-shadow duration-150
    "
    placeholder="you@example.com"
  />
</div>
```

### Input with Error
```tsx
<div className="space-y-2">
  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    Password
  </label>
  <input
    id="password"
    type="password"
    className="
      w-full
      px-3 py-2
      bg-white
      border border-red-300
      rounded-sm
      text-sm text-gray-900
      focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
    "
  />
  <p className="text-xs text-red-600">Password must be at least 8 characters</p>
</div>
```

### Textarea
```tsx
<div className="space-y-2">
  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
    Message
  </label>
  <textarea
    id="message"
    rows={4}
    className="
      w-full
      px-3 py-2
      bg-white
      border border-gray-200
      rounded-sm
      text-sm text-gray-900
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
      resize-none
      transition-shadow duration-150
    "
    placeholder="Enter your message..."
  />
</div>
```

### Custom Select Trigger
```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Country
  </label>
  <button
    type="button"
    className="
      w-full
      inline-flex items-center justify-between gap-2
      px-3 py-2
      bg-white
      border border-gray-200
      rounded-sm
      text-sm text-gray-700
      hover:bg-gray-50
      whitespace-nowrap
      transition-colors duration-150
      focus:outline-none focus:ring-2 focus:ring-accent
    "
  >
    <span>Select country</span>
    <ChevronDown className="w-4 h-4 text-gray-400" />
  </button>
</div>
```

### Checkbox
```tsx
<label className="inline-flex items-center gap-2 cursor-pointer group">
  <div className="relative">
    <input
      type="checkbox"
      className="peer sr-only"
    />
    <div className="
      w-5 h-5
      border border-gray-300
      rounded
      peer-checked:bg-accent peer-checked:border-black
      peer-focus:ring-2 peer-focus:ring-accent peer-focus:ring-offset-2
      transition-colors
    ">
      <Check className="
        w-4 h-4
        text-white
        opacity-0 peer-checked:opacity-100
        transition-opacity
        absolute inset-0 m-auto
      " />
    </div>
  </div>
  <span className="text-sm text-gray-700 group-hover:text-gray-900">
    I agree to the terms and conditions
  </span>
</label>
```

### Radio Button
```tsx
<div className="space-y-3">
  <label className="inline-flex items-center gap-2 cursor-pointer group">
    <div className="relative">
      <input
        type="radio"
        name="plan"
        className="peer sr-only"
      />
      <div className="
        w-5 h-5
        border-2 border-gray-300
        rounded-full
        peer-checked:border-black
        peer-focus:ring-2 peer-focus:ring-accent peer-focus:ring-offset-2
        transition-colors
      ">
        <div className="
          w-2 h-2
          bg-accent
          rounded-full
          opacity-0 peer-checked:opacity-100
          transition-opacity
          absolute inset-0 m-auto
        " />
      </div>
    </div>
    <span className="text-sm text-gray-700 group-hover:text-gray-900">
      Basic Plan - $9/month
    </span>
  </label>
</div>
```

### Toggle Switch
```tsx
<label className="inline-flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="sr-only peer" />
  <div className="
    relative w-11 h-6
    bg-gray-200
    rounded-full
    peer-checked:bg-accent
    peer-focus:ring-2 peer-focus:ring-accent peer-focus:ring-offset-2
    transition-colors
  ">
    <div className="
      absolute top-0.5 left-0.5
      w-5 h-5
      bg-white
      rounded-full
      shadow
      peer-checked:translate-x-5
      transition-transform
    " />
  </div>
  <span className="text-sm text-gray-700">Enable notifications</span>
</label>
```

---

## Tables

### Data Table
```tsx
<div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
  <table className="w-full">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 text-sm font-medium text-gray-900">
          John Doe
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          john@example.com
        </td>
        <td className="px-4 py-3">
          <span className="
            inline-flex items-center
            px-2 py-1
            bg-green-50 text-green-700
            text-xs font-medium
            rounded
          ">
            Active
          </span>
        </td>
        <td className="px-4 py-3 text-right">
          <button className="text-sm text-gray-500 hover:text-gray-900">
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Navigation

### React Router Integration

SpeedMooting uses React Router 7.11.0 for navigation. Always use `<Link>` components for internal navigation and detect active routes with `useLocation()`.

```tsx
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, BookOpen, History } from "lucide-react"
import { cn } from "@/lib/utils"

// Active state detection
const location = useLocation()
const navigate = useNavigate()

// Check if current route matches
const isActive = location.pathname === "/dashboard"

// Navigation with Link component
<Link to="/dashboard">
  <Button className={cn(
    "w-full justify-start gap-4 text-white/60 hover:text-white",
    isActive && "bg-white/5 text-white font-bold border-r-2 border-accent"
  )}>
    <LayoutDashboard className={cn("w-4 h-4", isActive ? "text-accent" : "text-white/40")} />
    <span className="text-[11px] uppercase tracking-[0.1em]">Dashboard</span>
  </Button>
</Link>

// Programmatic navigation
const handleSubmit = () => {
  // ... form logic
  navigate("/dashboard")
}
```

### Sidebar Navigation (SpeedMooting Style)
```tsx
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, BookOpen, History } from "lucide-react"

// SpeedMooting dark green sidebar with bronze/gold accents
const location = useLocation()

<nav className="w-64 h-screen bg-primary p-6 border-r border-primary/20">
  <div className="flex items-center gap-3 mb-12">
    <img src="/logo.png" alt="Logo" className="w-8 h-8" />
    <h1 className="text-lg font-bold text-white font-heading">SpeedMooting</h1>
  </div>

  <div className="space-y-1">
    {/* Active navigation item */}
    <a href="#" className="
      flex items-center gap-4
      w-full px-3 py-2 h-11
      bg-white/5
      text-white font-bold
      border-r-2 border-accent
      rounded-l-sm rounded-r-none
      transition-all duration-200
    ">
      <LayoutDashboard className="w-4 h-4 text-accent" />
      <span className="text-[11px] uppercase tracking-[0.1em]">Dashboard</span>
    </a>

    {/* Inactive navigation item */}
    <a href="#" className="
      flex items-center gap-4
      w-full px-3 py-2 h-11
      text-white/60
      hover:text-white hover:bg-white/5
      rounded-l-sm rounded-r-none
      transition-all duration-200
    ">
      <BookOpen className="w-4 h-4 text-white/40" />
      <span className="text-[11px] uppercase tracking-[0.1em]">Exercises</span>
    </a>

    <a href="#" className="
      flex items-center gap-4
      w-full px-3 py-2 h-11
      text-white/60
      hover:text-white hover:bg-white/5
      rounded-l-sm rounded-r-none
      transition-all duration-200
    ">
      <History className="w-4 h-4 text-white/40" />
      <span className="text-[11px] uppercase tracking-[0.1em]">History</span>
    </a>
  </div>

  {/* Practice Goal Widget */}
  <div className="mt-auto pt-6 border-t border-white/10">
    <div className="bg-white/5 rounded-sm p-4">
      <p className="text-[10px] uppercase font-medium text-white/40 mb-3 font-heading tracking-widest">
        Practice Goal
      </p>
      <p className="text-sm font-semibold mb-2">3 Exercises this week</p>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-white w-2/3"></div>
      </div>
    </div>
  </div>
</nav>
```

### Top Navigation
```tsx
<nav className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-gray-900">Logo</h1>

        <div className="flex items-center gap-1">
          <a href="#" className="
            px-3 py-2
            text-sm font-medium
            text-gray-900
            rounded-sm
            bg-gray-100
          ">
            Dashboard
          </a>
          <a href="#" className="
            px-3 py-2
            text-sm font-medium
            text-gray-600
            rounded-sm
            hover:bg-gray-50 hover:text-gray-900
            transition-colors
          ">
            Projects
          </a>
          <a href="#" className="
            px-3 py-2
            text-sm font-medium
            text-gray-600
            rounded-sm
            hover:bg-gray-50 hover:text-gray-900
            transition-colors
          ">
            Team
          </a>
        </div>
      </div>

      <button className="
        p-2
        text-gray-500
        rounded-sm
        hover:bg-gray-100
        transition-colors
      ">
        <User className="w-5 h-5" />
      </button>
    </div>
  </div>
</nav>
```

### Breadcrumbs
```tsx
<nav className="flex items-center gap-2 text-sm">
  <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
    Home
  </a>
  <ChevronRight className="w-4 h-4 text-gray-400" />
  <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
    Projects
  </a>
  <ChevronRight className="w-4 h-4 text-gray-400" />
  <span className="text-gray-900 font-medium">Current Project</span>
</nav>
```

---

## Badges & Pills

### Status Badge (Active/Success)
```tsx
<span className="
  inline-flex items-center
  px-2 py-0.5
  bg-green-50 text-green-700 border border-green-200
  text-[9px] font-heading font-bold uppercase tracking-widest
  rounded-sm
">
  ANALYZED
</span>
```

### Status Badge (Upcoming/Info)
```tsx
<span className="
  inline-flex items-center
  px-2 py-0.5
  bg-blue-50 text-blue-700 border border-blue-200
  text-[9px] font-heading font-bold uppercase tracking-widest
  rounded-sm
">
  UPCOMING
</span>
```

### Status Badge (Processing/Neutral)
```tsx
<span className="
  inline-flex items-center
  px-2 py-0.5
  bg-gray-50 text-gray-700 border border-gray-200
  text-[9px] font-heading font-bold uppercase tracking-widest
  rounded-sm
">
  PROCESSING
</span>
```

### Subject Badge (Uppercase Label Style)
```tsx
<span className="
  inline-flex items-center
  px-2.5 py-0.5
  bg-amber-50 text-amber-700 border border-amber-200
  text-[9px] font-heading font-bold uppercase tracking-widest
  rounded-sm
">
  CONTRACT LAW
</span>
```

---

## Modals & Dialogs

### Modal Container
```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  {/* Backdrop */}
  <div className="absolute inset-0 bg-accent/50" />

  {/* Modal */}
  <div className="
    relative
    w-full max-w-md
    bg-white
    rounded-sm
    shadow-xl
    overflow-hidden
  ">
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Confirm Action
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Are you sure you want to proceed? This action cannot be undone.
      </p>
    </div>

    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
      <button className="
        px-4 py-2
        text-gray-700
        text-sm font-medium
        hover:bg-gray-100
        rounded-sm
        transition-colors
      ">
        Cancel
      </button>
      <button className="
        px-4 py-2
        bg-accent text-white
        text-sm font-medium
        hover:bg-gray-800
        rounded-sm
        transition-colors
      ">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

## Empty States

### Empty State with Icon
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="p-4 bg-gray-100 rounded-full mb-4">
    <Inbox className="w-8 h-8 text-gray-400" />
  </div>
  <h3 className="text-base font-semibold text-gray-900">No messages yet</h3>
  <p className="mt-2 text-sm text-gray-600 max-w-sm">
    When someone sends you a message, it will appear here.
  </p>
  <button className="
    mt-6
    px-4 py-2
    bg-accent text-white
    text-sm font-medium
    rounded-sm
    hover:bg-gray-800
    transition-colors
  ">
    Compose Message
  </button>
</div>
```

---

## Loading States

### Spinner
```tsx
<div className="inline-flex items-center justify-center">
  <div className="
    w-5 h-5
    border-2 border-gray-200 border-t-gray-900
    rounded-full
    animate-spin
  " />
</div>
```

### Skeleton Card
```tsx
<div className="p-6 bg-white border border-gray-200 rounded-sm animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
  <div className="space-y-2">
    <div className="h-3 bg-gray-200 rounded" />
    <div className="h-3 bg-gray-200 rounded w-5/6" />
  </div>
</div>
```

### Loading Button
```tsx
<button
  disabled
  className="
    inline-flex items-center gap-2
    px-4 py-2
    bg-accent text-white
    text-sm font-medium
    rounded-sm
    opacity-70
    cursor-not-allowed
  "
>
  <div className="
    w-4 h-4
    border-2 border-white/30 border-t-white
    rounded-full
    animate-spin
  " />
  <span>Loading...</span>
</button>
```

---

## Animations (Framer Motion)

SpeedMooting uses Framer Motion 12.24.3 for smooth, professional animations. Follow these patterns for consistency.

### Stagger Animation (List Items)
```tsx
import { motion } from "framer-motion"

// Animate list items with stagger effect
<div className="space-y-4">
  {items.map((item, i) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: i * 0.1,
        ease: [0.25, 1, 0.5, 1],
        duration: 0.2
      }}
    >
      <Card>
        <CardContent>{item.title}</CardContent>
      </Card>
    </motion.div>
  ))}
</div>
```

### Fade In Animation
```tsx
import { motion } from "framer-motion"

// Simple fade in for page content
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
>
  <PageContent />
</motion.div>
```

### Slide In Animation
```tsx
import { motion } from "framer-motion"

// Slide in from right (for modals, sidebars)
<motion.div
  initial={{ x: 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 100, opacity: 0 }}
  transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
>
  <Sidebar />
</motion.div>
```

### Hover Scale Effect
```tsx
import { motion } from "framer-motion"

// Subtle scale on hover (use sparingly)
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
  className="px-6 py-2 bg-accent text-white rounded-sm"
>
  Click Me
</motion.button>
```

### Accordion/Dropdown Animation
```tsx
import { motion, AnimatePresence } from "framer-motion"

// Expand/collapse animation
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      className="overflow-hidden"
    >
      <div className="p-4">Content here</div>
    </motion.div>
  )}
</AnimatePresence>
```

### Grid Item Animation
```tsx
import { motion } from "framer-motion"

// Animate grid items with stagger
<div className="grid grid-cols-3 gap-6">
  {cards.map((card, i) => (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: i * 0.05,
        duration: 0.2,
        ease: [0.25, 1, 0.5, 1]
      }}
    >
      <Card>{card.content}</Card>
    </motion.div>
  ))}
</div>
```

### Layout Animation (Shared Layout)
```tsx
import { motion } from "framer-motion"

// Animate layout changes smoothly
<motion.div layout transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}>
  <DynamicContent />
</motion.div>
```

### Animation Best Practices

**Timing:**
- Micro-interactions: 150ms
- Standard transitions: 200ms
- Larger movements: 250ms
- Never exceed 300ms

**Easing:**
- Always use: `[0.25, 1, 0.5, 1]` (SpeedMooting standard)
- Matches CSS: `cubic-bezier(0.25, 1, 0.5, 1)`

**Stagger Delays:**
- List items: `delay: i * 0.1`
- Grid items: `delay: i * 0.05`
- Fast reveals: `delay: i * 0.05`

**When to Animate:**
- ✓ Page transitions
- ✓ List/grid item reveals
- ✓ Modal/drawer entrances
- ✓ Hover states (subtle)
- ✓ Accordion/dropdown expansion
- ✗ Every state change (over-animation)
- ✗ Long durations (slow UX)

---

## Color Palette Reference

### Neutral Grays (Base System)
```css
--gray-50:  #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
```

### Semantic Colors
```css
/* Success */
--green-50:  #f0fdf4
--green-600: #16a34a
--green-700: #15803d

/* Error */
--red-50:  #fef2f2
--red-600: #dc2626
--red-700: #b91c1c

/* Warning */
--yellow-50:  #fefce8
--yellow-600: #ca8a04
--yellow-700: #a16207

/* Info */
--blue-50:  #eff6ff
--blue-600: #2563eb
--blue-700: #1d4ed8
```

---

## CSS Variables Template

```css
:root {
  /* Spacing scale (4px grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Border radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.25, 1, 0.5, 1);
  --transition-base: 200ms cubic-bezier(0.25, 1, 0.5, 1);

  /* SpeedMooting Colors */
  --primary: #0F2E26; /* Dark green */
  --accent: #9A7B4F; /* Bronze/gold */
  --background: #FBFBF9; /* Legal paper */

  /* Borders (no shadows in SpeedMooting) */
  --border: 1px solid hsl(214.3, 31.8%, 91.4%);
}
```
