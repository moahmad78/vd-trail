import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Fix multiple text-[10px] and tracking strings
    content = re.sub(r'(text-\[10px\]\s+){2,}', 'text-[10px] ', content)
    content = re.sub(r'text-\[10px\]\s+text-\[10px\]\s+md:text-\[11px\]', 'text-[10px] md:text-[11px]', content)
    
    # Fix dangling md: or lg:
    content = re.sub(r'\b(sm|md|lg|xl|2xl):\s+', '', content)
    
    # Remove text-[#020617] and text-[#4f46e5] from headings/spans/p where we appended our own text-slate-950 or text-indigo-600
    content = re.sub(r'\btext-\[\#020617\]\b', '', content)
    content = re.sub(r'\s+', ' ', content).replace(' className=" ', ' className="').replace(' "', '"')

    # Re-apply spacing
    content = content.replace('> <', '><').replace(' >', '>')
    
    # Format the file using prettier? Maybe just let python do it.
    
    # Let's fix the ET Achievers section in app/about/page.tsx specifically:
    # "text-[10px] group-hover: text-[10px] transition-colors inline-flex items-center gap-1 cursor-pointer text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-indigo-600 block mb-3"
    # we just need to deduplicate.
    def dedupe_classes(match):
        cls_str = match.group(1)
        classes = cls_str.split()
        seen = set()
        out = []
        for c in classes:
            if c not in seen:
                seen.add(c)
                out.append(c)
        return 'className="' + " ".join(out) + '"'
    
    content = re.sub(r'className="([^"]+)"', dedupe_classes, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned up {filepath}")

def main():
    target_dir = r"d:\VD-WEB\src"
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
