from chalice import Chalice
from urllib.parse import urlparse, parse_qs
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Chalice(app_name='visa')

def _get_postgres_conn():
	conn_uri = os.environ['PG_CONN_URI']
	return psycopg2.connect(conn_uri)

def get_unique_countries():
	countries = set();
	conn = _get_postgres_conn()
	cur = conn.cursor(cursor_factory=RealDictCursor)
	cur.execute("select distinct country from point")
	unique_countries = cur.fetchall()
	for item in unique_countries:
		countries.add(item['country'])
	return countries

def get_unique_cities():
	cities = set();
	conn = _get_postgres_conn()
	cur = conn.cursor(cursor_factory=RealDictCursor)
	cur.execute("select distinct city from point")
	unique_cities = cur.fetchall()
	for item in unique_cities:
		cities.add(item['city'])
	return cities

@app.route('/points', cors=True)
def points():
	conn = _get_postgres_conn()
	cur = conn.cursor(cursor_factory=RealDictCursor)
	cur.execute("select * from point")
	rows = cur.fetchall()
	return rows

@app.route('/options', cors=True)
def options():
	optionCountry = ["country", "Страна"] + sorted(list(get_unique_countries()));
	optionCity = ["city", "Город"] + sorted(list(get_unique_cities()));
	optionName = [
		"link",
		"Название",
		"Визовый центр",
		"Консульство",
		"Посольство",
	];
	OPTIONS = {
		"optionCountry": optionCountry,
		"optionCity": optionCity,
		"optionName": optionName,
		"optionAddress": ["address", "Адрес"]
	};
	return OPTIONS

@app.route('/new', methods=['POST'], cors=True,
	content_types=['application/json'])
def newPoints():
	request = app.current_request.json_body
	new_point = {
		"country": request["countryLabel"],
		"city": request["cityLabel"],
		"href": request["hrefLabel"],
		"link": request["linkLabel"],
		"address": request["addressLabel"],
		"longitude": request["longitude"],
		"latitude": request["latitude"],
	}

	conn = _get_postgres_conn()
	cur = conn.cursor(cursor_factory=RealDictCursor)
	cur.execute("""
		INSERT INTO point (country, city, href, link, address, longitude, latitude)
		VALUES (%(country)s, %(city)s, %(href)s, %(link)s, %(address)s, %(longitude)s, %(latitude)s)
		""", new_point)
	conn.commit()
	return request

@app.route('/admin', methods=['POST'], cors=True,
	content_types=['application/json'])
def admin():
	request = app.current_request.json_body
	conn = _get_postgres_conn()
	cur = conn.cursor(cursor_factory=RealDictCursor)
	cur.execute("""
		select exists (
			select user_name from users where user_name = %(login)s and user_password = %(password)s)
		""", request)
	is_exist = cur.fetchone()
	return is_exist["exists"]
	