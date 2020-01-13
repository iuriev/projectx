function changeLocation(location) {
    if (!window || !window.location || !window.location.href) {
        return;
    }
    window.location.href = location;
}

function validateInputLogin(currentValue) {
    // ToDo
}
function validateInputPass(currentValue) {
    // ToDo
}
function getErrorMessageByStatusCode(statusCode) {
    switch (statusCode) {
        case 500: return "DB error";
        case 501: return "Incorrect login or password";
        default:  return "Unknown exception was occurred while ...";
    }
}

module.exports = {
    changeLocation: changeLocation,
    validateInputLogin: validateInputLogin,
    validateInputPass: validateInputPass,
    getErrorMessageByStatusCode: getErrorMessageByStatusCode,
};
