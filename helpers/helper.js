var helper = {
    queryBuilder
};
module.exports = helper;

function queryBuilder(arr) {

    var sqlString = "";

    if (arr.fn !== "") {
        sqlString += `fn = '${arr.fn}'`;
    }

    if (arr.ln !== "") {
        if (sqlString === "") {
            sqlString += `ln = '${arr.ln}'`;
        } else {
            sqlString += `, ln = '${arr.ln}'`;
        }
    }

    if (arr.age !== "") {
        if (sqlString === "") {
            sqlString += `age = ${arr.age}`;
        } else {
            sqlString += `, age = ${arr.age}`;
        }
    }

    if (arr.ht !== "") {
        if (sqlString === "") {
            sqlString += `ht = '${arr.ht}'`;
        } else {
            sqlString += `, ht = '${arr.ht}'`;
        }
    }

    sqlString = "UPDATE account SET " + sqlString + " WHERE id = " + arr.id + ";";
    return sqlString;
}