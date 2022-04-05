const model = require("../models/employee");
const task = require("../models/tasks");
const axios = require("axios");
const { userInfo } = require("os");

exports.createEmployee = async (req, res) => {


   try {
      let name = req.body.name;

      let existingUser = await model.findOne({ name })
      if (existingUser) return res.json("User already Exists");

      let data = await model.create(req.body);
      return res.json("Success");
   }
   catch (err) {
      return res.json("Error: " + err)
   }
};

// exports.axiostest = async (req, res) => {


//    let covi;

//    var options = {
//       method: 'GET',
//       url: 'https://covid-19-statistics.p.rapidapi.com/regions',
//       headers: {
//          'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com',
//          'x-rapidapi-key': 'ac9ea60c2dmsh15971bb295f09d0p1b9f5djsne15bfb582f36'
//       }
//    };

//    await axios.request(options).then(function (response) {
//       covi = response.data
//    }).catch(function (error) {
//       console.error(error);
//    });


//    console.log(covi.data.find(e => e.name == 'Germany'))

//    let response = {}
//    covi.data.forEach(e => {
//       var country = e.name;
//       Object.assign(response, { country })

//    });

//    res.json(response)
// };

// exports.cityDetails = async (req, res) => {


//    var options = {
//       method: 'GET',
//       headers: {
//          'x-rapidapi-host': 'countries-cities.p.rapidapi.com',
//          'x-rapidapi-key': 'ac9ea60c2dmsh15971bb295f09d0p1b9f5djsne15bfb582f36'
//       }
//    };
//    const id = 5128580;
//    axios.request(`https://countries-cities.p.rapidapi.com/location/city/${id}`, options).then(function (response) {
//       console.log(response.data);
//    }).catch(function (error) {
//       console.error(error);
//    });

// }

exports.fetchAll = async (req, res) => {
   try {

      let emp = await model.find();
      res.json(emp)
   }
   catch (err) {
      console.log(err);
      res.json(err)
   }
};

exports.fetch = async (req, res) => {

   try {
      let name = req.params.name;
      let emp = await model.findOne({ name });
      res.json(emp);
   }
   catch (e) {
      console.log(e);
      res.json(e);
   }
};

exports.delete = async (req, res) => {
   try {
      let name = req.params.name;
      let result = await model.findOneAndDelete({ name });
      if (result) {
         return res.json("Entry Deleted Successfully");
      }
      else {
         return res.json(result)
      }
   }
   catch (e) {
      console.log(e);
      res.json(e);
   }
};

exports.update = async (req, res) => {

   try {
      const { name } = req.query;

      console.log(name);

      let emp = await model.findOne({ name });
      if (!emp) return res.json("Employee not found")

      let body = req.body;

      console.log(body)
      let upModel = await model.findOneAndUpdate({ name }, { body }, { returnOriginal: false });

      if (upModel) {
         console.log(upModel)
         res.json("Updated Successfully")
      }
      else {
         res.json(upModel);
      }
   }
   catch (e) {
      console.log(e);
      res.json(e);
   }
};

exports.empTaskAll = async (req, res) => {
   try {

      let { empId } = req.body;

      let employeeTask = await task.find({"empId": empId}).populate([{path:"empId",select:"name"}]);

      return res.json(employeeTask)
   }
   catch (e) {
      console.log(e);
      return res.json(e)
   }

};