import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    content = re.sub(r'bg-\[\#020617\]\s+text-slate-950', 'bg-[#020617] text-white', content)
    content = re.sub(r'hover:bg-\[\#020617\]', 'hover:bg-slate-800', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated contrast: {filepath}")

def main():
    target_dir = r"d:\VD-WEB\src"
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
