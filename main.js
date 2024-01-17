import getStoredDocs from './utils/getStoredDocs.js';

const searchBar = document.getElementById('.searchbar');
const searchForm = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');

const { docs } = await getStoredDocs();

const searchDocs = async (e) => {
  e.preventDefault();
  resultsDiv.innerText = '';
  const searchQuery = e.target[0].value;
  console.log(searchQuery);
  const filteredDocs = findDocs(searchQuery, docs);
  console.log(filteredDocs);
  displayDocs(filteredDocs);
};

// function to retrieve content from given doc url path
const findDocs = (searchQuery, docs) => {
  return docs.filter((item) => {
    for (const key in item) {
      const value = item[key];
      if (value.includes(searchQuery)) {
        return item;
      }
    }
  });
};

// function to display potential docs cards
const displayDocs = (results) => {
  results.forEach((card) => {
    const cardElement = document.createElement('article');
    cardElement.className = 'doc-cards';
    const elementTitle = document.createElement('h3');
    elementTitle.innerText = `Topic: ${card.title}`;
    const elementTopic = document.createElement('h4');
    elementTopic.innerText = `Topic: ${card.topic}`;

    //appends elements to the card
    cardElement.append(elementTitle, elementTopic);

    cardElement.addEventListener('click', () => {
      findDocById(card.id);
    });

    //appends the card to the results div
    resultsDiv.appendChild(cardElement);
  });
};

const findDocById = (id) => {
  //search for correct document with dynamic path

  console.log(id);
};

searchForm.addEventListener('submit', searchDocs);
