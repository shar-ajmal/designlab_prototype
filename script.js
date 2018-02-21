/*
  PIN'S CODE
var textBoxes = document.getElementsByClassName("text-box")
console.log("hello");
console.log(textBoxes);
for(var i = 0; i < textBoxes.length; i++) {
  var textBox = textBoxes[i];
  textBox.oninput = function() {
    textBox.style.height = "";
    textBox.style.height = Math.min(textBox.scrollHeight, 300) + "px";
  };
}*/
/*var ta = document.querySelectorAll('textarea');
autosize(ta);

function gethlist() {
  return  $.ajax({
            url: "https://dok.herokuapp.com/obname.json",
            type: "GET",
            async: !1
        });
}

//var ajaxObj = gethlist();
//var ajaxResponse = ajaxObj.responseText;
//var parsed = JSON.parse(ajaxResponse);
//var arr = [];
for(var x in parsed){
  arr.push(parsed[x]);
}

var ta = document.querySelectorAll('textarea');
autosize(ta);

$('.text-box').highlightWithinTextarea({
    highlight: arr
});
*/

var words = ['fever', 'cough', 'coughing',  'migraine', 'fatigue', 'nausea', 'vommiting', 'stiff neck', 'tumor', 'sweating', 'chills', 'aches', 'shortness of breath', 'chest congestions', 'congestions', 'mucus', 'asthma'];

$('.text-box').highlightWithinTextarea({
    highlight: words
});

var table = document.getElementById("disease-table");
var text = document.getElementById("objective");
var addDiseaseButton = document.getElementById("add-disease");

text.addEventListener("keyup", updateArray);
text.addEventListener("click", updateArray);

addDiseaseButton.addEventListener("click", addDisease);

var flu = {
  "name" : "Flu",
  "symptoms": {"fever" : 2, "cough" : 1, "migraine" : 1, "fatigue" : 2},
  "score" : 0
};

var foodPoisoning = {
  "name" : "Food poisoning",
  "symptoms": {"fever" : 1, "nausea" : 0.5, "vommiting" : 3, "fatigue" : 2},
  "score" : 0
};

var meningitis = {
  "name" : "Meningitis",
  "symptoms": {"fever" : 2, "cough" : 1, "stiff neck" : 3, "fatigue" : 1},
  "score" : 0
};

var cancer = {
  "name" : "Cancer",
  "symptoms": {"tumor" : 4, "fever" : 1, "migraine" : 1, "fatigue" : 2},
  "score" : 0
};

var typhoid = {
  "name" : "Typhoid",
  "symptoms": {"fever" : 3, "sweating" : 1, "chills" : 2, "vommiting" : 1},
  "score" : 0
};

var pneumonia = {
  "name" : "Pneumonia",
  "symptoms": {"fever" : 3, "migraine" : 1, "aches" : 2, "fatigue" : 2, "coughing" : 1, "congestions" : 2, "mucus" : 2, "asthma" : 2}
}

var lowerResp = {
  "name" : "Lower Respitory Infection",
  "symptoms" : {"fever": 1, "cough": 2, "congestions": 2, "shortness of breath":2, "migraine": 1, "aches": 1}
}

var acuteBronchitis = {
  "name" : "Acute Bronchitis",
  "symptoms" : {"fever": 1, "cough": 2, "congestions": 3, "shortness of breath":2, "migraine": 1, "aches": 2, "fatigue" : 2}
}

var chronicBronchitis = {
  "name" : "Chronic Bronchitis",
  "symptoms" : {"fever": 1, "cough": 2, "congestions": 3, "shortness of breath":2, "migraine": 1, "aches": 2, "fatigue" : 2}
}

var bronchitis
var diseases = [flu, foodPoisoning, meningitis, cancer, typhoid, pneumonia, lowerResp, acuteBronchitis, chronicBronchitis];
var listOfEntries = [];
var userEntries = []
var userEntriesNum = 0;

function createXButton() {


  xButtonEntry = document.createElement("td");
  xButtonEntry.className = "disease-table-x";

  var xButton = document.createElement("button");
  xButton.innerHTML = "&times;";
  xButton.id = "XButton-" + userEntriesNum; 
  xButton.addEventListener("click", function() { removeAddedDisease(xButton.id) });


  xButtonEntry.appendChild(xButton);  
  return xButtonEntry;

}

function addDisease() {
  var input = document.getElementById("input-disease");
  if (input.value) {
    userEntries.unshift(input.value);
    updateArray();
    input.value = "";
  }
}

function removeAddedDisease(id) {
  var num = id.charAt(id.length-1);
  var selectedInput = document.getElementById("disease-table-entry-" + num).innerText;
  console.log(selectedInput);
  console.log(userEntries);
  userEntries.splice(userEntries.indexOf(selectedInput), 1);
  console.log(userEntries);

  updateArray();
}

function updateArray() {
  //console.log("updateArray");
  var text_value = document.getElementById("objective").value.toLowerCase();
  symptoms = []
  for (var i = 0; i < words.length; i++) {
    if(!symptoms.includes(words[i])) {
      if(text_value.includes(words[i])) {
        symptoms.push(words[i]);
      }
    }
  }
  //console.log(text_value)
  calculateScore(text_value);
  addRows();
  //console.log(symptoms);;
}

function sortDiseaseByScore () {
  diseases.sort(function(a,b) { return (b.score - a.score); });
}

function calculateScore (text_value) {
  diseases.forEach(function(disease) {
    var symptoms = disease.symptoms;
    var score = 0;
    for (var symptom in symptoms) {
      if (text_value.includes(symptom)) { score += symptoms[symptom]; }
    }
    disease['score'] = score;
    //console.log("The disease is " + disease.name + " and the score is " + score);
  });

};

function deleteTable() {
  console.log("We are deleting the table");
  for(var i = document.getElementById("disease-table").rows.length; i > 0; i--)
  {
    console.log("We are deleting row " + (i-1));
    document.getElementById("disease-table").deleteRow(i -1);
  }
}


function addRows() {
  console.log("Adding rows to the GUI")

  deleteTable();
  sortDiseaseByScore();

  listOfEntries = [];

  for (var i = 0; i < 3; i++) {
    var tempDisease = diseases[i];
    if(tempDisease.score > 0) {
      var row = document.createElement("tr");
      row.className = "disease-row"
      var entryName = document.createElement("td");
      var entryScore = document.createElement("td");
      entryName.className = "disease-table-entry"
      entryName.innerText = tempDisease.name;
      //entryScore.innerText = "Score: " + Math.log(tempDisease.score).toFixed(2);
      row.appendChild(entryName);
      //row.colspan = 2;
      row.appendChild(entryScore);
      table.appendChild(row)
      console.log(row);
      listOfEntries.push(row);
    }
  }
  addRowsTable();
}


function createUserRows(str) {
  var row = document.createElement("tr");
  row.className = "disease-row"

  xButton = createXButton()

  var entry = document.createElement("td");
  entry.innerText = str;
  entry.className = "disease-table-entry";
  entry.id = "disease-table-entry-" + userEntriesNum;

  console.log(xButton.id);
  console.log("THE ID IS " + entry.id);

  row.appendChild(entry);
  row.append(xButton);
  
  table.appendChild(row);  
}
function addRowsTable() {
  console.log("We are adding to the rows table");

  for (var i = 0; i < userEntries.length; i++) {
    createUserRows(userEntries[i]);
  }

  for (var i = 0; i < listOfEntries.length; i++) {
    console.log(listOfEntries[i]);
    table.appendChild(listOfEntries[i]);
  }

}