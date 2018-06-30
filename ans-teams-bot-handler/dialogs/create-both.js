"use strict";
var builder = require('botbuilder');
var botbuilder_azure = require('botbuilder-azure');

var modules = require('../gitModule');

var path = require('path');

var library = new builder.Library('createBoth');

var yes = 'Yes';
var no = 'No';
var customer ='';
var project = '';

library.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'What is the customers name?');
    },
    function (session, results) {
        customer = results.response;
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
        project = results.response;
        builder.Prompts.choice(session, 'Is "' + results.response + '" correct?', 
        [yes, no],
        { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
        if (results.response) {
            switch (results.response.entity) {
                case yes:                  
                    //****************** Insert external call here *********************
                    modules.testModule(customer,project);
                    
                    session.send('Ok, request to create your new customer and project sent!');
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

