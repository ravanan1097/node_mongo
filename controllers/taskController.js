const taskModel = require("../models/tasks");
const empModel = require("../models/employee");

exports.createTask = async (req, res) => {
    try {
        const { email} = req.body;

        let checkEmail = await empModel.findOne({email});
        if (!checkEmail) return res.json("Employee not found");

        let task = await taskModel.create(req.body);
        console.log(task);
        if (task) return res.json("Task Created Successfully");
    }
    catch (e) {
        console.log(e);
        return res.json(e);
    }


}