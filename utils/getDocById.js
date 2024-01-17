const baseurl = 'http://localhost:8080/';
// function to get docs.json information
const getDocById = async (doc_id) => {
  const response = await fetch(baseurl + `api/docs/${doc_id}`);
  const doc = await response.json();
  return doc;
};

export default getDocById;
