const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
const cohortMonth = process.argv[2];
const values = [`%${cohortMonth}%`];
const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort 
FROM teachers
JOIN assistance_requests ON (teacher_id = teachers.id)
JOIN students ON (student_id = students.id)
JOIN cohorts ON (cohort_id = cohorts.id)
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;
`;
pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(a => {
      console.log(`${a.cohort}: ${a.teacher}`);
    });
    pool.end();
  })
  .catch(err => console.error('query error', err.stack));