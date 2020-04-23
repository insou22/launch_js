'use strict';

const inquirer = require('inquirer');
const spawn = require('child_process').spawn;
const applications = require('./applications.json');

(async () => {

    let num = 1;
    
    for (const app of applications) {
        app.display = `${num}) ${app.name}`
        num++;
    }

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'app',
            message: 'Launch Application',
            choices: applications.map(app => app.display)
        }
    ]);

    const app = applications.filter(app => app.display === answer.app)[0];

    spawn(app.command, app.args, {
        stdio: 'ignore',
        detached: true
    }).unref();
})();