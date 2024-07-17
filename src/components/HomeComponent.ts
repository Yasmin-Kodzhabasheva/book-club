import { HTMLTemplate } from "../utils/utils";
import SearchComponent from "./SearchComponent";

class HomeComponent {
    constructor() {
        HTMLTemplate.insertMainContent(
            "#app",
            `
            <div class="home-page">
              <h1>Find books and create your own lists</h1>
            </div>
            `
        );

        new SearchComponent;
    }
}

export default HomeComponent;
