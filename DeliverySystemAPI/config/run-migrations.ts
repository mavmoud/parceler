const { Client } = require("pg");
const { exec } = require("child_process");

// Build the Client using environment variables
// (These match what Railway typically provides: PGHOST, PGUSER, etc.)
const client = new Client({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "parceler_db",
  password: process.env.PGPASSWORD || "password",
  port: parseInt(process.env.PGPORT || "5432", 10),
  // If your Railway DB requires SSL, enable the following:
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
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
    // Make sure your sequelize config for 'production' uses these same env vars!
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
        }
    );
  });
}

// Function to run seeders
function runSeeders() {
  console.log("Running seeders...");
  return new Promise<void>((resolve, reject) => {
    // Same note: ensure 'production' in your sequelize config references env vars
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
        }
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