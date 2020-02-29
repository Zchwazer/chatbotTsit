//! FUNCTION
//~ Change set of number 
function getDate(setString) {
    var newString = setString.split("-");
    return newString
}
//---------------------------------------------------------------------//
//~ Change day from number to text 
function getDay(day) {
    switch (day) {
        case "1":
            day = "วันอาทิตย์"
            break;
        case "2":
            day = "วันจันทร์"
            break;
        case "3":
            day = "วันอังคาร"
            break;
        case "4":
            day = "วันพุธ"
            break;
        case "5":
            day = "วันพฤหัสบดี"
            break;
        case "6":
            day = "วันศุกร์"
            break;
        case "7":
            day = "วันเสาร์"
            break;
    }
    return day;
}

//~ Change month from number to text
function getMonth(mon) {
    //~ Change Month to text
    switch (mon) {
        case "01":
            mon = "มกราคม"
            break;
        case "02":
            mon = "กุมภาพันธ์"
            break;
        case "03":
            mon = "มีนาคม"
            break;
        case "04":
            mon = "เมษายน"
            break;
        case "05":
            mon = "พฤษภาคม"
            break;
        case "06":
            mon = "มิถุนายน"
            break;
        case "07":
            mon = "กรกฎาคม"
            break;
        case "08":
            mon = "สิงหาคม"
            break;
        case "09":
            mon = "กันยายน"
            break;
        case "10":
            mon = "ตุลาคม"
            break;
        case "11":
            mon = "พฤศจิกายน"
            break;
        case "12":
            mon = "ธันวาคม"
            break;        
    }
    return mon;
}
//---------------------------------------------------------------------//
//~ Change year from A.D. to B.E.
function getYear(year) {
    var newYear = parseInt(year) + 543
    var fetchYear = newYear.toString()
    return fetchYear;
}

//---------------------------------------------------------------------//
//! Export function to root
module.exports = {
    getDate,
    getMonth,
    getYear
}