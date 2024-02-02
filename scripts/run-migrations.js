const { exec } = require('child_process');
const { environment } = require('../config/dot-env')

// This function is used init and create database and table to postgresql through migrations
function runMigrations() {

  const command = `npx sequelize-cli db:migrate --env ${environment}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running migration in ${environment} mode :`, error);
    } else {
      console.log(`Migration in ${environment} executed successfully.`);
    }
  });
}

// Start running migrations
runMigrations();
