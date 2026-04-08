from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# ✅ CORS (IMPORTANT FOR FRONTEND CONNECTION)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Root
@app.get("/")
def root():
    return {"message": "Cloud Security Backend Running"}

# Create Log
@app.post("/logs/")
def create_log(log: schemas.LogCreate, db: Session = Depends(get_db)):
    db_log = models.Log(**log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

# Get Logs
@app.get("/logs/")
def get_logs(db: Session = Depends(get_db)):
    return db.query(models.Log).all()

# Detect Threats
@app.get("/detect/")
def detect(db: Session = Depends(get_db)):
    logs = db.query(models.Log).all()

    threats = []
    user_count = {}

    for log in logs:
        if "failed_login" in log.action:
            user_count[log.user] = user_count.get(log.user, 0) + 1

    for user, count in user_count.items():
        if count >= 3:
            threats.append({
                "user": user,
                "reason": "Multiple failed logins"
            })

    return threats

# Reset Logs
@app.delete("/reset/")
def reset_logs(db: Session = Depends(get_db)):
    db.query(models.Log).delete()
    db.commit()
    return {"message": "All logs cleared"}