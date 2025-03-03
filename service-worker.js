function addNotes() {
  const values = document.querySelectorAll("td.right>input");
  const inputFields = document.querySelectorAll("div.field>span.formulaTextBoxHolder>input");
  values.forEach((item, x) => {
    inputFields[x].value = parseFloat(item.attributes.value.nodeValue);
  });
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('https://chrome')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addNotes
    });
  }
});
