# 📸 Assets & Images Guide

## Current Image Strategy

We're using **high-quality stock images from Unsplash** for all visual assets. This provides:
- ✅ Professional, high-resolution images
- ✅ Free to use (Unsplash License)
- ✅ Fast loading via CDN
- ✅ No local storage needed
- ✅ Easy to replace later

## Image URLs (Defined in `src/utils/constants.ts`)

```typescript
export const IMAGES = {
  HERO_BG: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80',
  CARGO_PLANE: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80',
  CARGO_SHIP: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
  DELIVERY_TRUCK: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80',
  WAREHOUSE: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
  PACKAGE: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=800&q=80',
  TRACKING: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80',
  GLOBE: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80',
  LOGISTICS: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
  CUSTOMS: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
};
```

## Usage Example

```tsx
import { IMAGES } from '../utils/constants';

<img 
  src={IMAGES.CARGO_PLANE} 
  alt="Cargo Plane" 
  className="w-full h-auto object-cover"
  loading="lazy"
/>
```

## Image Optimization Tips

### 1. **Lazy Loading**
```tsx
<img loading="lazy" src={IMAGES.WAREHOUSE} alt="Warehouse" />
```

### 2. **Responsive Images**
```tsx
<img 
  srcSet={`
    ${IMAGES.CARGO_PLANE}?w=400 400w,
    ${IMAGES.CARGO_PLANE}?w=800 800w,
    ${IMAGES.CARGO_PLANE}?w=1200 1200w
  `}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  src={IMAGES.CARGO_PLANE}
  alt="Cargo Plane"
/>
```

### 3. **WebP Format**
Unsplash automatically serves WebP when supported by the browser.

### 4. **Blur Placeholder** (Optional)
```tsx
<img 
  src={IMAGES.CARGO_PLANE}
  alt="Cargo Plane"
  className="blur-sm transition-all duration-300"
  onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
/>
```

## Replacing with Custom Images

When you have custom images/brand assets:

### Option 1: Local Images
```bash
# Add images to public folder
public/
  images/
    logo.svg
    hero-bg.jpg
    cargo-plane.jpg
```

```tsx
// Use in components
<img src="/images/logo.svg" alt="Logo" />
```

### Option 2: Update Constants
```typescript
// src/utils/constants.ts
export const IMAGES = {
  HERO_BG: '/images/hero-bg.jpg',
  CARGO_PLANE: '/images/cargo-plane.jpg',
  // ... rest
};
```

### Option 3: CDN/Cloud Storage
```typescript
export const IMAGES = {
  HERO_BG: 'https://your-cdn.com/images/hero-bg.jpg',
  CARGO_PLANE: 'https://your-cdn.com/images/cargo-plane.jpg',
};
```

## Logo & Branding

Currently using a **gradient icon + text logo** in the Navbar:

```tsx
<div className="bg-gradient-to-br from-primary to-orange-dark p-2 rounded-lg">
  <Package className="h-6 w-6 text-white" />
</div>
<span className="text-xl font-bold bg-gradient-to-r from-primary to-orange-dark bg-clip-text text-transparent">
  Raphexpress
</span>
```

### To Replace with Custom Logo:
```tsx
<img src="/images/logo.svg" alt="Raphexpress" className="h-8" />
```

## Icon Strategy

Using **Lucide React** for all icons:
- Consistent design
- Tree-shakeable (only imports used icons)
- Customizable size and color
- Lightweight

```tsx
import { Package, Plane, Ship, Truck } from 'lucide-react';

<Plane className="h-6 w-6 text-primary" />
```

## Background Patterns

Custom SVG pattern in hero section:

```tsx
<div className="absolute inset-0 opacity-10">
  <div className="absolute inset-0" style={{
    backgroundImage: `url("data:image/svg+xml,...")`,
  }} />
</div>
```

## Image Performance Checklist

- ✅ Use appropriate image sizes (don't load 4K for thumbnails)
- ✅ Enable lazy loading for below-the-fold images
- ✅ Use CDN for faster delivery
- ✅ Compress images (80-85% quality is usually fine)
- ✅ Use modern formats (WebP, AVIF)
- ✅ Add width/height attributes to prevent layout shift
- ✅ Use blur placeholders for better UX

## Recommended Tools

- **Compression**: TinyPNG, Squoosh
- **Format Conversion**: Cloudinary, ImageKit
- **SVG Optimization**: SVGOMG
- **Icon Library**: Lucide React (already installed)

## Future Enhancements

- [ ] Add image component with automatic optimization
- [ ] Implement progressive image loading
- [ ] Add blur hash placeholders
- [ ] Setup image CDN (Cloudinary/ImageKit)
- [ ] Create custom illustration set

---

**Note**: All current images are from Unsplash and are free to use. Replace with your own branded assets when available.
