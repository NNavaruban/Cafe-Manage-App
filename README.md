

Cafe Management Application
This project is a Cafe Management Application that consists of a Backend and Frontend. Below are the instructions to set up the application on your local machine.

1. Backend Setup
1.1 Clone the Repository
First, clone the repository using the following command:

bash
Copy code
git clone https://github.com/NNavaruban/Cafe-Manage-App.git
Once the download is complete, you will have two projects:

Backend Project (located in the Backend directory)
Frontend Project (located in the Frontend directory)

1.2 Open the Backend Project
Open the Backend project folder in Visual Studio.

1.3 Configure Data Source
To configure the database for this project:

Open the appsettings.json file in the Backend project.
Update the ConnectionStrings section with your local MSSQL server details.

1.4 Run Database Migration
To apply the migration and set up the database, follow these steps:

Open Visual Studio Code and navigate to the Terminal.

Go to Tools > NuGet Package Manager > Package Manager Console.

In the Package Manager Console, set Cafe.Infrastructure as the default project dropdown (ByDefault it will be selected as Cafe.WebAPI)

powershell

Run the following command to create a new migration:

add-migration First-Migration-001
This command will generate the Migration folder and migration files inside the project.

After the migration has been generated, run the following command to update the database:


update-database
This will create the database, tables, and seed data in your local SQL Server.

Rebuild the solution and run the project.

2. Frontend Setup
2.1 Open the Frontend Project
Open the Frontend project folder in Visual Studio Code.
2.2 Install Dependencies
In the terminal, navigate to the Frontend directory and install the required dependencies using the following command:

npm install


2.3 Run the Frontend Application
After the dependencies are installed, run the frontend application using the command:

npm start
This will start the frontend development server. You can view the application in your browser at http://localhost:3000.

3. Application Usage
Once both the backend and frontend are running, you will be able to see the Cafe and Employee tabs in the user interface. The application will be connected to the database, allowing you to manage cafes and employees via the UI.

4. Troubleshooting
If you encounter any exceptions or errors while running the migration script, please follow these steps:

Delete the Migration folder located inside the Cafe.Infrastructure directory.
If a Cafe database has already been created, delete it from your local SQL Server.
Re-run the migration commands to regenerate the migration and update the database.



