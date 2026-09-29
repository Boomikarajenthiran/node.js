import base64, os, sys
raw = sys.argv[1] + '=' * (-len(sys.argv[1]) % 4)
chunk = base64.b64decode(raw).decode('utf-8')
target = sys.argv[2]
p = os.path.join(r'C:/Users/acer/.gemini/antigravity/scratch', target)
os.makedirs(os.path.dirname(p), exist_ok=True)
with open(p, 'a', encoding='utf-8') as f:
    f.write(chunk)
print(f'Appended {len(chunk)} chars to {target}')
