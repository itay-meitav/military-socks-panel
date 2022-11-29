import query from '.';

export async function countRows(
  table: 'socks' | 'locations' | 'officers' | 'locations_history',
) {
  try {
    return await query('select count(*) as count from ' + table, []).then(
      (res) => res.rows[0]?.count || 0,
    );
  } catch (e) {
    console.error(e);
  }
}
