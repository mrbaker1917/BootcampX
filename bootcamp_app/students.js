const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
const cohortMonth = process.argv[2];
const rowsLimit = process.argv[3];
const values = [`%${cohortMonth}%`, rowsLimit];
const queryString = `
SELECT students.id, students.name, cohorts.name as cohort_name
FROM cohorts
JOIN students ON (cohorts.id = students.cohort_id)
WHERE cohorts.name LIKE $1
LIMIT $2;`;

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort.`);
    });
    pool.end();
  })
  .catch(err => console.error('query error', err.stack));