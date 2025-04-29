# README for Pulumi ASP.NET App Deployment

## Overview

This project uses Pulumi to deploy a Windows Server 2022 instance on Azure, which will host an ASP.NET 3.5 application. The deployment is managed through TypeScript, leveraging the Pulumi infrastructure as code approach.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 22.x or later)
- Pulumi CLI
- Azure CLI
- TypeScript

## Project Structure

The project consists of the following files:

- `index.ts`: Main script for deploying the infrastructure.
- `Pulumi.yaml`: Configuration file for the Pulumi project.
- `package.json`: npm configuration file with dependencies.
- `tsconfig.json`: TypeScript configuration file.
- `README.md`: Documentation for the project.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd pulumi-aspnet-app
   ```

2. **Install dependencies:**

   Run the following command to install the required npm packages:

   ```bash
   npm install
   ```

3. **Configure Azure credentials:**

   Make sure you are logged into your Azure account using the Azure CLI:

   ```bash
   az login
   ```

4. **Set up Pulumi configuration:**

   Configure your Pulumi stack with the necessary Azure settings:

   ```bash
   pulumi config set subscriptionId <value>
   pulumi config set adminUsername <value>
   pulumi config set adminPassword <value>
   ```

## Deployment Steps

To deploy the Windows Server 2022 instance and the ASP.NET application, run the following command:

```bash
pulumi up
```

Follow the prompts to confirm the deployment. Pulumi will create the necessary resources in your Azure account.

## Cleanup

To remove the deployed resources, run:

```bash
pulumi destroy
```

This command will delete all resources created during the deployment.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.