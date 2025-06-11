from datetime import date as Date
from typing import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from . import db

class Habit(db.Model):
    __tablename__ = "habits"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String(128), nullable=False)
    check_ins: Mapped[List["CheckIn"]] = relationship(
        "CheckIn",
        back_populates="habit",
        cascade="all, delete-orphan",
        lazy="selectin"
    )

    def __repr__(self) -> str:
        return f"<Habit id={self.id} name={self.name}>"

class CheckIn(db.Model):
    __tablename__ = "check_ins"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[Date] = mapped_column(db.Date, nullable=False)
    habit_id: Mapped[int] = mapped_column(db.ForeignKey("habits.id"), nullable=False)
    habit: Mapped[Habit] = relationship("Habit", back_populates="check_ins")

    __table_args__ = (
        db.UniqueConstraint("habit_id", "date", name="uix_habit_date"),
    )

    def __repr__(self) -> str:
        return f"<CheckIn id={self.id} habit_id={self.habit_id} date={self.date}>"
