import os
from PIL import Image

src_dir = '/home/pranav/Downloads/matcha zip'
dest_dir = '/home/pranav/Downloads/matcha zip/mega-matcha-latte/public/sequence'

os.makedirs(dest_dir, exist_ok=True)

# Delete existing placeholder webp images
for f in os.listdir(dest_dir):
    os.remove(os.path.join(dest_dir, f))

# Find the user's ezgif frames
frames = [f for f in os.listdir(src_dir) if f.startswith('ezgif-frame-') and f.endswith('.jpg')]
frames.sort()

# We are keeping all frames now, including the first 21
# frames = frames[21:]

print(f"Found {len(frames)} frames. Converting and copying...")

for i, frame in enumerate(frames):
    img_path = os.path.join(src_dir, frame)
    # Open and convert to webp to match original prompt format, or just keep as webp
    with Image.open(img_path) as img:
        dest_path = os.path.join(dest_dir, f'frame_{i}.webp')
        img.save(dest_path, 'WEBP')

print("Done copying and converting real photos!")
