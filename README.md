# This project is backend of Library Management System.
# This project is based on Node, Express and MongoDB(Database).


#Follow this steps to running this project.

1.) First you have to install Node, NPM, Mongodb, Compass, vscode (if you have already ignore this steps).
2.) Download this folder in your system & open that folder in vscode or any code editor.
3.) open terminal with this path in which your folder is present.

# Follow this Commands:-
1.) In the Terminal => npm install (and press the Enter for installing the all packages, libraries, dependencies etc).
2.) After finished first command =>  npm run dev (for running file through nodemon & npm start for running project through node).

# After that they all are the endpoints:-
1.) http://localhost:8080 => For checking our project is working or not. (GET request)
2.) http://localhost:8080/api/books => To fetch all the books avaliable in the library. (GET request)
3.) http://localhost:8080/api/books/:id => To fetch specific book by the bookId number. (GET request)
4.) http://localhost:8080/api/books => This endpoint is adding a book in the library which required field name is id, title, author, ISBN , quantityAvl. (POST request)

5.) http://localhost:8080/api/users => For registering the user. (POST request)
6.) http://localhost:8080/api/users => For login the user. (POST request)

7.) http://localhost:8080/api/users/:userId/books => For check all the books borrow by the specific user required field name is userId( which will be email id.) (GET request)
8.) http://localhost:8080/api/borrow/:bookId/:userId => For borrow the book from the library by the user required field name is bookId & userId. (POST request)
9.) http://localhost:8080/api/return/:bookId/:userId => For return the book in the library by the user required field name is bookId & userId. (POST request)

# For borrow and return the book, first user have to registered after that they can borrow or return the book from library.
# This project is proper in running mode if you have any problem to start the project, feel free to contact me.


