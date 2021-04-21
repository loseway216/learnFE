//闭包+IIFE，实现private、public效果
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calculatePercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  return {
    test: function () {
      return data;
    },
    addItem: function (type, desc, val) {
      var newItem, ID;

      //create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //create new item based on type
      if (type === "exp") {
        newItem = new Expense(ID, desc, val);
      } else if (type === "inc") {
        newItem = new Income(ID, desc, val);
      }

      //push it to data structure
      data.allItems[type].push(newItem);

      //return the new element
      return newItem;
    },
    deleteItem: function (type, id) {
      var ids, index;
      ids = data.allItems[type].map(function (cur) {
        return cur.id;
      });
      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },
    calculateBudget: function () {
      //calculate total income and expense
      calculateTotal("exp");
      calculateTotal("inc");

      //calculate the budget
      data.budget = data.totals.inc - data.totals.exp;

      //calculate the percentage
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      }
    },
    getBudget: function () {
      return {
        budget: data.budget,
        percentage: data.percentage,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
    calculatePercentages: function () {
      data.allItems.exp.forEach(function (cur) {
        cur.calculatePercentage(data.totals.inc);
      });
    },
    getPercentages: function () {
      return data.allItems.exp.map(function (cur) {
        return cur.getPercentage();
      });
    },
  };
})();

var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    budgetLabel: ".budget__value",
    percentageLabel: ".budget__expenses--percentage",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    container: ".container",
    percentagesLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  var formatNumber = function (num, type) {
    var numArr, intPart, decimalPart, sign;
    num = Math.abs(num);
    num = num.toFixed(2);

    numArr = num.split(".");
    intPart = numArr[0];
    if (intPart.length > 3) {
      intPart =
        intPart.substr(0, intPart.length - 3) +
        "," +
        intPart.substr(intPart.length - 3, 3);
    }
    decimalPart = numArr[1];

    sign = type === "inc" ? "+" : "-";
    return sign + " " + intPart + "." + decimalPart;
  };

  //定义一个用来遍历nodeList的函数，第二个参数的回调函数
  var nodeListForEach = function (nodeList, callback) {
    for (var i = 0; i < nodeList.length; i++) {
      callback(nodeList[i], i);
    }
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    addListItem: function (obj, type) {
      var html, element;

      if (type === "inc") {
        element = document.querySelector(DOMstrings.incomeList);
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = document.querySelector(DOMstrings.expenseList);
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right "><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      html = html.replace("%id%", obj.id);
      html = html.replace("%description%", obj.description);
      html = html.replace("%value%", formatNumber(obj.value, type));

      element.insertAdjacentHTML("beforeend", html);
    },
    deleteListItem: function (selectorId) {
      //找到当前元素的父元素，然后删除子元素？？
      var element = document.getElementById(selectorId);
      element.parentNode.removeChild(element);
    },
    clearFields: function () {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (cur, index, array) {
        cur.value = "";
      });
      fieldsArr[0].focus();
    },
    displayBudget: function (obj) {
      var type = obj.budget > 0 ? "inc" : "exp";
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(
        DOMstrings.expensesLabel
      ).textContent = formatNumber(obj.totalExp, "exp");
      if (obj.percentage > -1) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = " ---";
      }
    },
    displayPercentages: function (percentages) {
      //获取所有的同名元素
      var fields = document.querySelectorAll(DOMstrings.percentagesLabel);

      //调用循环
      nodeListForEach(fields, function (cur, index) {
        if (percentages[index] > 0) {
          cur.textContent = percentages[index] + "%";
        } else {
          cur.textContent = "---";
        }
      });
    },
    showDate: function () {
      var now, year, month;
      now = new Date();
      year = now.getFullYear();
      month = now.getMonth() + 1;

      document.querySelector(DOMstrings.dateLabel).textContent =
        year + "/" + month;
    },
    changedType: function () {
      var elements, btn;
      elements = document.querySelectorAll(
        DOMstrings.inputType +
          ", " +
          DOMstrings.inputDescription +
          ", " +
          DOMstrings.inputValue
      );

      nodeListForEach(elements, function (cur) {
        cur.classList.toggle("red-focus");
      });

      btn = document.querySelector(DOMstrings.inputBtn);
      btn.classList.toggle("red");
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

//全局controller，关联其他controller，传参的意义是防止其他controller名称修改后需要多次修改
var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    //event delegation,event bubbile,DOM traversing
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);

    //change input color
    document
      .querySelector(DOM.inputType)
      .addEventListener("change", UICtrl.changedType);
  };

  var updateBudget = function () {
    var budget;
    //1. Calculate the budget
    budgetCtrl.calculateBudget();

    //2. return the budget
    budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function () {
    var percentages;

    //calculate the percentages
    budgetCtrl.calculatePercentages();

    //read the percentages from budget controller
    percentages = budgetCtrl.getPercentages();

    //update the percentages on the UI
    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function () {
    //1. Get the field input data
    var input = UICtrl.getInput();
    // console.log(input);
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budget controller
      var newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );
      //3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      //4. clear fields
      UICtrl.clearFields();

      //5. Calculate and update the budget
      updateBudget();

      //6. calculate the percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function (event) {
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      //1. delete the item from data sturcture
      budgetCtrl.deleteItem(type, ID);

      //2. delete the item from UI
      UICtrl.deleteListItem(itemID);

      //3. update the budget
      updateBudget();

      //4. calculate the percentages
      updatePercentages();
    }
  };
  return {
    init: function () {
      console.log("application has started.");
      UICtrl.showDate();
      UICtrl.displayBudget({
        budget: 0,
        percentage: -1,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
