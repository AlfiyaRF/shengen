import psycopg2
from psycopg2.extras import RealDictCursor
import os

conn_uri = os.environ['PG_CONN_URI']

conn = psycopg2.connect(conn_uri)

cur = conn.cursor(cursor_factory=RealDictCursor)

cur.execute("select * from point")

rows = cur.fetchall()

for row in rows:
    print(row)

cur.close()
conn.close()

def import_points():
    from app import POINTS
    for point in POINTS:
        cur.execute("""
        INSERT INTO point (country, city, href, link, address, longitude, latitude, number)
        VALUES (%(country)s, %(city)s, %(href)s, %(link)s, %(address)s, %(longitude)s, %(latitude)s, %(number)s)
        """, point)
    conn.commit()