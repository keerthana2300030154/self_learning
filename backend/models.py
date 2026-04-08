from sqlalchemy import Column, Integer, String
from database import Base

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    user = Column(String)
    ip = Column(String)
    action = Column(String)
    time = Column(String)