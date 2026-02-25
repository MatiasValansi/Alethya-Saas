from fastapi import FastAPI

app = FastAPI(title="Alethya SaaS API")

@app.get("/")
def read_root():
    return {"status": "Alethya API is running", "version": "2.0-SaaS"}