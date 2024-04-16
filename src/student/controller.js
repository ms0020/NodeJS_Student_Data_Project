const { json } = require('express');
const pool = require('../../db');
const queries = require('./queries');


const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        console.log(results.rows)
        res.status(200).json(results.rows);
    });
};

const  getStudentById = (req, res) => {
    console.log("--> Inside Get Students by ID")
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows); //Here res is Response.
    });
};

const addStudent = (req, res) => {
    const {name, email, age, dob} = req.body;
    //check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already exist.");
        }

        //add student to db
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) throw error;
            res.status(201).send("Student added successfully.");
            console.log("Student Added Successfully");
        });
    });
};

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist in the database.");
        };
        
        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student removed successfully.");
        });
    });
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist in the database.");
        };

        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student updated successfully.")
        })
    });
};

const  getStudentByAge = (req, res) => {
    console.log("--> Inside Get Students by AGE")
    const age = parseInt(req.params.age);
    pool.query(queries.getStudentByAge, [age], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const updateDobById = (req, res) => {
    const id = parseInt(req.params.id);
    const { dob } = req.body;
    console.log("DOB = ", dob);
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist in the database.");
        };

        pool.query(queries.updateDobById, [dob, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student DOB updated successfully.");
        });
    });
};


const getStudentByAgeRange = (req, res) => {
    console.log("Here we get students by age in the given range.");
    const { lowRangeAge, highRangeAge } = req.body;
    console.log(lowRangeAge, highRangeAge);
    
     //const highRangeAge = req.body.highRangeAge;
     //console.log(highRangeAge);
    
    pool.query(queries.getStudentByAgeRange, [lowRangeAge, highRangeAge], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        console.log(results.rows);
    });
};

const getFromPattern = (req, res) => {
    const { pattern } = req.body;
    console.log(pattern);

    pool.query(queries.getFromPattern, [`%${pattern}%`], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        console.log(results.rows);
    });
};


const getStudentByDob = (req, res) => {
    let {is_range, minDob, maxDob, dobYear} = req.body;
    // is_range = req.body.is_range;
    // minDob = req.body.minDob;
    // maxDob = req.body.maxDob;
    // dobYear = req.body.dobYear;
    if (is_range === true) {    
        console.log("Here we get students by age in the given range.");
        console.log(minDob, maxDob);
        pool.query(queries.getStudentByDob, [minDob, maxDob], (error,results) =>{
            if (error) throw error;
            res.status(200).json(results.rows);
            console.log(results.rows);
        });

    } else {
        console.log(dobYear);
        minDob = `${dobYear}-01-01 00:00:00`;
        maxDob = `${dobYear + 1}-01-01 00:00:00`;
        pool.query(queries.getStudentByDob, [minDob, maxDob], (error,results) =>{
            if (error) throw error;
            res.status(200).json(results.rows);
            console.log(results.rows);
        });
    };
};


const getStudentCount = (req, res) => {
    pool.query(queries.getStudentCount, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        console.log(results.rows);
    });
};


module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
    getStudentByAge,
    updateDobById,
    getStudentByAgeRange,
    getFromPattern,
    getStudentByDob,
    getStudentCount
};