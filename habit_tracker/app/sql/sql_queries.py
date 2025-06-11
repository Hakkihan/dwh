# app/sql/sql_queries.py

# streaks query
GET_STREAKS_FOR_HABIT = """
SELECT MIN(date) AS first, MAX(date) AS last, COUNT(*) AS days
FROM (
    SELECT
        date,
        date(julianday(date) - ROW_NUMBER() OVER (ORDER BY date)) AS grp
    FROM check_ins
    WHERE habit_id = :habit_id
)
GROUP BY grp
ORDER BY first;
"""




# Other query *examples* . Add more queries as needed

GET_ALL_HABITS = """
SELECT id, name FROM habits;
"""

GET_HABIT_BY_ID = """
SELECT id, name FROM habits WHERE id = :habit_id;
"""


