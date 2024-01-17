const baseurl = 'http://localhost:8080/';
// function to get docs.json information
const getStoredDocs = async () => {
  const response = await fetch(baseurl + 'api/docs');
  const docs = await response.json();
  return docs;
};

export default getStoredDocs;
