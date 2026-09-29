import base64, os, sys
rel = sys.argv[1]
b64 = sys.argv[2]
b64 += '=' * (-len(b64) % 4)
content = base64.b64decode(b64).decode('utf-8')
ROOT = 'C:/Users/acer/.gemini/antigravity/scratch/futureit-2029'
p = os.path.join(ROOT, rel)
os.makedirs(os.path.dirname(p), exist_ok=True)
with open(p, 'w', encoding='utf-8') as fz:
    fz.write(content.strip() + '\n')
print('Saved:', rel)
