import os, base64

ROOT = r'C:\Users\acer\.gemini\antigravity\scratch\futureit-2029'

def save(rel, content):
    p = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print('Saved:', rel)
