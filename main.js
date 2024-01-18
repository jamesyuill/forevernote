import getDocById from './utils/getDocById.js';
import getStoredDocs from './utils/getStoredDocs.js';

const searchBar = document.getElementById('.searchbar');
const searchForm = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');
const documentDiv = document.getElementById('document');
const addBtn = document.getElementById('add-btn');
const errorDiv = document.getElementById('error');

const baseurl = 'http://localhost:8080/';

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
    const elementTags = document.createElement('h5');
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

//add new function
const addNewDoc = () => {
  resultsDiv.innerText = '';

  //create form with classname
  const newDocForm = document.createElement('form');
  newDocForm.className = 'new-doc-form';

  //create a submit button with classname
  const newDocAddBtn = document.createElement('button');
  newDocAddBtn.className = 'new-doc-add-btn';
  newDocAddBtn.innerText = 'Add';
  newDocAddBtn.setAttribute('type', 'submit');

  //input for Topic with id
  const topicInputLabel = document.createElement('label');
  topicInputLabel.setAttribute('for', 'topic-input');
  topicInputLabel.innerText = 'Topic: ';
  const topicInput = document.createElement('input');
  topicInput.setAttribute('id', 'topic-input');

  //input for tags
  const tagsInputLabel = document.createElement('label');
  tagsInputLabel.setAttribute('for', 'tags-input');
  tagsInputLabel.innerText = 'Tags (comma separated): ';
  const tagsInput = document.createElement('input');
  tagsInput.setAttribute('id', 'tags-input');

  //input for title
  const titleInputLabel = document.createElement('label');
  titleInputLabel.setAttribute('for', 'title-input');
  titleInputLabel.innerText = 'Title: ';
  const titleInput = document.createElement('input');
  titleInput.setAttribute('id', 'title-input');

  //input for content (text area)
  const contentInputLabel = document.createElement('label');
  contentInputLabel.setAttribute('for', 'content-input');
  contentInputLabel.innerText = 'Content: ';
  const contentInput = document.createElement('textarea');
  contentInput.setAttribute('id', 'content-input');
  contentInput.setAttribute('rows', '20');

  //append() elements to the newDocForm
  newDocForm.append(
    topicInputLabel,
    topicInput,
    tagsInputLabel,
    tagsInput,
    titleInputLabel,
    titleInput,
    contentInputLabel,
    contentInput,
    newDocAddBtn
  );

  //append newDocForm to results Div
  resultsDiv.appendChild(newDocForm);

  //update docs.json
  // docs.json needs id, topic, title, tags
  const updateDocsJson = async (ogDocs, newDocToAdd) => {
    ogDocs = [...ogDocs, newDocToAdd];

    //overwrite the docs.json file with fs
    const response = await fetch(baseurl + 'api/docs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ogDocs),
    });

    const result = await response.json();

    return result;
  };

  //add new json file
  const handleNewDocUpdate = async (e) => {
    e.preventDefault();
    //create unique id? date and time?
    const id = Date.now() + Math.floor(Math.random());
    const topic = topicInput.value;
    //create an array of tags
    const tags = tagsInput.value.split(',');

    const title = titleInput.value;
    const content = contentInput.value;
    const newDocToAdd = {
      id: id,
      topic: topic,
      title: title,
      tags: tags,
    };
    const res = await updateDocsJson(docs, newDocToAdd);

    if (res.msg) {
      console.log('condition met');
      errorDiv.innerText = 'document added successfully';
    } else {
      errorDiv.innerText = 'something went wrong!';
    }
  };

  //add an event listener to the button - on submit
  newDocForm.addEventListener('submit', handleNewDocUpdate);
};
//edit function

//delete function

//status message function

searchForm.addEventListener('submit', searchDocs);
addBtn.addEventListener('click', addNewDoc);
