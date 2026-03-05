import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/sequence', exist_ok=True)

for i in range(120):
    img = Image.new('RGB', (1920, 1080), color=(0, 0, 0))
    d = ImageDraw.Draw(img)
    # Simple centered text
    d.text((900, 500), f"Frame {i}", fill=(255, 255, 255))
    
    # Progress ring
    d.ellipse([(960 - i*5, 540 - i*5), (960 + i*5, 540 + i*5)], outline=(132, 169, 108), width=20)
    
    img.save(f'public/sequence/frame_{i}.webp', 'WEBP')

print("Frames generated successfully!")
