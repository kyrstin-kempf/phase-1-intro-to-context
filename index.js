// CREATE OBJECT WITH EMPLOYEE INFO FUNCTION
const createEmployeeRecord = (employeeRecordArray) => {
    return {
        firstName : employeeRecordArray[0],
        familyName : employeeRecordArray[1],
        title : employeeRecordArray[2],
        payPerHour : employeeRecordArray[3],
        timeInEvents : [],
        timeOutEvents : []
    }
}

// GO THROUGH EACH ARRAY AND CREATE AN OBJECT AND ADD TO ARRAY
const createEmployeeRecords = (arrayOfArrays) => {
    return arrayOfArrays.map(rec => createEmployeeRecord(rec))
}

// ADD EACH CLOCK-IN TO ARRAY IN EMPLOYEE OBJECT
const createTimeInEvent = function (employeeRecord, dateStamp){
    // destructuring
    const [date, hour] = dateStamp.split(' ')
    // const dateArray = dateStamp.split(' ')
    // const date = dateArray[0]
    // const hour = dateArray[1]
    // console.log('hour: ', hour)
    // console.log('date: ', date)    
    const clockIn = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    employeeRecord.timeInEvents.push(clockIn)
    // console.log('this: ', this);
    
    return employeeRecord
}

// ADD EACH CLOCK-OUT TO ARRAY IN EMPLOYEE OBJECT
const createTimeOutEvent = function (employeeRecord, dateStamp){
    // destructuring
    const [date, hour] = dateStamp.split(' ')
    // const dateArray = dateStamp.split(' ')
    // const date = dateArray[0]
    // const hour = dateArray[1]
    // console.log('hour: ', hour)
    // console.log('date: ', date)    
    const clockOut = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    employeeRecord.timeOutEvents.push(clockOut)
    
    return employeeRecord
}

const hoursWorkedOnDate = function(employeeRecord, targetDate) {
    const inTime = employeeRecord.timeInEvents.find(inTime => inTime.date === targetDate)
    const outTime = employeeRecord.timeOutEvents.find(outTime => outTime.date === targetDate)

    return(outTime.hour - inTime.hour) / 100
}

const wagesEarnedOnDate = function(employeeRecord, targetDate) {
    return hoursWorkedOnDate(employeeRecord, targetDate) * employeeRecord.payPerHour
    
    // let hours = hoursWorkedOnDate(employeeRecord, targetDate)
    // let wage = hours * employeeRecord.payPerHour
    // return wage

    // return hoursWorkedOnDate * employeeRecord.payPerHour
}

const allWagesFor = function (employeeRecords) {
    const datesWorked = employeeRecords.timeInEvents.map(e => e.date);
    console.log(datesWorked);

    let reducer = (acc, date) => acc + wagesEarnedOnDate(employeeRecords, date)
    // return wagesEarnedOnDate(employeeRecords, targetDate) * datesWorked
    let total = datesWorked.reduce(reducer, 0) 
    console.log(total)
    return total
}


const calculatePayroll = function (employeeRecordArray) {
    return employeeRecordArray.reduce((total, rec) => {
        return total + allWagesFor(rec)
    }, 0)
}