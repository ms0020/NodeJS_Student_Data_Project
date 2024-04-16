const getStudents = "SELECT * FROM students";
const getStudentById = "SELECT * FROM students WHERE id = $1"; // $1 is our parameter.
const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";
const addStudent = "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";
const removeStudent = "DELETE FROM students WHERE id = $1";
const updateStudent = "UPDATE students SET name = $1 WHERE id = $2";
const getStudentByAge = "SELECT * FROM students WHERE age = $1";
const updateDobById = "UPDATE students SET dob = $1 WHERE id = $2";
const getStudentByAgeRange = "SELECT * FROM students WHERE age BETWEEN $1 and $2";
const getFromPattern = "SELECT * FROM students WHERE name ILIKE $1";
const getStudentByDob = "SELECT * FROM students WHERE dob BETWEEN $1 AND $2";
const getStudentCount = "SELECT COUNT(*) AS count FROM students";


module.exports = {
    getStudents,
    getStudentById,
    checkEmailExists,
    addStudent,
    removeStudent,
    updateStudent,
    getStudentByAge,
    updateDobById,
    getStudentByAgeRange,
    getFromPattern,
    getStudentByDob,
    getStudentCount,
};