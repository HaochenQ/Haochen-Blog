---
slug: azure-function-deployment-slots-with-Bicep
title: Configure Azure Function Deployment Slot in Bicep
author: Haochen Qi
author_title: Azure Integration Developer
author_url: https://github.com/HaochenQ
author_image_url: https://avatars1.githubusercontent.com/u/44130343?s=400&u=a5a4729addf5c5b972d1d6220546273ff6e00eb4&v=4
tags: [Azure Bicep, Azure Function, Depolyment Slot, AutoSwap]
---

![banner-slot](/img/Azure_Functions.png)

Azure Functions deployment slots are a powerful feature designed to streamline the deployment and management of serverless applications. They allow you to create isolated environments, or "slots," within a single function app, enabling you to test new changes in a staging environment before promoting them to production. Each slot operates as an independent instance with its own configuration, app settings, and code, but shares the same underlying resources, such as the App Service plan.

However, when integrating slots ddeployments with Bicep and Azure Pipeline, I faced several issues. In this blog, I will documents the cevats I faced and the solutions i FOUND. hopfullily THIS can benefits some others who are using Bicep to create deployments slots.  
<!--truncate-->

## Backgroup and purpose 

Previously, we were only using the production slot. As a result, every time we deployed changes to the production environment, we had to schedule downtime and inform customers in advance.

Our Azure resources are deployed using Bicep through an Azure Pipeline, while the actual function code is deployed via a separate pipeline. To minimize the impact of deployments on the production environment, we decided to introduce deployment slots in our solution, allowing for seamless updates without any downtime.

## Changes in the resource provisioning
The required changes consist of two parts. The first step is to create a staging slot during the resource provisioning phase. Since we are using Azure Verified Modules (AVM) to deploy[Azure Functions](https://github.com/Azure/bicep-registry-modules/tree/main/avm/res/web/site), we simply need to add a **slots** section in the module configuration.

```yml
slots: [
      {
        name: 'staging'
        kind: 'functionapp'
        managedIdentities: {
          systemAssigned: true
        }
        appSettingsKeyValuePairs: {
          FUNCTIONS_EXTENSION_VERSION: '~4'
          FUNCTIONS_WORKER_RUNTIME: 'dotnet-isolated'
          AzureWebJobsStorage: storageAccountConnectionString
          WEBSITE_CONTENTAZUREFILECONNECTIONSTRING: storageAccountConnectionString
          WEBSITE_CONTENTSHARE: toLower('${functionAppConfig.name}-staging')
          APPLICATIONINSIGHTS_CONNECTION_STRING: appIns.properties.ConnectionString
        }
      }
    ]
```
### Issues we faced 
At the beginning, we followed the best practice of not setting **WEBSITE_CONTENTSHARE**. 
> When you don't set a WEBSITE_CONTENTSHARE value for the main function app or any apps in slots, unique share values are generated for you. Not setting WEBSITE_CONTENTSHARE is the recommended approach for an ARM template deployment.

However, we encountered an error stating that this setting must be explicitly defined for the slot. To ensure a successful swap, you must assign a unique WEBSITE_CONTENTSHARE value for the staging slot, different from the production slot. If both slots share the same value, the swap operation will fail because this setting determines where the slot’s code and configurations are stored.

## Changes in the code deployment
For code deployment, we need to set **deployToSlotOrASE** to **true** and specify a slot name. Additionally, we must add a stage to perform the swap, ensuring that deployments follow a sequential process. This approach allows changes to be deployed directly to the staging slot first and then seamlessly swapped into production, eliminating downtime.

```yml
  - stage: DeployCodeToStaging
    jobs:
      - deployment: DeployFunctionApp
        displayName: Deploy Code to Function App
        environment: 'development'
        strategy:
          runOnce:
            deploy:
              steps:
                - task: DownloadBuildArtifacts@1
                  inputs:
                    buildType: 'current'
                    downloadType: 'single'
                    artifactName: 'drop'
                    itemPattern: '**/*.zip'
                    downloadPath: '$(System.DefaultWorkingDirectory)'
                - task: AzureFunctionApp@2
                  inputs:
                    connectedServiceNameARM: $(serviceConnectionName)
                    appType: functionApp
                    appName: $(functionAppName)
                    resourceGroupName: $(resourceGroupName)
                    deployToSlotOrASE: true
                    slotName: 'staging'
                    package: '$(System.DefaultWorkingDirectory)/**/build$(Build.BuildId).zip'
                    deploymentMethod: 'runFromPackage'
                    appSettings: '
                     -Name Value
                    '
  - stage: SwapToProd
    jobs:      
      - job: SwapToProd
        displayName: Swap
        steps:
                - task: AzureAppServiceManage@0
                  inputs:
                      azureSubscription: $(serviceConnectionName)
                      Action: 'Swap Slots'
                      WebAppName: $(functionAppName)
                      ResourceGroupName: $(resourceGroupName)
                      SourceSlot: 'staging'
```

## Summary

Azure Functions deployment slots provide a seamless way to deploy and manage serverless applications without downtime. By leveraging deployment slots, we can stage changes in an isolated environment before swapping them into production. However, integrating deployment slots with Bicep and Azure Pipelines introduced several challenges that required careful configuration adjustments.
Challenges and Solutions

1. Resource Provisioning with Bicep
    -  We needed to create a staging slot using Azure Verified Modules (AVM).
    -  The slots section was added to our Bicep configuration to ensure proper slot creation.

2. **WEBSITE_CONTENTSHARE** Issue
    - Initially, we followed best practices by not setting **WEBSITE_CONTENTSHARE**, allowing Azure to generate unique values.
    - However, the deployment failed because Azure requires this setting to be explicitly defined for the slot.
    - The solution was to assign a unique **WEBSITE_CONTENTSHARE** value for the staging slot, different from production.

3. Code Deployment and Swap Process
    - We updated our deployment pipeline to deploy code to the staging slot first by setting **deployToSlotOrASE: true**.
    - A separate stage was introduced to swap the staging slot with production, ensuring a smooth transition without downtime.

By implementing these changes, we successfully integrated deployment slots into our Azure Functions setup, allowing for safer and more efficient deployments.

Reference:<br/>
[1] https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview?tabs=bicep/ <br/>
[2] https://azure.github.io/Azure-Verified-Modules/indexes/bicep/bicep-resource-modules/ <br/>
[3] https://learn.microsoft.com/en-us/azure/azure-functions/functions-app-settings#website_contentshare <br/>
