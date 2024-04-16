const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getStudents);
router.post("/", controller.addStudent);
router.get("/:id", controller.getStudentById);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.removeStudent);
router.get("/:age/get_by_age", controller.getStudentByAge);
router.put("/:id/update_dob", controller.updateDobById);
router.get("/age/get_by_range", controller.getStudentByAgeRange);
router.post("/name/get_by_pattern", controller.getFromPattern);
router.post("/dob/get_by_dob", controller.getStudentByDob);
router.post("/count/get_count", controller.getStudentCount);

module.exports = router;