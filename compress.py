from PIL import Image
import glob
import os

img_dir = r"c:/Users/USER/Downloads/pg asset/pg_weddings/assets/images"

# Collect all common image extensions (case-insensitive)
extensions = ["*.jpg", "*.JPG", "*.jpeg", "*.JPEG", "*.png", "*.PNG"]
files = []
for ext in extensions:
    files.extend(glob.glob(os.path.join(img_dir, ext)))

# Remove duplicates (can happen on case-insensitive filesystems)
files = list(set(files))

success_count: int = 0
error_count: int = 0

for f in files:
    try:
        with Image.open(f) as img:
            ext_lower = os.path.splitext(f)[1].lower()
            is_png = ext_lower == ".png"

            # Convert to RGBA for PNG, RGB for JPEG
            target_mode = "RGBA" if is_png else "RGB"
            if img.mode != target_mode:
                img = img.convert(target_mode)

            # Resize if width is larger than 1200px
            if img.width > 1200:
                ratio = 1200.0 / img.width
                new_size = (1200, int(img.height * ratio))
                resample_filter = getattr(Image, 'Resampling', Image).LANCZOS
                img = img.resize(new_size, resample_filter)

            # Save optimized
            if is_png:
                img.save(f, "PNG", optimize=True)
            else:
                img.save(f, "JPEG", optimize=True, quality=75)

        success_count += 1
    except Exception as e:
        print("Error processing %s: %s" % (os.path.basename(f), e))
        error_count += 1

print("Done. Compressed: %d | Errors: %d" % (success_count, error_count))
