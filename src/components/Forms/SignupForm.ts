import { HTMLTemplate } from "../../utils/utils";
import { FormFields } from "./FormComponent";
import { Auth } from "../../utils/utils";

class SignupForm {
    static render() {
        HTMLTemplate.replaceContent(
            ".form-container form",
            `    <div class="form-fields w-2/4">
            ${FormFields.render(
                "email",
                true,
                "email flex flex-col mb-4",
                "border ring-gray-300 rounded",
                "Email"
            )}

            ${FormFields.render(
                "password",
                true,
                "password flex flex-col mb-4",
                "border ring-gray-300 rounded",
                "Create password"
            )}

            ${FormFields.render(
                "password",
                true,
                "confirm-password flex flex-col mb-4",
                "border ring-gray-300 rounded",
                "Confirm password"
            )}


        </div>
        <button class="sigunp-button w-2/4 rounded bg-orange-400/90 text-white">Sigunp</button>`
        );

        const signupButton = document.querySelector(".signup-button");

        signupButton?.addEventListener("click", SignupForm.signup);
    }

    static showErrorMsg(message: string) {
        const errorMsg = document.querySelector(
            ".error-message p"
        ) as HTMLElement;

        errorMsg.textContent = message;
    }

    static validateInput() {
        const formElement = document.querySelector("form")!;
        const formData = new FormData(formElement);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmationPassword = formData.get("confirm-password") as string;

        if (password.length < 6) {
            SignupForm.showErrorMsg(
                "Password should contain more than 6 characters"
            );
            return;
        }

        if (
            !(
                password.includes("_") ||
                password.includes("@") ||
                password.includes("-")
            )
        ) {
            SignupForm.showErrorMsg(
                "Password should include at least one special charachter of the type _,@,-"
            );
            return;
        }

        if (password !== confirmationPassword) {
            SignupForm.showErrorMsg(
                "Password and conformation password should match"
            );
            return;
        }

        return { email, password };
    }

    static signup() {
        const input = this.validateInput();

        if (!input) return;

        Auth.createUser(input.email, input.password);
    }
}

export default SignupForm;
