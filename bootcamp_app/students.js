const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
const cohort_month = process.argv[2];
const rows_limit = process.argv[3];

pool.query(`
SELECT students.id, students.name, cohorts.name as cohort_name
FROM cohorts
JOIN students ON (cohorts.id = students.cohort_id)
WHERE cohorts.name LIKE '%${cohort_month}%'
LIMIT ${rows_limit};`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort.`);
  })
  pool.end();
})
.catch(err => console.error('query error', err.stack));