---
name: design
description: SpeedMooting design system with dark green (#0F2E26) sidebar, bronze/gold (#9A7B4F) accents, Merriweather serif headings, and flat minimal design. Use when building any UI components or new screens for the SpeedMooting legal mooting practice platform. Provides prescriptive React/Tailwind code examples matching existing Dashboard, Exercises, and History screens.
---

# SpeedMooting Design System

This Skill provides the official SpeedMooting design system for building new screens and components that match the existing Dashboard, Exercises, and History pages. The design features a legal/formal aesthetic with dark green branding, bronze/gold accents, and flat minimal styling.

## Quick Start

**SpeedMooting Design System Checklist:**

✓ **Colors** (use exactly these values):
  - Primary: `#0F2E26` (dark green) or `bg-primary`
  - Accent: `#9A7B4F` (bronze/gold) or `bg-accent`
  - Background: `#FBFBF9` (legal paper) - already set globally
  - Cards: White (`bg-white`) with `border-gray-200`

✓ **Typography**:
  - Headings: `font-heading` (Merriweather serif)
  - Body: `font-sans` (Inter)
  - Labels: `text-[10px] uppercase tracking-widest font-heading font-bold`

✓ **Spacing**: 4px grid (use `p-6`, `gap-4`, `space-y-6`)

✓ **Design**: Flat only (no shadows), `rounded-sm` (4px corners)

✓ **Components**: Copy patterns from [examples.md](examples.md)

**Do not deviate from these patterns.** New screens should visually match Dashboard, Exercises, and History pages.

## SpeedMooting Tech Stack

This section provides the technical infrastructure context for building SpeedMooting features.

**Core Technologies:**
- React 19.2.0
- Tailwind CSS 3.4.19
- TypeScript ~5.9.3

**UI Components:**
- shadcn/ui (Radix UI primitives)
- Custom components in `src/components/`
- Component library built on Radix UI for accessibility

**Navigation & Routing:**
- React Router 7.11.0
- Use `<Link>` components for internal navigation
- Use `useNavigate()` hook for programmatic navigation
- Use `useLocation()` for active route detection

**State Management:**
- React Context API
- `AuthContext` for authentication state
- `ThemeContext` for dark/light theme management
- Use Context for global state, local state for component-specific data

**Animations:**
- Framer Motion 12.24.3
- Use `motion` components for transitions and animations
- Standard easing: `cubic-bezier(0.25, 1, 0.5, 1)`
- Timing: 150ms micro-interactions, 200-250ms larger transitions
- Stagger children with delay multipliers (e.g., `delay: i * 0.1`)

**Icons:**
- Lucide React 0.562.0
- Import from `lucide-react`
- Example: `import { ArrowRight, Check, X } from "lucide-react"`
- Consistent sizing: `w-4 h-4`, `w-5 h-5`, `w-6 h-6`

**Development Tools:**
- Vite for build tooling
- ESLint for code quality
- TypeScript for type safety

## SpeedMooting Design Identity

**This design system is established and should be followed consistently across all screens.**

### Core Identity

SpeedMooting uses a legal/formal aesthetic with:
- **Dark green sidebar** (#0F2E26) for authority and professionalism
- **Bronze/gold accents** (#9A7B4F) for warmth and emphasis
- **Legal paper background** (#FBFBF9) creating a document-like feel
- **Flat design** with no shadows, using borders for hierarchy
- **Serif headings** (Merriweather) for formality
- **Wide letter-spacing** on uppercase labels for legal aesthetic

### When Building New Screens

1. Use the exact colors specified in this Skill
2. Follow the component patterns in [examples.md](examples.md)
3. Match the styling of existing Dashboard/Exercises/History screens
4. Maintain the flat, minimal design philosophy

---

## Core Craft Principles

These universal principles apply to all SpeedMooting components.

### The 4px Grid
All spacing uses a 4px base grid:
- `4px` - micro spacing (icon gaps)
- `8px` - tight spacing (within components)
- `12px` - standard spacing (between related elements)
- `16px` - comfortable spacing (section padding)
- `24px` - generous spacing (between sections)
- `32px` - major separation

### Symmetrical Padding
**TLBR must match.** If top padding is 16px, left/bottom/right must also be 16px. Exception: when content naturally creates visual balance.

```css
/* Good */
padding: 16px;
padding: 12px 16px; /* Only when horizontal needs more room */

/* Bad */
padding: 24px 16px 12px 16px;
```

### Border Radius Consistency

**SpeedMooting uses a consistent 4px border radius** (`rounded-sm` in Tailwind) for all components.

```css
border-radius: 4px; /* rounded-sm */
```

- Buttons: `rounded-sm`
- Cards: `rounded-sm`
- Inputs: `rounded-sm`
- Badges: `rounded-sm`
- All containers: `rounded-sm`

**Never use larger radius values.** The sharp 4px corners reinforce the formal, technical aesthetic.

### Depth & Elevation (Flat Design Only)

**SpeedMooting uses a flat design approach with no shadows.** Hierarchy is created through borders and background color shifts, not elevation.

```css
/* SpeedMooting border approach */
border: 1px solid hsl(214.3, 31.8%, 91.4%); /* border-gray-200 */

/* Dark mode */
border: 1px solid hsl(217.2, 32.6%, 20%); /* dark:border-gray-800 */

/* Hover states use accent border */
border: 1px solid #9A7B4F; /* border-accent */
```

**Surface color shifts** — White cards (`#FFFFFF`) on the legal paper background (`#FBFBF9`) create subtle depth through color contrast alone. This reinforces the document-like aesthetic without needing shadows.

### Card Layouts Vary, Surface Treatment Stays Consistent
Monotonous card layouts are lazy design. A metric card doesn't have to look like a plan card doesn't have to look like a settings card. One might have a sparkline, another an avatar stack, another a progress ring, another a two-column split.

Design each card's internal structure for its specific content — but keep the surface treatment consistent: same border weight, shadow depth, corner radius, padding scale, typography. Cohesion comes from the container chrome, not from forcing every card into the same layout template.

### Isolated Controls
UI controls deserve container treatment. Date pickers, filters, dropdowns — these should feel like crafted objects sitting on the page, not plain text with click handlers.

**Never use native form elements for styled UI.** Native `<select>`, `<input type="date">`, and similar elements render OS-native dropdowns and pickers that cannot be styled. Build custom components instead:

- Custom select: trigger button + positioned dropdown menu
- Custom date picker: input + calendar popover
- Custom checkbox/radio: styled div with state management

**Custom select triggers must use `display: inline-flex` with `white-space: nowrap`** to keep text and chevron icons on the same row. Without this, flex children can wrap to new lines.

### Typography Hierarchy

**Font Families:**
- **Headings**: Merriweather (serif) via `font-heading` — Creates formal, legal aesthetic
- **Body**: Inter (sans-serif) via `font-sans` — Modern, readable

**Usage Patterns:**
```css
/* Headings - always use serif */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Merriweather', serif; /* font-heading */
  font-weight: 600; /* font-semibold */
  letter-spacing: -0.025em; /* tracking-tight */
}

/* Body text */
body, p, span {
  font-family: 'Inter', sans-serif; /* font-sans */
}

/* Uppercase labels (distinctive SpeedMooting pattern) */
.label {
  font-family: 'Merriweather', serif; /* font-heading */
  font-size: 10px; /* text-[10px] */
  font-weight: 700; /* font-bold */
  text-transform: uppercase;
  letter-spacing: 0.15em; /* tracking-widest */
}
```

**Font Scale:**
- 9-10px: Uppercase labels (with wide tracking)
- 11px: Navigation items (uppercase with tracking)
- 12px: Small text, timestamps
- 14px: Body text (base size)
- 16px: Card titles
- 18px: Section headings
- 24px: Page titles
- 32px: Large metric displays (use `tabular-nums` for alignment)

**Examples:** "HIGH PRIORITY RECOMMENDATION", "CONTRACT LAW", "TOTAL SUBMISSIONS"

### Monospace for Data
Numbers, IDs, codes, timestamps belong in monospace. Use `tabular-nums` for columnar alignment. Mono signals "this is data."

### Iconography
Use **Lucide React** (`lucide-react`). Icons clarify, not decorate — if removing an icon loses no meaning, remove it.

**Import Pattern:**
```tsx
import { Check, X, ArrowRight, Settings } from "lucide-react"
```

**Sizing:**
- `w-4 h-4` (16px): Default for buttons, inline elements
- `w-5 h-5` (20px): Sidebar navigation, card headers
- `w-6 h-6` (24px): Feature cards, prominent actions

**Color Patterns:**
- Active/Accent: `text-accent`
- Inactive: `text-white/40` (sidebar), `text-gray-400` (light mode)
- Hover states: Transition from muted to accent

Give standalone icons presence with subtle background containers.

### Animation
- 150ms for micro-interactions, 200-250ms for larger transitions
- Easing: `cubic-bezier(0.25, 1, 0.5, 1)`
- No spring/bouncy effects in enterprise UI

### Contrast Hierarchy
Build a four-level system: foreground (primary) → secondary → muted → faint. Use all four consistently.

### SpeedMooting Color Palette

**Core Identity Colors:**
- **Primary (Dark Green)**: `#0F2E26` or `bg-primary` — Sidebar, primary branding, authority
- **Accent (Bronze/Gold)**: `#9A7B4F` or `bg-accent` — CTAs, active states, icons, emphasis
- **Background**: `#FBFBF9` (legal paper) — Set globally, creates warm document-like feel

**Neutrals:**
- **Cards**: `#FFFFFF` (`bg-white`) — White cards on warm background
- **Borders**: `border-gray-200` (light mode), `dark:border-gray-800` (dark mode)
- **Text Hierarchy**:
  - Primary: `text-gray-900` — Near black for headings/body
  - Secondary: `text-gray-600` — Medium gray for descriptions
  - Muted: `text-gray-500` — Light gray for metadata/timestamps

**Semantic Colors** (use sparingly, for meaning only):
- **Success/Active**: `bg-green-50 text-green-700` — "ANALYZED" badges, active competitions
- **Info/Upcoming**: `bg-blue-50 text-blue-700` — "UPCOMING" badges, informational states
- **Processing**: `bg-gray-50 text-gray-700` — Neutral/processing states
- **Danger**: `bg-red-50 text-red-700` — Errors, destructive actions

**Dark Mode Variants:**
- **Primary**: Lighter green for visibility
- **Accent**: Lighter gold/bronze
- **Background**: Dark charcoal (`dark:bg-gray-900`)
- **Borders**: `dark:border-gray-800`

**Usage Guidelines:**
- Use accent color for emphasis only (buttons, active nav, icons)
- Dark green exclusively for sidebar and primary branding
- Semantic colors only for badges and status indicators
- Keep most interfaces monochrome with strategic color placement

---

## Navigation Context

Screens need grounding. A data table floating in space feels like a component demo, not a product. Consider including:

- **Navigation** — sidebar or top nav showing where you are in the app
- **Location indicator** — breadcrumbs, page title, or active nav state
- **User context** — who's logged in, what workspace/org

When building sidebars, consider using the same background as the main content area. Tools like Supabase, Linear, and Vercel rely on a subtle border for separation rather than different background colors. This reduces visual weight and feels more unified.

---

## Dark Mode Considerations

Dark interfaces have different needs:

**Borders over shadows** — Shadows are less visible on dark backgrounds. Lean more on borders for definition. A border at 10-15% white opacity might look nearly invisible but it's doing its job — resist the urge to make it more prominent.

**Adjust semantic colors** — Status colors (success, warning, error) often need to be slightly desaturated or adjusted for dark backgrounds to avoid feeling harsh.

**Same structure, different values** — The hierarchy system (foreground → secondary → muted → faint) still applies, just with inverted values.

---

## Component Examples

Here are SpeedMooting-specific examples. For more comprehensive examples, see [examples.md](examples.md).

### Primary Button (Bronze/Gold)

```tsx
// SpeedMooting primary CTA button
<button className="
  px-6 py-2
  bg-accent hover:bg-accent/90
  text-white
  rounded-sm
  text-[10px] font-heading font-bold uppercase tracking-widest
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
">
  START NEW EXERCISE
</button>

// Secondary button
<button className="
  px-4 py-2
  bg-white text-gray-700
  border border-gray-200
  rounded-sm
  text-sm font-medium
  hover:bg-gray-50
  transition-colors duration-200
">
  Cancel
</button>
```

### Card Component (Flat Design)

```tsx
// SpeedMooting card - flat with no shadows
<div className="
  p-6
  bg-white
  border border-gray-200
  rounded-sm
  hover:border-accent
  transition-colors duration-200
">
  <h3 className="text-base font-heading font-semibold">Card Title</h3>
  <p className="mt-2 text-sm text-gray-600">Card content goes here.</p>
</div>
```

### Sidebar Navigation

```tsx
// Active navigation item
<button className="
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
</button>

// Inactive navigation item
<button className="
  flex items-center gap-4
  w-full px-3 py-2 h-11
  text-white/60
  hover:text-white hover:bg-white/5
  rounded-l-sm rounded-r-none
  transition-all duration-200
">
  <BookOpen className="w-4 h-4 text-white/40" />
  <span className="text-[11px] uppercase tracking-[0.1em]">Exercises</span>
</button>
```

### Status Badges

```tsx
// Active/Success badge
<span className="
  inline-flex items-center
  px-2 py-0.5
  bg-green-50 text-green-700 border border-green-200
  text-[9px] font-heading font-bold uppercase tracking-widest
  rounded-sm
">
  ANALYZED
</span>

// Upcoming/Info badge
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

### Input Field

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Email address
  </label>
  <input
    type="email"
    className="
      w-full
      px-3 py-2
      bg-white
      border border-gray-200
      rounded-sm
      text-sm
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
      transition-shadow duration-150
    "
    placeholder="you@example.com"
  />
</div>
```

### Metric Card

```tsx
<div className="p-6 bg-white border border-gray-200 rounded-sm">
  <div className="flex items-center justify-between mb-2">
    <p className="text-[10px] text-gray-500 uppercase font-heading font-bold tracking-widest">
      TOTAL SUBMISSIONS
    </p>
    <Clock className="w-4 h-4 text-gray-400" />
  </div>
  <div className="text-2xl font-bold tabular-nums mb-1">12</div>
  <p className="text-[10px] text-green-700 font-bold">+2 THIS MONTH</p>
</div>
```

### Data Table Row

```tsx
<tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
  <td className="px-4 py-3 text-sm font-medium text-gray-900">
    John Doe
  </td>
  <td className="px-4 py-3 text-sm text-gray-600">
    john@example.com
  </td>
  <td className="px-4 py-3 text-sm font-mono tabular-nums text-gray-600">
    #12345
  </td>
  <td className="px-4 py-3">
    <span className="
      inline-flex items-center
      px-2 py-0.5
      bg-green-50 text-green-700
      text-[9px] font-heading font-bold uppercase tracking-widest
      rounded-sm
    ">
      ANALYZED
    </span>
  </td>
</tr>
```

---

## SpeedMooting Best Practices

### Color Usage
- **Use accent color sparingly**: Bronze/gold (`#9A7B4F`) for CTAs, active states, icons only
- **Dark green for authority**: Sidebar and primary branding elements only
- **White cards on warm background**: Creates depth through color, not shadows
- **Semantic badges**: Green for success, blue for info, gray for neutral

### Typography
- **Always use serif for headings**: `font-heading` (Merriweather) creates formal aesthetic
- **Uppercase labels need wide tracking**: `tracking-widest` (0.15em) minimum
- **Small text stays readable**: Never below 9-10px
- **Tabular nums for metrics**: Use `tabular-nums` for aligned numbers

### Layout
- **Flat hierarchy**: Use borders and background colors, not shadows
- **Sharp corners**: Always `rounded-sm` (4px), never larger
- **Sidebar patterns**: Left-aligned nav with right accent border on active
- **Consistent spacing**: Use 4px grid (p-6, gap-4, space-y-6)

### Component Patterns
- **Buttons**: Bronze/gold primary, white secondary, ghost for sidebar
- **Badges**: `rounded-sm` with uppercase text and wide tracking
- **Cards**: White with subtle border, hover shows accent border
- **Inputs**: `rounded-sm` with focus showing accent ring

### Dark Mode
- **Maintain color identity**: Lighter green and gold, same patterns
- **Increase contrast**: Ensure text remains readable
- **Borders matter more**: Shadows less visible in dark mode

---

## Anti-Patterns for SpeedMooting

### Never Do This
- ❌ Use colors outside the palette (no purple, pink, orange, etc.)
- ❌ Add drop shadows to cards or buttons
- ❌ Use border radius larger than 4px (`rounded-sm`)
- ❌ Mix sans-serif headings with serif headings
- ❌ Use lowercase for badge labels or navigation items
- ❌ Skip wide letter-spacing on uppercase labels
- ❌ Use accent color for large areas (it's for emphasis only)
- ❌ Skip the serif font for headings (`font-heading` is required)
- ❌ Use generic color names like "primary" when you mean "accent"

### Always Question
- "Does this use SpeedMooting's color palette?"
- "Are headings using Merriweather serif (`font-heading`)?"
- "Do uppercase labels have wide tracking (`tracking-widest`)?"
- "Is this flat with no shadows?"
- "Would this fit on the existing Dashboard/Exercises/History screens?"
- "Am I using `rounded-sm` consistently?"

---

## The Standard

Every SpeedMooting screen should look like it was designed by the same team that created Dashboard, Exercises, and History. Not generic — *distinctively SpeedMooting* with its legal/formal aesthetic, dark green authority, and bronze/gold warmth.

The goal: maintain absolute visual consistency across all screens while allowing content-appropriate layouts.
