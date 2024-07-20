import { HTMLTemplate } from "../utils/utils";
import SearchComponent from "./SearchComponent";

class HomeComponent {
    constructor() {

        HTMLTemplate.replaceContent(
            "#app",
            `<div class="home-page container mx-auto h-96">
        <h1>Find books and create your own lists</h1>
        </div>`
        );

        new SearchComponent();
    }
}

export default HomeComponent;
