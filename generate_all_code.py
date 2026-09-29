# Complete Project Code Generator
import os

ROOT = r'C:\Users\acer\.gemini\antigravity\scratch\futureit-2029'

def save(rel_path, content):
    p = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print('Generated:', rel_path)

