import { HTMLTemplate } from "../../utils/utils.ts";
import SignupForm from "./SignupForm.ts";
import LoginForm from "./LoginForm.ts";

class FormFields {
    static render(
        type: string,
        required: boolean,
        containerClass: string,
        inputClass: string,
        placeholder: string
    ) {
        return `
        <div class="${containerClass}">
        <input 
        type="${type}" 
        name="${type}" i
        d="${type}" 
        required="${required}" 
        class="${inputClass}"
        placeholder="${placeholder}"
        autocomplete="on"
        />
         </div>
        `;
    }
}

class Switcher {
    static render() {
        return `
        <div class="flex justify-center">
        <button class="signup-switcher active bg-gray-200 rounded-l-lg px-10 py-1">Sign up</button>
        <button class="login-switcher bg-gray-200 rounded-r-lg px-10 py-0">Log in</button>
    </div>
        `;
    }

    static removeActiveClass(
        removeClassFrom: HTMLButtonElement,
        addClassTo: HTMLButtonElement
    ) {
        removeClassFrom?.classList.remove("active");
        addClassTo?.classList.add("active");
    }

    static switchActiveButton() {
        const loginSwitcher = document.querySelector(
            ".login-switcher"
        ) as HTMLButtonElement;
        const signupSwitcher = document.querySelector(
            ".signup-switcher"
        ) as HTMLButtonElement;

        loginSwitcher?.addEventListener("click", () => {
            Switcher.removeActiveClass(signupSwitcher, loginSwitcher);
            LoginForm.render();
        });

        signupSwitcher?.addEventListener("click", () => {
            Switcher.removeActiveClass(loginSwitcher, signupSwitcher);
            SignupForm.render();
        });
    }
}

class FormSkeleton {
    structure = `
    <div class="image-container w-2/4">
        <img
            src="https://e1.pxfuel.com/desktop-wallpaper/73/748/desktop-wallpaper-books-41-high-quality-books-books.jpg"
            class="h-full"
        />
    </div>
    <div class="form-container flex flex-col w-1/2 justify-around">
        <form
        method="POST"
            class="flex flex-col justify-center items-center gap-4 h-[180px]"
        >
            <div class="error-message">
                <p></p>
            </div>
        </form>
        ${Switcher.render()}
    </div>
    `;

    constructor() {
        const params = {
            rootEl: ".landing-page",
            createEl: "div",
            elContent: this.structure,
            elClass:
                "main-container flex flex-row h-[500px] border rounded-md ring-slate-100",
        };
        HTMLTemplate.createStructure(params);
    }
}

class FormComponent {
    formField: FormFields = new FormFields();

    constructor() {
        new FormSkeleton();
        SignupForm.render();

        Switcher.switchActiveButton();
    }
}

export { FormFields };

export default FormComponent;
