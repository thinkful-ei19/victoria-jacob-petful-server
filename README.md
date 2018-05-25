# Petful Server API

Created using node, express, and a queue data structure

## Example and Endpoints

Implemented using a queue, one can grab dogs or cats with a get request:

GET http://localhost:8080/api/dog - will return dog, json in format:

    {
        "imageURL": "https://canna-pet.com/wp-content/uploads/2017/10/german-shepherd-dog-1071592_1920-1024x683.jpg",
        "imageDescription": "A cute German Shepherd lounging in the grass",
        "name": "Maia",
        "sex": "Female",
        "age": 1,
        "breed": "German Shepherd",
        "story": "Found wandering around with no owner"
    }

GET http://localhost:8080/api/cat - will return cat, json in same format

DELETE http://localhost:8080/api/dog - will dequeue (remove first) dog and return it as json

DELETE http://localhost:8080/api/cat - will dequeue (remove first) cat and return it as json