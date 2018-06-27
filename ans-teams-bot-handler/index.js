"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

var test = require("./module.js");

var path = require('path');



var connector = new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});


var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

var createCustomer = 'Create Customer';
var createProject = 'Create Project';
var createBoth = 'Create Both';

var bot = new builder.UniversalBot(connector);
bot.localePath(path.join(__dirname, './locale'));
bot.set('storage', tableStorage);

bot.dialog('/', [
    function (session) {
        builder.Prompts.choice(session, "What would you like to do?", 
        [createCustomer, createProject, createBoth],
        { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
        if (results.response) {
            switch (results.response.entity) {
                case createCustomer:
                    session.send('This functionality is not yet implemented! Try Create Both.');
                    session.reset();
                    break;
                case createProject:
                    session.send('This functionality is not yet implemented! Try Create Both.');
                    session.reset();  
                    break;
                case createBoth:
                    session.beginDialog('createBoth:/');
                    break;                 
            };
        } else {
            session.send('Im sorry but I didnt understand, please select one of the options');
        };
    },    
    function (session, results) {
        if (results.resume) {
            session.send('I was unable to complete your request, try again!');
            session.reset();
        };
    }
]);

//Sub-Dialogs
bot.library(require('./dialogs/create-both'));

//Validators
//bot.library(require('./validators'));


module.exports = connector.listen();

