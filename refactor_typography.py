import os
import re

H1_BASE = "text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950"
H2_BASE = "text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950"
H3_BASE = "text-sm md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950"
P_BASE = "text-slate-600 leading-relaxed font-normal text-sm md:text-base"

def strip_typography(cls):
    cls = re.sub(r'\b(?:text-(?:xs|sm|base|lg|xl|[2-9]xl|\[.*?\]))\b', '', cls)
    cls = re.sub(r'\b(?:(?:sm|md|lg|xl|2xl):text-(?:xs|sm|base|lg|xl|[2-9]xl|\[.*?\]))\b', '', cls)
    cls = re.sub(r'\b(?:font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black))\b', '', cls)
    cls = re.sub(r'\b(?:tracking-(?:tighter|tight|normal|wide|wider|widest|\[.*?\]))\b', '', cls)
    cls = re.sub(r'\b(?:leading-(?:none|tight|snug|normal|relaxed|loose|\[.*?\]))\b', '', cls)
    cls = re.sub(r'\b(?:text-(?:slate|gray|zinc|neutral|stone|indigo|blue|red|amber|white|black|transparent)[^\s]*)\b', '', cls)
    cls = re.sub(r'\b(?:uppercase|lowercase|capitalize|normal-case)\b', '', cls)
    return " ".join(cls.split())

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    def repl_heading(match):
        tag = match.group(1)
        cls_raw = match.group(2)
        stripped = strip_typography(cls_raw)
        
        if tag == 'h1':
            new_cls = f"{stripped} {H1_BASE}".strip()
        elif tag == 'h2':
            new_cls = f"{stripped} {H2_BASE}".strip()
        elif tag in ['h3', 'h4', 'h5']:
            new_cls = f"{stripped} {H3_BASE}".strip()
        else:
            new_cls = cls_raw
            
        return f'<{tag} className="{new_cls}"'
    
    content = re.sub(r'<(h[1-5])\s+className="([^"]+)"', repl_heading, content)
    
    def repl_span(match):
        cls_raw = match.group(1)
        if 'text-indigo-600' in cls_raw and 'uppercase' in cls_raw:
            stripped = strip_typography(cls_raw)
            stripped = re.sub(r'\bmb-[0-9]\b', '', stripped)
            stripped = re.sub(r'\bblock\b', '', stripped)
            new_cls = f"{stripped} text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-indigo-600 block mb-3".strip()
            new_cls = " ".join(new_cls.split())
            return f'<span className="{new_cls}"'
        return match.group(0)

    content = re.sub(r'<span\s+className="([^"]+)"', repl_span, content)

    def repl_p(match):
        cls_raw = match.group(1)
        if 'text-slate-500' in cls_raw or 'text-slate-400' in cls_raw or 'leading-relaxed' in cls_raw:
            stripped = strip_typography(cls_raw)
            new_cls = f"{stripped} {P_BASE}".strip()
            return f'<p className="{new_cls}"'
        return match.group(0)
    
    content = re.sub(r'<p\s+className="([^"]+)"', repl_p, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated typography in {filepath}")

def main():
    target_dir = r"d:\VD-WEB\src"
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
