

var mysql=require("mysql");
var pool = mysql.createPool({
   	host:"localhost",
	user:"root",
	password:"",
	database:"shop"
});
module.exports = {
	pool:pool
}