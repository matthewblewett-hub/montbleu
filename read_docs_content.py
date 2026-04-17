from docx import Document

def read_docx(path):
    print(f"\n--- Content of {path} ---")
    try:
        doc = Document(path)
        for para in doc.paragraphs:
            if para.text.strip():
                print(para.text)
    except Exception as e:
        print(f"Error reading {path}: {e}")

read_docx("../Le Sanctuaire Vision Blueprint .docx")
read_docx("../The Le Sanctuaire Journey Updated 14 Nov 25.docx")
read_docx("../Le Sanctuaire Website content.docx")
