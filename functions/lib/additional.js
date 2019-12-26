//-- About comment color definition
//! Red     : Main Topic each section
//? Blue    : Sub Topic each section
//# Yellow  : Example endpoint 
//* Green   : Work of this section
//~ Pink    : Explain function
//---------------------------------------------------------------------//
//! Additional Function
//? Error 404
function error404() {
  res.status(404)
    .json({
      status: 404,
      data: "Error endpoint not found"
    });
}

//? Registration Section
//* Check user and password length 
function checkLength(id, password) {
  //~ Check id length is == 13 because student id is = 13
  var idLength = false
  var psLength = false

  id.length != 13 ? idLength = false : idLength = true;
  password.length != 13 ? psLength = false : psLength = true;

  if ((id.length || psLength) == false) {
    res.status(404)
      .json({
        status: 404,
        data: "Error endpoint not found"
      });
  }
}