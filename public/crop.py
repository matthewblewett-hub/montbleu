from PIL import Image

def crop_transparency(img_path):
    img = Image.open(img_path)
    img = img.convert("RGBA")
    bbox = img.getbbox() # gets bounding box of non-zero alpha (if any pixel is slightly non-zero)
    if bbox:
        # crop to the bounding box
        img = img.crop(bbox)
        # make it square by padding with transparent if needed
        width, height = img.size
        size = max(width, height)
        new_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        # paste in center
        new_img.paste(img, ((size - width) // 2, (size - height) // 2))
        return new_img
    return img

new_fav = crop_transparency("favicon.png")
new_fav.save("favicon.png")
new_fav.save("../dist/favicon.png")
print("Cropped favicon successfully.")
