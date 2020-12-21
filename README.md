## Magic Potion launch site

### Setup

- Laravel valet
    - If you do not have Laravel Valet installed, follow the instructions [here](https://laravel.com/docs/8.x/valet#installation) 
        ##### TL/DR
        - `brew update`
        - `brew install php`
        - Install composer [here](https://getcomposer.org/)
        - `composer global require laravel/valet`. Make sure the ~/.composer/vendor/bin directory is in your system's "PATH".
        - `valet install`
    - Directions to serve the site (https://laravel.com/docs/8.x/valet#serving-sites): 
        ##### TL/DR
        - In your terminal, make a new directory for the project: 
            - `mkdir ~/Code`
            - `cd ~/Code`
            - run `valet park`
    - Fork or clone project here into `~/Code` directory: [magic-potion](https://github.com/tthompson899/magic-potion.git)
    - `composer install` to install dependencies
    - Once project is cloned, spin up the website at [magic-potion.test](http://magic-potion.test/)

- MySQL
    - `brew install mysql@5.7`
    - `brew services start mysql@5.7`

    - Once valet and project has been cloned locally, run `composer install`
    - Database setup info is located in .env file, below is my setup  
           DB_CONNECTION=mysql  
           DB_HOST=127.0.0.1  
           DB_PORT=3306  
           DB_DATABASE=magic_potion  
           DB_USERNAME=root  
           DB_PASSWORD=password  

- For frontend:
    - If you have not already, install npm: https://www.npmjs.com/get-npm
    - In your terminal run `npm install` to install dependencies
    - Run `npm run dev` after each change made or `npm run watch` in the terminal to watch for continuous changes

- After installations, local app is located at http://magic-potion.test

#### How to view api
- The API can be accessed via a tool for API testing, I used Postman
    - POST, PATCH, DELETE, GET requests all use the http://magic-potion.test url

### Method
#### Describe your data schema and how it relates to the purchasing of magic potions.
From my perspective, we wanted to save 3 sets of information: user details, order details and payment details
- I decided to have an orders table to handle the amount of products the user purchased along with a relationship on the user model for future cases of if you want to easily find user—>orders or payment information.
- The payments table was added to capture and save the payment details
- I added the payment and order relationships on the User model to define that each user should have one order and each user should have one payment
    - For the payment and order models, I defined an inverse relationship to the user to define that a payment belongs to a user and an order belongs to a user
    - These relationships also make it much easier to define the payment and order values and add data to the database
Migrations
- Adding address2 as a nullable field since there will be cases where a user doesn't need to fill out that field.
- Created a new field called fulfilled on orders table. It made sense for me to add this on the orders table since orders are usually fulfilled. This field was added after price so that it wouldn't automatically go to the end of the column list.
- In the down method of the migrations, I drop the table or in the case of the changed migration, I drop the column that was added

#### Describe how this could scale over time.
- The user can login under their email and password. After logging in, they could have the ability to manage their orders, check order status, set up a profile, edit contact details.
- You could use this page to debut other products in the future by changing out the images and prices. Some of the static values could be placed in app environment variables in one place so they could be switched out over time (as price changes, max quantity per product changes, etc)
- Send an email to the user once they have purchased with the details of their order and thanking them. 

#### Describe your front end architecture and why you chose to create it as you did. Include details about form validation, error handling etc.
 - I went back and forth about using React, Vue or Laravel Blade. Blade wouldn’t work because we needed to change the state of a value in the input and by the time I was thinking of doing blade, I was already into React. At one point, I thought about using Vue but the barrier to entry would be the same as doing this in React.
 - I decided on a form that would take in the customers information that seemed to make sense - gathering name and phone and then moving to address and credit card details seemed like a good flow.
 - I wanted to create a drop down so the user wasn’t able to choose more than 3 for the quantity. 
 - I also chose to have the price input disabled so the user was not able to click on it and change it. 

#### Describe the API architecture 
Validation:
- By default Laravel considers null values as invalid. Because of this, I added nullable property to accept an empty string for address2 field
- User's email should be unique and not already in our db
- All fields are strings except for quantity
- Quantity field only allows a max up to 3
Create method: 
- Only get the specified request values
- The unique id that was returned is the user’s order id because you could also used that to confirm the order number to the user once they have submitted their details.
Get method: 
- Get the order and payment of the first user and return the data
Update method:
- Find the order id and update the fulfilled attribute
- Set the type of fulfilled variable to make sure it's boolean we receive
Delete method:
- I passed in a url parameter which is the id for the order to delete
- I chose to remove the orders and payments but keep the user. Chances are you want to keep your users data for login or for marketing correspondence purposes.

Models:
- All the values that we want the user to update are listed under fillable

#### With more time or in a different environment, what would you do differently?
- More modular codebase for frontend, everything is one file, ideally it be nice to separate those out
Instead of querying directly in the controller, I would make an interface and repository for the user which would then query off of the model to make it look cleaner. 
- Security within the form to prevent robots from submitting the form maliciously. 
    - Adding a throttle per minute that someone can submit the form
- Continuing on with the app, each route action should be it’s own component i.e. delete, update, get should have their own components
- Styling of the page could be much better. 
- You wouldn’t want to save payment details. Instead, having a payment methods table would be more appropriate and then adding a payment_method to the order for the user
- Add controllers for User, Orders and Payments to handle CRUD actions for each
- Add an alert for success message
- Seed data using laravel factory
- Create tests for methods

#### What would you do to improve or scale the application?
- There’s some repetition when defining the state for the variables on the frontend, I’d find out if there’s a way to combine these in an effort to remove the redundancy
- Extracting some of the data into methods - Ex. A method for deciphering the user and payment data could be in it’s own method to make the create method look cleaner. 
- Creating a list of states to display on the form and then create a drop down list with the states for a user to choose from
- Add more images of the product and a way for user to click on each one to view them larger
- Add form request for custom validation. This would allow the creation of robust error messages ex. currently the error message for address1 field is 'The address.address1 field is required' should be more readable like 'The address 1 field is required'
- Pull the return data into a resource. Instead of having to structure the return json each request
- Add payment to order table to keep track of what method of payment was used for each order
