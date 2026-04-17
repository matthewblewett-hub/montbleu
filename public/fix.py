import glob
import re

files = glob.glob("../dist/assets/*.js")
for file in files:
    with open(file, "r") as f:
        content = f.read()

    changed = False

    # First, blindly revert all "Outdoor Gym.jpg" back to "GH 1.jpg"
    # because my previous script replaced them ALL blindly!
    if "Outdoor Gym.jpg" in content:
        content = content.replace("Outdoor Gym.jpg", "GH 1.jpg")
        changed = True

    # Now, find the specific Outdoor Gym block and correctly set ONLY THAT block's image.
    # The javascript object will contain title:"Outdoor Gym", etc.
    # We can use regex to find the block for Outdoor Gym and replace its GH 1.jpg
    pattern = r'(title:\s*"Outdoor Gym".*?image:\s*"/assets/newimages/)GH 1\.jpg(")'
    new_content, num_subs = re.subn(pattern, r'\1Outdoor Gym.jpg\2', content, flags=re.DOTALL)
    
    if num_subs > 0:
        content = new_content
        changed = True
        print(f"Surgically fixed the Outdoor Gym object in {file}!")
    
    if changed:
        with open(file, "w") as f:
            f.write(content)
        print(f"Updated {file}")
