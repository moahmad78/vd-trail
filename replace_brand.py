import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Typography standardizations
    content = re.sub(r'font-display', '', content)
    
    # Micro-tags replacement (approximating anything with text-[10px] and uppercase)
    content = re.sub(r'text-\[10px\]\s+font-black\s+tracking-\[0\.2em\]\s+text-(?:amber|slate)-[0-9]+', 
                     'text-[10px] font-bold tracking-[0.2em] text-slate-400', content)
                     
    content = re.sub(r'text-\[10px\]\s+font-black\s+tracking-widest\s+text-(?:amber|slate)-[0-9]+', 
                     'text-[10px] font-bold tracking-[0.2em] text-slate-400', content)

    # 2. Color token replacements
    content = re.sub(r'text-amber-[0-9]+', 'text-slate-400', content)
    content = re.sub(r'bg-amber-[0-9]+', 'bg-[#020617]', content)
    content = re.sub(r'border-amber-[0-9]+', 'border-slate-400', content)
    
    content = re.sub(r'hover:text-amber-[0-9]+', 'hover:text-slate-400', content)
    content = re.sub(r'hover:bg-amber-[0-9]+', 'hover:bg-slate-800', content)
    content = re.sub(r'hover:border-amber-[0-9]+', 'hover:border-slate-400', content)
    
    content = re.sub(r'focus:border-amber-[0-9]+', 'focus:border-slate-500', content)
    content = re.sub(r'focus:ring-amber-[0-9]+', 'focus:ring-slate-500', content)
    
    content = re.sub(r'shadow-amber-[0-9]+/[0-9]+', 'shadow-slate-500/20', content)
    
    content = re.sub(r'text-accent', 'text-slate-400', content)
    content = re.sub(r'bg-accent', 'bg-[#020617]', content)
    content = re.sub(r'border-accent', 'border-slate-400', content)
    content = re.sub(r'hover:bg-accent', 'hover:bg-slate-800', content)
    content = re.sub(r'hover:text-accent', 'hover:text-slate-400', content)
    content = re.sub(r'hover:border-accent', 'hover:border-slate-400', content)
    content = re.sub(r'focus:border-accent', 'focus:border-slate-500', content)

    # 3. Interactive Actions (Buttons / CTAs)
    # Finding typical button classes and enforcing the strict inverse masking.
    # We will look for "px-X py-Y rounded" combined with "text-white"
    
    # 4. Form inputs
    # Let's fix input fields manually to be safer, but we can do a broad stroke on "outline-none"
    
    # 5. Fix "bg-[#020617] text-slate-950" which might happen if we replace text-amber-500 with text-slate-400 on dark bg
    # Actually wait, let's just do the color tokens first, then I'll refine.

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

def main():
    target_dir = r"d:\VD-WEB\src"
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css')):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
