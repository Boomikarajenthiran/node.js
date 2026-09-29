import base64, os, sys
rel_path = sys.argv[1]
b64_content = sys.argv[2]
full_path = os.path.join(r'C:\Users\acer\.gemini\antigravity\scratch\futureit-2029', rel_path)
os.makedirs(os.path.dirname(full_path), exist_ok=True)
with open(full_path, 'wb') as f:
    f.write(base64.b64decode(b64_content))
print(f'Successfully wrote: {rel_path}')
