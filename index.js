function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let timeInEvent = employee.timeInEvents.find(event => event.date === date)
    let timeOutEvent = employee.timeOutEvents.find(event => event.date === date)
    let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100
    
    return hoursWorked
}

function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date)
    let wages = hoursWorked * employee.payPerHour

    return wages
}

function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(event => event.date)

    let totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date)
    }, 0)

    return totalWages
}

function calculatePayroll(employees) {
    let totalPayroll = employees.reduce((total,employee) => {
        return total + allWagesFor(employee)
    },0)

    return totalPayroll
}
