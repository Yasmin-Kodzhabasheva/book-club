import { HTMLTemplate } from "../utils/utils";

class SearchComponent {
    constructor() {
        const params = {
            rootEl: ".home-page",
            createEl: "div",
            elContent: `<input type="text" name="search-books" id="search-books">`,
            elClass: "",
        };
        HTMLTemplate.createStructure(params);
    }
}

export default SearchComponent;
