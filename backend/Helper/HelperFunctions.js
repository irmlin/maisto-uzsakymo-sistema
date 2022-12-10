import * as db from '../db.js'

export async function ExistEmailOrUsernameDuplicates(tableName, email, username) {
  let sqlEmailDuplicate = `SELECT COUNT(id) AS found FROM ${tableName} WHERE email = ?`;
  let resultEmailDublicate = await db.executeSqlQuery(sqlEmailDuplicate, [email]);
  if (resultEmailDublicate[0].found === 1)
    return {existDuplicates: true, message: "Vartotojas su tokiu e-paštu jau egzistuoja"};
  
  let sqlUsernameDuplicate = `SELECT COUNT(id) AS found FROM ${tableName} WHERE username = ?`;
  let resultUsernameDublicate = await db.executeSqlQuery(sqlUsernameDuplicate, [username]);
  if (resultUsernameDublicate[0].found === 1) 
    return {existDuplicates: true, message: "Vartotojas su tokiu vartotojo vardu jau egzistuoja"};

  return {existDuplicates: false}
}