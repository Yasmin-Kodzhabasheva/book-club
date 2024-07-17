import { HTMLTemplate, Auth } from "../utils/utils.ts";

class FormComponent {
    private formElement: HTMLFormElement;
    private formType: string;

    private registerContent = `
    <div class="form-email">
            <div class="email">
                <label for="email">Enter your email</label>
                <input type="email" name="email" id="email" required />
            </div>

            <div class="confirm-email">
                <label for="confirm-email">Confirm your email</label>
                <input
                    type="email"
                    name="confirm-email"
                    id="confirm-email"
                    required
                />
            </div>
        </div>

        <div class="form-password">
            <div class="password">
                <label for="password">Enter your password</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    required
                />
            </div>

            <div class="confirm-password">
                <label for="confirm-password">
                    Confirm your password
                </label>

                <input
                    type="text"
                    name="confirm-password"
                    id="confirm-password"
                    required
                />
            </div>
        </div>
        <button>Register</button>
        <div class="error-message">
            <p></p>
        </div>
    `;

    private loginContent = `
        <div class="login-email">
        <label for="email">Enter your email</label>
        <input type="email" name="email" id="email" required />
        </div>

        <div class="login-password">
        <label for="password">Enter your password</label>
        <input
            type="text"
            name="password"
            id="password"
            required
        />
        </div>
        <button>Login</button>
    `;

    constructor() {
        this.formType = "register";
        this.initializeForm(this.formType);
        this.formElement = document.querySelector("form")!;
        this.formElement.addEventListener("submit", this.submitForm.bind(this));
    }

    initializeForm(type: string) {
        this.formType = type;

        switch (this.formType) {
            case "login":
                HTMLTemplate.insertMainContent("#app form", this.loginContent);
                break;
            case "register":
                const params = {
                    insertEl: "#app",
                    content: this.registerContent,
                    createEl: "form",
                };

                HTMLTemplate.insertContent(params);
                break;
        }

    }

    showErrorMsg(message: string) {
        const errorMsg = this.formElement.querySelector(
            ".error-message p"
        ) as HTMLElement;

        errorMsg.textContent = message;
    }

    validateInput() {
        const formData = new FormData(this.formElement);

        const email = formData.get("email") as string;
        const confirmationEmail = formData.get("confirm-email") as string;
        const password = formData.get("password") as string;
        const confirmationPassword = formData.get("confirm-password") as string;

        if (password.length < 6) {
            this.showErrorMsg("Password should contain more than 6 characters");
            return;
        }

        if (
            !(
                password.includes("_") ||
                password.includes("@") ||
                password.includes("-")
            )
        ) {
            console.log(password);
            this.showErrorMsg(
                "Password should include at least one special charachter of the type _,@,-"
            );
            return;
        }

        if (password !== confirmationPassword) {
            this.showErrorMsg(
                "Password and conformation password should match"
            );
            return;
        }

        if (email !== confirmationEmail) {
            this.showErrorMsg("Email and conformation email should match");
            return;
        }

        return { email, password };
    }

    submitForm(event: Event) {
        event.preventDefault();

        switch (this.formType) {
            case "login":
                this.login();
                break;
            case "register":
                this.register();
                break;
        }
    }

    register() {
        const input = this.validateInput();

        if (!input) return;

        Auth.createUser(input.email, input.password);
    }

    login() {
        const formData = new FormData(this.formElement);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        Auth.authUser(email, password)
    }
}

export default FormComponent;
