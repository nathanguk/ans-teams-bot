var modules = {};

modules.testModule = function (customer,project) {
    console.log("GitLab Provisioning Function");
    console.log("Customer: " + customer);
    console.log("Project: " + project);
};

module.exports = modules;