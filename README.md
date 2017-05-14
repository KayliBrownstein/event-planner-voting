![Build Status](https://codeship.com/projects/75e48080-0d12-0135-fa8a-5a26bbd15e55/status?branch=master)
<!-- ![Code Climate](https://codeclimate.com/github/KayliBrownstein/event-planner-voting.png) -->
![Coverage Status](https://coveralls.io/repos/github/KayliBrownstein/event-planner-voting/badge.svg?branch=master)

# SeeYouWhen
## Created by Kayli Brownstein
SeeYouWhen allows groups to easily plan events by providing a platform for voting on suggestions.

http://seeyouwhen.herokuapp.com/

Test User Credentials:
* Email: tester@testeremail.com
* Password: 123456

# Technologies
* React frontend and Rails backend;
* Utilizes the Google Maps API for directions and location information;
* Integrated ActionMailer and Heroku add-on SendGrid for emails;
* Utilizes Carrierwave and Amazon S3 for profile photo upload;
* Rolled user authentication utilizing bcrypt for password security.

# Features
* User can create an event by specifying a name, description, and cutoff time;
* User can invite friends to the event they created via email;
* User can view events they have created and been invited to only;
* User can suggest dates, times, and locations for events they created and have been invited to;
* User can upvote or downvote suggestions;
* User can search for their events via a live-updating React search bar;
* After the cutoff time, user can see the winning date, time, and location (with a map).
