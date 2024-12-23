const { Client } = require("pg");
const { exec } = require("child_process");

// PostgreSQL connection details
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "parceler_db",
  password: "password",
  port: 5432,
});

// Function to check if the Users table exists
async function checkIfTableExists() {
  try {
    await client.connect();
    const res = await client.query("SELECT to_regclass('public.Users');");
    return res.rows[0].to_regclass !== null;
  } catch (err) {
    console.error("Error checking if table exists:", err);
    return false;
  } finally {
    await client.end();
  }
}

// Function to run migrations
function runMigrations() {
  console.log("Running migrations...");
  return new Promise<void>((resolve, reject) => {
    exec(
        "npx sequelize-cli db:migrate --env production",
        (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.error(`Error running migrations: ${stderr}`);
            reject(err);
          } else {
            console.log(`Migrations output: ${stdout}`);
            resolve();
          }
        },
    );
  });
}

// Function to run seeders
function runSeeders() {
  console.log("Running seeders...");
  return new Promise<void>((resolve, reject) => {
    exec(
        "npx sequelize-cli db:seed:all --env production",
        (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.error(`Error running seeders: ${stderr}`);
            reject(err);
          } else {
            console.log(`Seeders output: ${stdout}`);
            resolve();
          }
        },
    );
  });
}

// Main logic
checkIfTableExists().then((tableExists) => {
  if (tableExists) {
    console.log("Table already exists. Skipping migrations and seeders.");
  } else {
    console.log("Database not initialized. Running migrations and seeders...");
    runMigrations()
        .then(runSeeders)
        .then(() => console.log("Migrations and seeders completed."))
        .catch((err) => console.error("Error during migrations/seeders:", err));
  }
});
