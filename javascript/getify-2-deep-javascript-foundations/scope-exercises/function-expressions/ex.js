function getStudentsById(id) {
  return studentRecords.find(function getRecordById(record) {
    return record.id == id;
  });
}

function printRecords(recordIds) {
  var records = recordIds.map(getStudentsById);

  records.sort(function sortByName(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  records.forEach(function printRecord(record) {
    console.log(
      `${record.name} (${record.id}): ${record.paid ? "Paid" : "Not paid"}`
    );
  });
}

function paidStudentsToEnroll() {
  var paidNotYetEnrolled = studentRecords.filter(function findPaid(record) {
    return record.paid && !currentEnrollment.includes(record.id);
  });

  var notYetEnrolledIds = paidNotYetEnrolled.map(function findId(record) {
    return record.id;
  });
  return [...notYetEnrolledIds, ...currentEnrollment];
}

function remindUnpaid(recordIds) {
  var records = recordIds.map(getStudentsById);

  var unpaidList = records.filter(function findUnpaid(record) {
    return !record.paid;
  });

  printRecords(
    unpaidList.map(function findId(record) {
      return record.id;
    })
  );
}

// ********************************

var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: "Frank", paid: true },
  { id: 410, name: "Suzy", paid: true },
  { id: 709, name: "Brian", paid: false },
  { id: 105, name: "Henry", paid: false },
  { id: 502, name: "Mary", paid: true },
  { id: 664, name: "Bob", paid: false },
  { id: 250, name: "Peter", paid: true },
  { id: 375, name: "Sarah", paid: true },
  { id: 867, name: "Greg", paid: false },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
