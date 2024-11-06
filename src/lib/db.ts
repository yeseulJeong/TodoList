import mysql from 'mysql2/promise';

const pool = mysql.createPool({
	host: import.meta.env.VITE_DB_HOST,
	user: import.meta.env.VITE_DB_USER,
	password: import.meta.env.VITE_DB_PASSWORD,
	database: import.meta.env.VITE_DB_NAME,
	// timezone: import.meta.env.VITE_DB_TIMEZONE,
	port: import.meta.env.VITE_DB_PORT,
	waitForConnections: true,
	connectionLimit: 3,
	queueLimit: 0
});

export default pool;
