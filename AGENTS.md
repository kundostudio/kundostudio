# Agent Guidelines

## Styling Preferences

- **Always prefer Tailwind CSS classes over inline styles**
- Use `cn()` utility for conditional class composition instead of `style={{ }}` props
- When dynamic values are needed, use Tailwind's arbitrary value syntax: `className="min-h-[min(500px,60vmax)]"` instead of `style={{ minHeight: "min(500px, 60vmax)" }}`
- For complex CSS properties like `mask-image`, use Tailwind's arbitrary property syntax: `[mask-image:linear-gradient(...)]`
- Conditional classes should use `cn()`: `cn("base-class", condition && "conditional-class")` or `cn("base", condition ? "class-a" : "class-b")`

### Examples

❌ Avoid:
```tsx
<div style={{ opacity: isActive ? 1 : 0 }}>
```

✅ Prefer:
```tsx
<div className={cn("transition-opacity", isActive ? "opacity-100" : "opacity-0")}>
```

❌ Avoid:
```tsx
<div style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}>
```

✅ Prefer:
```tsx
<div className="[mask-image:linear-gradient(to_bottom,black,transparent)]">
```

