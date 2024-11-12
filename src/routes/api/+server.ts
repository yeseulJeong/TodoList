import {json} from '@sveltejs/kit';
// import conn from '$lib/db'
// import conn from '../../lib/db'

// export async function GET() {
//     const result = await conn.query('SELECT * FROM todos;');
//     // console.log('result', result);
   
//     return json(result[0])
// }

// import { supabase } from '$lib/supabaseClient';
import { supabase } from '../../lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('todos')
    .select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return json({ error: 'Error fetching data' });
  } else {
    console.log('Data:', data);
    return json(data);
  }
}

export async function POST(request) {
    const { description } = request.json();
    const { data, error } = await supabase
        .from('todos')
        .insert([{ description }]);
    
    if (error) {
        console.error('Error inserting data:', error);
        return json({ error: 'Error inserting data' });
    } else {
        console.log('Data:', data);
        return new Response(JSON.stringify(data), {status: 201});
    }
}
