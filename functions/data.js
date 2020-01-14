const csv = require('csvtojson')

//! You can change csv file to import as .json here
//~ Example './db/student.csv'
const csvFilePath = './db/teacher.csv'

async function run() {
  const dataList = await csv().fromFile(csvFilePath)
  let result = {
    //! You can change collection name in this collection_name (Use F2 to change name)
    collection_name :{

    }
  }

  dataList.forEach(st => {
    const { Id, NameTH, NameEN, Email } = st
    result.collection_name[Id] = {
      Id , NameEN, NameTH, Email
    }
  })

  console.log(result)
}

run()