const baseurl = 'http://localhost:8080/';
// function to get docs.json information
const getDocById = async (doc_id) => {
  const response = await fetch(baseurl + `api/docs/${doc_id}`);
  const docs = await response.json();
  return docs;
};

export default getDocById;
