from pydantic import BaseModel

class LogCreate(BaseModel):
    user: str
    ip: str
    action: str
    time: str