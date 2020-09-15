SELECT cohorts.name AS cohort, COUNT(assignment_submissions.id) AS total_submissions
FROM assignment_submissions
JOIN students ON (assignment_submissions.student_id = students.id)
JOIN cohorts ON (students.cohort_id = cohorts.id)
GROUP BY cohorts.name 
ORDER BY COUNT(assignment_submissions.id) DESC;