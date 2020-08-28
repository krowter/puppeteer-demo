const createElementFromDOMString = (DOMString) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = DOMString;
  return wrapper.firstChild;
};

//filter data based on query (case-insensitive)
const generateResult = (items, query) => {
  return items.filter(({ name }) => {
    const regex = new RegExp(`${query}`, "i");
    return regex.test(name);
  });
};

window.onload = () => {
  const select = (id) => document.getElementById(id);
  const resultSection = select("result");
  const searchInput = select("search-field");
  const searchButton = select("submit-button");
  const resetButton = select("reset-button");

  //handler to display the results
  const populateResultSection = (items) => {
    //clear results first before appending items
    resultSection.innerHTML = "";

    items.forEach((itemData) => {
      resultSection.appendChild(createElementFromDOMString(Item(itemData)));
    });
  };

  const displayResult = (items, query) =>
    populateResultSection(generateResult(items, query));

  //populate with all items initially
  displayResult(items, "");

  const handleQueryChange = (e) => {
    e.preventDefault();
    const query = searchInput.value;
    displayResult(items, query);
  };

  searchButton.addEventListener("click", handleQueryChange);
  resetButton.addEventListener("click", () => {
    displayResult(items, "");
    searchInput.textContent = "";
  });
};
