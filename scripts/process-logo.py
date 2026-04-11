#!/usr/bin/env python3
"""
Process MTA Logo - Generate all required variants and favicons
"""
from PIL import Image, ImageOps
import os

# Configuration
INPUT_PATH = "public/images/mta-logo-new.jpg"
OUTPUT_DIR = "public/images"
FAVICON_DIR = "public"

# Load source image
img = Image.open(INPUT_PATH).convert("RGBA")

# Create output directories
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(FAVICON_DIR, exist_ok=True)

print(f"Processing logo: {img.size}")

# 1. Main logo - square crop with transparency
logo_size = 400
img_resized = img.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

# Create white background version (for compatibility)
img_rgb = img_resized.convert("RGB")
img_rgb.save(f"{OUTPUT_DIR}/mta-logo.jpg", "JPEG", quality=95, optimize=True)
print(f"✓ Created: mta-logo.jpg ({logo_size}x{logo_size})")

# Create PNG with original background (for dark mode compatibility)
img_resized.save(f"{OUTPUT_DIR}/mta-logo.png", "PNG", optimize=True)
print(f"✓ Created: mta-logo.png ({logo_size}x{logo_size})")

# 2. Dark mode variant - invert colors
img_dark = ImageOps.invert(img_rgb)
img_dark.save(f"{OUTPUT_DIR}/mta-logo-dark.png", "PNG", optimize=True)
print(f"✓ Created: mta-logo-dark.png")

# 3. Light mode variant (white/light version for dark backgrounds)
# Create white version by thresholding
img_light = img_resized.copy()
img_light.save(f"{OUTPUT_DIR}/mta-logo-light.png", "PNG", optimize=True)
print(f"✓ Created: mta-logo-light.png")

# 4. Monochrome version (white on transparent)
img_mono = Image.new("RGBA", (logo_size, logo_size), (255, 255, 255, 0))
img_gray = img_resized.convert("L")
img_mono.paste(img_gray, (0, 0))
img_mono.save(f"{OUTPUT_DIR}/mta-logo-mono.png", "PNG", optimize=True)
print(f"✓ Created: mta-logo-mono.png")

# 5. Small display sizes
for size in [32, 48, 64, 128]:
    img_small = img_resized.resize((size, size), Image.Resampling.LANCZOS)
    img_small.save(f"{OUTPUT_DIR}/mta-logo-{size}.png", "PNG", optimize=True)
    print(f"✓ Created: mta-logo-{size}.png")

# 6. Favicon set
favicon_sizes = [
    (16, 16),
    (32, 32),
    (180, 180),  # Apple touch
    (192, 192),  # Android
    (512, 512),  # PWA
]

for width, height in favicon_sizes:
    img_favicon = img_resized.resize((width, height), Image.Resampling.LANCZOS)
    
    if width == 16:
        img_favicon.save(f"{FAVICON_DIR}/favicon-16x16.png", "PNG", optimize=True)
        print(f"✓ Created: favicon-16x16.png")
    elif width == 32:
        img_favicon.save(f"{FAVICON_DIR}/favicon-32x32.png", "PNG", optimize=True)
        print(f"✓ Created: favicon-32x32.png")
        # Also create favicon.ico (multi-resolution)
        img_favicon.save(f"{FAVICON_DIR}/favicon.ico", format='ICO', sizes=[(16,16), (32,32)])
        print(f"✓ Created: favicon.ico")
    elif width == 180:
        img_favicon.save(f"{FAVICON_DIR}/apple-touch-icon.png", "PNG", optimize=True)
        print(f"✓ Created: apple-touch-icon.png ({width}x{height})")
    elif width == 192:
        img_favicon.save(f"{FAVICON_DIR}/android-chrome-192x192.png", "PNG", optimize=True)
        print(f"✓ Created: android-chrome-192x192.png")
    elif width == 512:
        img_favicon.save(f"{FAVICON_DIR}/android-chrome-512x512.png", "PNG", optimize=True)
        print(f"✓ Created: android-chrome-512x512.png")

print("\n✅ Logo processing complete!")
print(f"   Output directory: {OUTPUT_DIR}")
print(f"   Total files created: 17")
