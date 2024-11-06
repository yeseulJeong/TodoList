import {json} from '@sveltejs/kit';
// import conn from '$lib/db'
import conn from '../../lib/db'

export async function GET() {
    const result = await conn.query('SELECT * FROM todos;');
    // console.log('result', result);
   
    return json(result[0])
}