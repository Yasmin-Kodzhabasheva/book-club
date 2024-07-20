import { HTMLTemplate } from "../utils/utils";
import FormComponent from "./Forms/FormComponent";

class LandingComponent {
    formComponent: FormComponent;

    constructor() {
        HTMLTemplate.createStructure({
            rootEl: "#app",
            createEl: "div",
            elContent: `<div>
                <h1>Wellcome to the Book Club</h1>
                <p>In order to get started, please create a user profile.</p>
                </div>`,
            elClass: "landing-page flex flex-col gap-12",
        });

        this.formComponent = new FormComponent();
    }
}

export default LandingComponent;
