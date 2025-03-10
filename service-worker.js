function addNotes() {
  const values = document.querySelectorAll("td.right>input");
  const inputFields = document.querySelectorAll("div.field>span.formulaTextBoxHolder>input");
  const totalAllowedCredit = parseFloat(document.getElementById("AmountDue").textContent.replace(/,/g, ''));
  let allocatedCredit = 0;

  for (let x = 0; x < values.length; x++) {
    let item = values[x];
    let fieldAmount = parseFloat(item.attributes.value.nodeValue);
    allocatedCredit += fieldAmount;

    if (allocatedCredit <= totalAllowedCredit) {
      inputFields[x].value = fieldAmount;
    }
    else {
      fieldAmount -= allocatedCredit - totalAllowedCredit;
      inputFields[x].value = fieldAmount;
      break;
    }
  }
}

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes('https://go.xero.com/Credits/Allocate')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addNotes
    });
  }
});
