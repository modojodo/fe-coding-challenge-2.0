# Zingtree Front-end Coding Challenge

Hello, and welcome to Zingtree's front-end coding challenge.

## Problem
> Display a "survey" to people to direct them to the correct medical care, based on their symptoms and age.

Given the included data returned from the "API", you must build a "SurveyMonkey" style survey application which takes the JSON data structure, and presents it to the user in an easy-to-understand format, finally directing them to the proper location, based on their age and symptoms.

We've given you the basic boilerplate you'll need to get started.  The styling and superstructure is complete, allowing you to focus on the core behavior of the application.  The application needs to be expanded to:
- Pull data from the remote API
- Use vue-router to navigate through the structure of the survey, maintaining navigable history
- Collect user data from each form field and button click
- Use the collected data to:
    - Evaluate conditional logic in some of the given nodes
    - Replace variables contained within the content

> **Hint:** Some of the survey data is collected via buttons, some is collected via auto-generated form elements.  Be careful to note the differences in the data structure surrounding them, as there are subtle differences.

## Rules

- Cribbing someone else's survey app from the internet is an immediate disqualification.  You must use your own original code.
- Please make a commit approximately every hour.  This helps us watch your progression through the project.
- Your project must load the remote data from the following URL: https://zt-eng.s3.us-east-1.amazonaws.com/fe-challenge/survey.json
- Your project must collect data and display a useful summary of the collected data.
- Your project must use the collected data to replace variables found in the content.
- Your project must be able to traverse the entire survey to all the branch ends (Nodes 27 & 29) by the time you submit it to us.

Please ask questions at any time about anything which may appear ambiguous.  We're here to help and ultimately, we **want** you to succeed.  This test is meant to model a real-world task at Zingtree, and we operate as a highly-collaborative team.  We expect you to have questions and give us feedback throughout the process.  If you have questions during the test, keep moving ahead in other areas where you're not blocked, just as you would do in a real task when under deadline, with a distributed team.

## The End

Congratulations!  You've finished the project!  Please zip up the entire directory (including `.git`, but excluding `node_modules`) and send it back to me at ryan@zingtree.com.

Thank you so much for your participation!