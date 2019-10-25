We need nested routes.
For each of a campground, we have campgrounds/:id to showcase it.
Now within the SHOW route for campsite, we need to place another route to allow user to access to a form to add comments to that particular campsite.
--> campgrounds/:id/comments/new    GET
--> campgrounds/:id/comments        POST

#Authentication P1: Add user authentication
Packages we need:
1. passport
2. passport-local
3. passport-local-mongoose
4. express-session

#Authentication P2:
1. configure passport
2. add register routes
3. add register template

#Authentication P3:
1. add login routes
2. add login template

#Authentication P4:
1. add logout route
2. prevent user from adding a comment if not signed in
3. add links to navbar
4. show/hide authentication links correctly

#Authentication P5:
1. show/hide authentication links in navbar correctly

#Refactor codes

#Users + comments
1. Associate users and comments
2. Save author's name to a comment directly
To do so, in the Comment model, we must add some fields related to user name and user ID.

#Users and campgrounds
1. Prevent an unauthenticated user from creating a campground
2. Save username to a newly created campground

#Editing campgrounds
1. Add Method-Override
2. Add Edit Route for Campgrounds
3. Add link to Edit Page
4. Add Update Route
5. Fix set problem

#Deleting campgrounds
1. Add Destroy route
2. Add Delete button

#Authorization
1. User can only edit his/her campgrounds
2. User can only delete his/her campgrounds
3. Hide/show edit and delete buttons based on local user

#Editing comments
1. Add Edit route for comments
2. Add Edit buttons
3. Add Update buttons

/campgrounds/:id/edit
/campgrounds/:id/comments/:comment_id/edit

#Deleting comments
1. Add destroy routes
2. Add Delete button