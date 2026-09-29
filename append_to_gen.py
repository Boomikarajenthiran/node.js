import base64, sys
raw = sys.argv[1] + '=' * (-len(sys.argv[1]) % 4)
chunk = base64.b64decode(raw).decode('utf-8')
with open(r'C:\Users\acer\.gemini\antigravity\scratch\generate_app.py', 'a', encoding='utf-8') as f:
    f.write(chunk + '\n')
print('Appended chunk.')
