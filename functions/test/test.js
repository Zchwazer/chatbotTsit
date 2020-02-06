//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//
//# Test Section

//~ Check user already register ?
let userRef = db.collection('users').doc('0000000000000');
let checkUser = userRef.get()
    .then(doc => {
        if (doc.exists) {
            console.log('found user already register')        
        }
        else{
            let stuRef = db.collection('students').doc('0000000000000');
            let checkOnce = stuRef.get()
                .then(studentDoc => {
                    if (!studentDoc.exists) {
                        console.log('not student')
                    } else {
                        //~ Get first name & last name
                        var thName = studentDoc.data().NameTH
                        var enName = studentDoc.data().NameEN
                        var major = studentDoc.data().Major
                        var fac = studentDoc.data().Faculty
                        var stat = studentDoc.data().Status
                        var deg = studentDoc.data().Degree
                        var studentId = studentDoc.data().Id

                        console.log(studentDoc.data())
                    }});
                
        }});
            
    //     } else {
    //         //~ Check student id is CPE student ?
    //         
    //                     //~ Add data to users collection
    //                     let docRef = db.collection('users').doc(studentId);

    //                     let setAda = docRef.set({
    //                         Id: studentId,
    //                         NameTH: thName,
    //                         NameEN: enName,
    //                         Email: req.body.Email,
    //                         Password: req.body.Password,
    //                         Major:major,
    //                         Faculty:fac,
    //                         Status:stat,
    //                         Degree:deg,                                
    //                         Level: 0
    //                     });

    //                     return res.status(201)
    //                         .json({
    //                             status: 201,
    //                             data: "Add data into collection complete"
    //                         })
    //                 }
    //             })
    //             .catch(err => {
    //                 return res.status(404).json({
    //                     status: 404,
    //                     data: "Error, some input was missing"
    //                 })
    //             });
    //     }
    // })
    // .catch(err => {
    //     return res.status(404).json({
    //         status: 404,
    //         data: "Error, some input was missing"
    //     })
    // });