# webapp_spring2021_assignment4

Assignment 4 - CRUD Models, Passport, Sessions, Cookies, and creating Posts
Author: Fernando Campos

How tasks were split

Fernando was responsible for doing every task in the assignment. 

Modifications

Some of the only modifications that were made in the assignment involve creating a new post schema with mongoose and MongoDB. New EJS
files were made as well to accomodate for CRUD actions including users updating information, deleting accounts, and for viewing users that
are currently signed up in the social network. Of course, express validation methods and passport methods were added as well so that users can
login and sign up securely, as passwords are then encrypted with salt values, making them secure in the database. Sessions and cookies are used
as well to allow for communication throughout different components of the web application, where error messages and success messages pop up
on the screen to allow users to understand what is going on. Error messages are passed with these sessions and cookies, and validations to user 
sign up have been modified on the server side to use express validator. In order for a user to sign in, they sign up with their email and of course
their password that they signed up with. Other modifications include changes to the user schema to make them more robust and secure, with an additional
array of posts that a user has so that we can keep track of a users posts that they created. 

How to install and launch the project

make sure mongoDB is installed on your system and is on the PATH variable
once cloned, run: npm install in the project directory
After doing npm install, run the script file to seed the database with some dummy data by running: node seed
After seeding the database, you can then start the webapp by running: npm start
Go to your browser, go to localhost:3000 to see the webapp
No other steps are needed to create the database as we have mongoose, which will create the database for us once we
run the webapp

Design Choices

Not a lot has changed with the entire design of the webpage, however there are some additional features and pages that have been added to accomodate our
added CRUD actions. A users page has been added in our web application, where a simple table showing every user that is signed up for the social network
is shown, showing their username and email. Their username has a link that can be clicked to direct the web application to their profile page, showing
their information along with every post that they have created on the web app. With this implementation, some other additions have been added for logged in
users to see a webpage that only they can see when they have logged in with a valid account. This homepage has their own information, trends, and a who to follow
section that directs the current user to the list of users signed up on Twezzy. Right below these 3 boxes, there is an area for users to write their own posts
and to then submit them onto the website. Adding this right under the profile information seemed like the best choice as it allows users to easily make a post
whenever they are on their homepage. Under the post creation box, we have every posts that have been made by the logged in user. Each post has a delete button
that will allow a user to delete a post of their choosing. There is no way for a user to update, making it similar to how posts are created and managed on twitter. 
This means that users can only create, view, and delete posts. One final design choice that needs to be mentioned is the flash messages that are used to communicate
to a user when an error is occurring or when a successful action has been made. Error messages will come up as white text with a background of light coral to signify danger, and success messages will come up as a light blue color with royal blue text to signify successful actions have been done on the web app,
where this flash message comes up at the top of the screen below the navigation bar. Putting the flash messages in this spot is a good choice as it is easy to see and
can allow the user to navigate to another part of the web app or to restart an action (such as signing up or logging in). 

Future Plans

As of right now, we are planning to make the profile page and users page much more visually appealing for users to look at. The feed page is currently non functional right
now as well, but we will use that page for top trends and looking at posts by people a logged in user follows. With that in mind, the user schema will change as well, where
two arrays of followers and people that user follows will be created, where IDs will be used to keep track of followers and following. A list of followers and following will 
also be added to a users homepage. A logged in user can follow and unfollow users with buttons that will be added to each users page. The webapp would also benefit from notifications, however as of right now this is a broad topic that will need to be understood thoroughly once our web application can be hosted with an online hosting service. 
