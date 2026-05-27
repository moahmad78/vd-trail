import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Button hover states
    content = re.sub(r'hover:bg-slate-800', r'hover:bg-indigo-600', content)
    
    # 2. Form input focus rings
    content = re.sub(r'focus:border-slate-500', r'focus:border-indigo-600', content)
    content = re.sub(r'focus:ring-0', r'focus:ring-1 focus:ring-indigo-600', content)
    content = re.sub(r'focus:ring-slate-500', r'focus:ring-indigo-600', content)

    # 3. Active Category Filters
    # Usually: bg-[#020617] text-white ... border border-slate-900
    # or just: bg-[#020617] text-white
    # Wait, if I replace all "bg-[#020617] text-white", it will break regular buttons. 
    # I should target them specifically in the files.
    
    # 4. Micro-tags & Icons
    # Replace text-slate-400 with text-indigo-600 if it has uppercase and tracking
    def cls_repl(match):
        cls = match.group(1)
        
        # If it's an uppercase tag or overline, make it indigo
        if 'text-slate-400' in cls and 'uppercase' in cls and 'tracking-' in cls:
            cls = cls.replace('text-slate-400', 'text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]')
            # clean up duplicate text sizes or fonts
            cls = re.sub(r'text-\[(9px|11px|xs)\]', '', cls)
            cls = re.sub(r'text-xs', '', cls)
            cls = re.sub(r'font-bold', '', cls)
            cls = re.sub(r'tracking-widest', '', cls)
            cls = re.sub(r'tracking-\[0\.[0-9]+em\]', '', cls)
            cls = re.sub(r'\s+', ' ', cls).strip()
            # ensuring block
            if 'block' not in cls and 'inline-block' not in cls and 'flex' not in cls:
                cls += ' block'
        
        return f'className="{cls}"'

    content = re.sub(r'className="([^"]+)"', cls_repl, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

def main():
    target_dir = r"d:\VD-WEB\src"
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
