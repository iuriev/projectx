module.exports = {
    server: 'http://localhost:3001/',
    connectionString: 'postgres://postgres:admin@localhost:5432/students',
    pathStudentsPage: "students.html",
    pathRegistrationPage: "registration.html",
    pathAuthorizationPage: "authorization.html",
    pathAccount: "account.html",
    instructionErrLogAuth: 'Incorrect a login',
    instructionErrPassAuth: 'Incorrect a password',
    instructionErrAllReg: 'Fill in all the fields',
    instructionErrLogReg: 'Enter more than five char and begin with a letter',
    instructionErrPassReg: 'Password must be longer than 5 characters',
    instructionErrPassAgainReg: 'Passwords must match',
    instructionErrMailReg: 'Enter correct Email: like mymail@mail.com',
    instructionErrPhoneReg: 'Your number should start with "+38" and must be 13 characters long',
    instructionEmpty: ''
};
