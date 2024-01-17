import getDocById from './utils/getDocById.js';
import getStoredDocs from './utils/getStoredDocs.js';

const searchBar = document.getElementById('.searchbar');
const searchForm = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');
const documentDiv = document.getElementById('document');

const { docs } = await getStoredDocs();

const searchDocs = async (e) => {
  e.preventDefault();
  resultsDiv.innerText = '';
  const searchQuery = e.target[0].value;
  const filteredDocs = findDocs(searchQuery, docs);
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
    const elementTitle = document.createElement('h4');
    elementTitle.innerText = `Title: ${card.title}`;
    const elementTopic = document.createElement('h5');
    elementTopic.innerText = `Topic: ${card.topic}`;
    const elementTags = document.createElement('p');
    elementTags.innerText = card.tags.join(' | ');
    //appends elements to the card
    cardElement.append(elementTitle, elementTopic, elementTags);

    //appends the card to the results div
    resultsDiv.appendChild(cardElement);
    cardElement.addEventListener('click', async () => {
      const doc = await findDoc(card.id);

      displayChosenDoc(doc);
    });
  });
};

const findDoc = async (query_id) => {
  const { doc } = await getDocById(query_id);
  return doc;
};

// creates and appends chosen document elements
const displayChosenDoc = (doc) => {
  documentDiv.innerText = '';
  const docTitle = document.createElement('h3');
  docTitle.innerText = doc.title;
  const docContent = document.createElement('p');
  docContent.innerText = doc.content;

  documentDiv.append(docTitle, docContent);
  documentDiv.style.visibility = 'visible';
};

searchForm.addEventListener('submit', searchDocs);
