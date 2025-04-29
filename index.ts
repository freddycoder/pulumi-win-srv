import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

// Configuration
const config = new pulumi.Config();
const subscriptionId = config.require("subscriptionId");
const adminUsername = config.require("adminUsername");
const adminPassword = config.requireSecret("adminPassword");
const location = config.get("location") ?? "East US";

// Set up the Azure provider
const azureProvider = new azure.Provider("azure-provider", {
    subscriptionId: subscriptionId, // Pass the subscription ID here
});

// Create a resource group
const resourceGroup = new azure.core.ResourceGroup("aspnet-app-rg", {
    location: location,
}, { provider: azureProvider });

// Create a virtual network
const network = new azure.network.VirtualNetwork("aspnet-app-vnet", {
    resourceGroupName: resourceGroup.name,
    addressSpaces: ["10.0.0.0/16"],
    location: resourceGroup.location,
}, { provider: azureProvider });

// Create a subnet
const subnet = new azure.network.Subnet("aspnet-app-subnet", {
    resourceGroupName: resourceGroup.name,
    virtualNetworkName: network.name,
    addressPrefixes: ["10.0.1.0/24"],
}, { provider: azureProvider });

// Create a public IP address
const publicIp = new azure.network.PublicIp("aspnet-app-ip", {
    resourceGroupName: resourceGroup.name,
    allocationMethod: "Static",
}, { provider: azureProvider });

// Create a network interface
const networkInterface = new azure.network.NetworkInterface("aspnet-app-nic", {
    resourceGroupName: resourceGroup.name,
    ipConfigurations: [{
        name: "ipconfig",
        subnetId: subnet.id,
        publicIpAddressId: publicIp.id,
        privateIpAddressAllocation: "Dynamic",
    }],
}, { provider: azureProvider });

// Create a Windows Server 2022 virtual machine
const vm = new azure.compute.VirtualMachine("aspnet-app-vm", {
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    networkInterfaceIds: [networkInterface.id],
    vmSize: "Standard_DS1_v2",
    osProfileWindowsConfig: {
        provisionVmAgent: false,
        timezone: "Eastern Standard Time",
    },
    osProfile: {
        computerName: "aspnet-app-vm",
        adminUsername: adminUsername,
        adminPassword: adminPassword,
    },
    storageOsDisk: {
        name: "osdisk",
        caching: "ReadWrite",
        createOption: "FromImage",
    },
    storageImageReference: {
        publisher: "MicrosoftWindowsServer",
        offer: "WindowsServer",
        sku: "2022-Datacenter",
        version: "latest",
    },
}, { provider: azureProvider });

// Output the public IP address
export const publicIpAddress = publicIp.ipAddress;