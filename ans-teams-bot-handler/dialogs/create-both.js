"use strict";
var builder = require('botbuilder');
var botbuilder_azure = require('botbuilder-azure');

var path = require('path');

var library = new builder.Library('createBoth');

var yes = 'Yes';
var no = 'No';

library.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'What is the customers name?');
    },
    function (session, results) {
        builder.Prompts.choice(session, 'Is "' + results.response + '" correct?', 
        [yes, no],
        { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
        if (results.response) {
            switch (results.response.entity) {
                case yes:
                    builder.Prompts.text(session, 'What is the project name? For example "Cloud Start"');
                    break;
                case no:
                    session.send('Ok, please start again!');
                    session.reset();  
                    break;               
            }
        } else {
            session.send('Im sorry but I didnt understand, please try again!');
        }
    },    
    function (session, results) {
        builder.Prompts.choice(session, 'Is "' + results.response + '" correct?', 
        [yes, no],
        { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
        if (results.response) {
            switch (results.response.entity) {
                case yes:
                    console.log("Creating Customer and Project");
                    
                    //****************** Insert external call here *********************
                    
                    session.send('Ok, Im going to create your new customer and project now!');
                    session.endDialogWithResult({ resumed: builder.ResumeReason.completed });
                    break;
                case no:
                    session.send('Ok, please start again!');
                    session.reset();  
                    break;               
            }
        } else {
            session.send('Im sorry but I didnt understand, please try again!');
        }
    },   
    function (session, results) {
        if (result.resume) {
            session.send('Im sorry but I didnt understand, please try again!');
            session.reset();
        }
    }
]);


module.exports = library;

