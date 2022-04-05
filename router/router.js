const express=require("express");
const router=express.Router();

const empController=require("../controllers/empController");
const taskController=require("../controllers/taskController");

/**
 * Employee Controller
 */
router.post("/create/users",empController.createEmployee);
//router.get("/test",empController.axiostest);
router.get("/fetchAll",empController.fetchAll);
router.get("/fetch/:name",empController.fetch);
router.get("/delete/:name",empController.delete);
router.post("/update",empController.update);
//router.get("/city",empController.cityDetails);
router.get("/allemptask",empController.empTaskAll);


/**
 * Task Controller
 */
router.post("/create/task",taskController.createTask);

module.exports=router;