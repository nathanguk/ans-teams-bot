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

const createCustomer = 'Create Customer';
const createProject = 'Create Both';
const createBoth = 'Create Both';

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
        session.userData.name = results.response;
        test.testModule()
        builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?"); 
    },
    function (session, results) {
        session.userData.coding = results.response;
        builder.Prompts.choice(session, "What language do you code Node using?", ["JavaScript", "CoffeeScript", "TypeScript"]);
    },
    function (session, results) {
        session.userData.language = results.response.entity;
        session.send("Got it... " + session.userData.name + 
                    " you've been programming for " + session.userData.coding + 
                    " years and use " + session.userData.language + ".");
    }
]);

module.exports = connector.listen();

