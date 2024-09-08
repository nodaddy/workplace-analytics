export const attachmentNameForStorage = (filename, employeeId, dateInSeconds) => {
    const seperator = '/-/'
    return `${employeeId}${seperator}${dateInSeconds}${seperator}${filename}`
}