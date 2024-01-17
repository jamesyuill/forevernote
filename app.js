import fs from 'fs';

const searchBar = document.getElementById('.searchbar');
const searchForm = document.getElementById('search-form');

const storedDocs = getStoredDocs();
console.log(storedDocs);
console.log(typeof storedDocs);
const searchDocs = (e) => {
  e.preventDefault();
  const searchQuery = e.target[0].value;
  console.log(searchQuery);
};

// function to get docs.json information
const getStoredDocs = () => {
  const docsInfo = fs.readFileSync('data/docs.json', {
    encoding: 'utf-8',
  });
  return JSON.parse(docsInfo);
};

// function to retrieve content from given doc url path
const findDocs = (searchQuery, docsLookup) => {};

// function to display potential docs cards
const displayDocs = () => {};

searchForm.addEventListener('submit', searchDocs);
