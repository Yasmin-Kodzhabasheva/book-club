import { HTMLTemplate } from "../utils/utils";

class SearchComponent {
    constructor() {
        const params = {
            insertEl: ".home-page",
            content: `<input type="text" name="search-books" id="search-books">`,
            createEl: "div",
        };
        HTMLTemplate.insertContent(params);
    }
}

export default SearchComponent;
