let myLeads = [];

const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const delBtn = document.getElementById('del-btn');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

const tabBtn = document.getElementById('tab-btn');

tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = '';
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <a target = "_blank" href="${leads[i]}">
    <li>
        ${leads[i]}
      </a>
    </li>
      `;
  }
  ulEl.innerHTML = listItems;
}

delBtn.addEventListener('dblclick', function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value);
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
});
