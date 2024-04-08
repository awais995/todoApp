#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let list = [];
async function createList(list) {
    do {
        let input = await inquirer.prompt([
            {
                type: "list",
                name: "select",
                message: "Select your operation",
                choices: ["add", "update", "view", "delete", "close"]
            }
        ]);
        if (input.select === "add") {
            let additem = await inquirer.prompt({
                type: "input",
                name: "add",
                message: "add your items to the list."
            });
            list.push(additem.add);
            list.forEach(item => chalk.bold(console.log(item)));
        }
        if (input.select === "update") {
            let updateitem = await inquirer.prompt({
                type: "list",
                name: "update",
                message: "Select an item to update",
                choices: list
            });
            let newitem = await inquirer.prompt({
                type: "input",
                name: "new",
                message: "Enter the updated item."
            });
            list[list.indexOf(updateitem.update)] = newitem.new;
            list.forEach(list => chalk.green(console.log(list)));
        }
        if (input.select === "view") {
            console.log("**** TO DO LIST ****");
            list.forEach(item => chalk.bgBlueBright(console.log(item)));
            console.log("***********************");
        }
        ;
        if (input.select === "delete") {
            let deletetitem = await inquirer.prompt({
                type: "list",
                name: "delete",
                message: "delete your items in a list.",
                choices: list
            });
            list = list.filter(val => val !== deletetitem.delete);
            list.forEach(item => chalk.red(console.log(item)));
        }
        if (input.select === "close") {
            chalk.red(console.log("Closing the application..."));
            process.exit(0);
        }
    } while (true);
}
createList(list);
