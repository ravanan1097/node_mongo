const mongoose=require("mongoose");

let task=new mongoose.Schema(
    {
        empId:{type:mongoose.Schema.Types.ObjectId,ref:"employee",required:true},
        taskId:{type:String,unique:true},
        taskArea:{type:String},
        taskDesc:{type:String},
        email:{type:String}
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("task",task);