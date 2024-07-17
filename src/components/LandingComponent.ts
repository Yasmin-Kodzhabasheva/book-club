import { HTMLTemplate } from "../utils/utils";
import FormComponent from "./FormComponent";

class LandingComponent {
    loginBtn: HTMLButtonElement;
    formComponent: FormComponent;

    constructor() {
        const params = {
            insertEl: "#app",
            content: `<p>If you are already a user please <button class="login-btn">login</button> to your account</p>`,
            createEl: "div",
        };

        HTMLTemplate.insertMainContent(
            "#app",
            `
            <h1>Wellcome to the Book Club</h1>
            <p>In order to get started, please create a user profile.</p>
            `
        );

        this.formComponent  =  new FormComponent();
   

        HTMLTemplate.insertContent(params);

        this.loginBtn = document.querySelector(".login-btn")!;

        this.loginBtn.addEventListener("click", () => {
            this.formComponent.initializeForm('login');
        });
    }
}

export default LandingComponent;
