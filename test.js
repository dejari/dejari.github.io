// Define jobLocation
const jobLocation = "/Users/sbxxab/My Folder/dataExport"
// Define baseUrl
const baseUrl = window.location != window.parent.location ? document.referrer : document.location.ancestorOrigins[0]
console.log(baseUrl)
// // Execute a job
// const executeJob = async (baseUrl, job, data) => {
//   // Retrieve data from VA object
//   const { columns, parameters } = data
//   // Convert parameters into filters
//   const filters = parameters.map(parameter => {
//     // Remove "Parameter" string
//     const label = parameter.label.replace("Parameter", "")
//     // Retrieve variable name and operator
//     let [name, operator] = label.split("__")
//     // Check if operator was defined and assign default value
//     operator === undefined ? operator= "=" : operator = operator.trim()
//     // Handle parameters with multiple values
//     let values = []
//     if (typeof(parameter.value) === 'object'){
//       // Change default operator
//       operator = "in"
//       // Iterate through the list of values
//       for(const property in parameter.value){
//         values.push(`"${parameter.value[property]}"`)
//       }
//     }
//     // Concatenate the values if it exists
//     values.length > 0 ? value = `(${values.join()})` : value = parameter.value
//     // Return a filter object
//     return {"label": name, "operator": operator, "value": value, "dataType": parameter.dataType }
//   })
//   // URL to retrieve a CSRF token for SAS Job Execution
//   const csrfURL = `${baseUrl}SASJobExecution/csrf`
//   // Get CSRF token for SAS Job Execution
//   const csrfRequest = await fetch(csrfURL, { method: "GET", credentials: "include" })
//   // Read CSRF token
//   const csrfToken = await csrfRequest.headers.get("x-csrf-token")
//   // Define HTTP headers to execute the job
//   const jobHeaders = {
//     'Content-Type': 'application/json',
//     'X-CSRF-Token': csrfToken,
//     'X-CSRF-Header': 'X-CSRF-Token'
//   }
//   // Add url parameters for the job
//   jobParameters = {
//     "_program": job,
//     "_action": "execute",
//     "_output_type": "json",
//     "_timeout": 600
//   }
//   // Convert the parameters to URLSearchParams
//   const urlParameters = new URLSearchParams(jobParameters)
//   // Call job
//   const jobURL = `${baseUrl}SASJobExecution/?${urlParameters}`
//   const response = await fetch(jobURL, {
//     method: "POST",
//     headers: jobHeaders,
//     credentials: "include",
//     body: JSON.stringify({ columns: columns, filters: filters })
//   })
//   return response
// }

// // Generate download link
// const generateDownloadLink = async (response, baseUrl) => {
//   // Read the job response to retrieve the export file location in the content server
//   const text = await response.text()
//   const result = JSON.parse(text)
//   // Build the URL to read the export file
//   const fileUrl = `${baseUrl}${result.resultFile}/content`
//   // Retrieve export file content from the server
//   const fileContent = await fetch(fileUrl, {method: "GET", credentials: "include"})
//   // Convert the export file to a file which can be downloaded when VA and app are hosted on different domains
//   const fileStorage = await fileContent.blob()
//   // Create the anchor which will be used to download the file
//   const message = `<a href="${window.URL.createObjectURL(fileStorage)}" download="SASVisualAnalyticsExport.txt" target="_blank">here</a>`
//   return message
// }

// // Retrieve data and begin processing
// const onMessage = async (event, jobLocation) => {
//   // Generate information message to indicate that the job is running
//   document.getElementById("status").innerHTML = "Generating file for download ..."
//   // Check if the app received data from VA
//   if (event && event.data) {
//     // Execute the job
//     const response = await executeJob(baseUrl, jobLocation, event.data)
//     if (response.status === 200) {
//       // Generate the download link if the job executed successfully
//       const link = await generateDownloadLink(response, baseUrl)
//       // Generate information message with the link to download the file
//       document.getElementById("status").innerHTML = `File can be downloaded ${link}!`
//     } else {
//       // Generate information that the job failed
//       document.getElementById("status").innerHTML = 'Failed to generate the file. Please contact an administrator to check the SAS Job Execution log.'
//     }
//   }
// }

// // Add listener to detect VA data reception
// if (window.addEventListener) {
//   window.addEventListener("message", (event) => onMessage(event, jobLocation), false)
//  } else {
//    window.attachEvent("onmessage",  (event) => onMessage(event, jobLocation))
//  }