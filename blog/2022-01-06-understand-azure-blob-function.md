---
slug: azure-blob-function-retriggering
title: Azure Blob Functions's Re-triggering Issue
author: Haochen Qi
author_title: Full Stack Developer
author_url: https://github.com/HaochenQ
author_image_url: https://avatars1.githubusercontent.com/u/44130343?s=400&u=a5a4729addf5c5b972d1d6220546273ff6e00eb4&v=4
tags: [Azure App Service, Blob Function, Azure Functions, Paas]
---

![azure-functions](/img/Azure_Functions.png)

Azure Functions is an event-driven platform as a service provided by Microsoft Azure with which developers can focus less on infrastructure level complexity. Function app running on a consumption plan or an elastic plan will be charged per execution.

Some of you may have observed that your old blobs in a blob container re-triggered your blob function app even if you didn't modify them which caused extra cost, especially when your Azure function is connected to some other cost-intensive services.

In this blog, let's discuss the possible reasons for this blob function app anomaly.

<!--truncate-->

## How does Blob trigger function work?

Before digging into this issue, we need to understand how does azure blob function work. You may already know that Azure blob functions are functions integrated with azure blob storage, function apps will get triggered as blob storage data changes. But you may wonder how does the function knows there are changes and what is the way that azure function knows a blob already triggered it?

Azure blob trigger function will poll the blobs in the designated container, polling works as a hybrid between inspecting logs and running periodic container scans. Blobs are scanned in groups of 10,000 at a time with a continuation token used between intervals.

:::caution

In addition, [storage logs are created on a "best effort"](https://docs.microsoft.com/en-us/rest/api/storageservices/About-Storage-Analytics-Logging) basis. There's no guarantee that all events are captured. Under some conditions, logs may be missed.
If you require faster or more reliable blob processing, consider creating a [queue message](https://docs.microsoft.com/en-us/azure/storage/queues/storage-dotnet-how-to-use-queues) when you create the blob. Then use a [queue trigger](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue) instead of a blob trigger to process the blob. Another option is to use Event Grid; see the tutorial [Automate resizing uploaded images using Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/resize-images-on-storage-blob-upload-event).

:::

Azure function keeps blob receipts to record the states of blobs. Blob receipts are stored in a container named **azure-webjobs-hosts** in the Azure storage account for your function app (defined by the app setting AzureWebJobsStorage). A blob receipt has the following information:

- The triggered function (`<FUNCTION_APP_NAME>.Functions.<FUNCTION_NAME>`, for example: MyFunctionApp.Functions.CopyBlob)
- The container name
- The blob type (`BlockBlob` or `PageBlob`)
- The blob name
- The ETag (a blob version identifier, for example: 0x8D1DC6E70A277EF)

## What will cause the old blob re-triggering Azure Function issue?

After knowing the underlying mechanism of how the blob azure functions work, it is not hard to speculate the root cause for this issue.

If your function got re-triggered once, the possible reason might be the receipt got deleted/or updated somehow. However, in most cases, you will find all the old blobs in the container re-triggered your function. To find the cause for this false behavior, you can try to identify the actions performed around the time the issue occurred. You need to check you accidentally delete the whole **azure-webjobs-hosts** container or the virtual folder **blobreceipts** inside this container?

Another tricky situation is that you may find this all old blobs retriggered function issue after you updated your function name. As I mentioned above, the blob receipts are stored in a virtual folder with the structure of `<FUNCTION_APP_NAME>.Functions.<FUNCTION_NAME>`. After the modification of your function name, your function could not find the receipts that are associated with it anymore, as a result, it will treat all old blobs in your container as new ones which will get your function re-triggered.

## Summary

In a summary, Azure Blob Function leverages blob receipts to monitor the states of the blobs in your container. If you are facing the issue that old blobs(without any updates/modifications) are re-triggering your function, you can check whether you have accidentally deleted the blob receipts or you have changed the function name in which way your function can not find its associated receipts.

---

Reference: [Azure Blob storage trigger for Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=csharp)
