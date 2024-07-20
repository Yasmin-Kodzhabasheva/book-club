import { HTMLTemplate } from "../../utils/utils";
import { FormFields } from "./FormComponent";
import { Auth } from "../../utils/utils";

class LoginForm {
    static render() {
        HTMLTemplate.replaceContent(
            ".form-container form",
            `   
            <div class="form-fields">
            ${FormFields.render(
                "email",
                true,
                "login-email flex flex-col mb-4",
                "border ring-gray-300 rounded w-[265px]",
                "Email"
            )}
        
            ${FormFields.render(
                "password",
                true,
                "login-password flex flex-col mb-4",
                "border ring-gray-300 rounded w-[265px]",
                "Password"
            )}
            </div>
        
                <button type="button" class="login-button w-2/4 rounded bg-orange-400/90 text-white">Login</button>`
        );

        const loginButton = document.querySelector(".login-button");

        loginButton?.addEventListener("click", LoginForm.login);
    }


    static login() {
        const formElement = document.querySelector("form")!;
        const formData = new FormData(formElement);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        Auth.authUser(email, password);
    }
}

export default LoginForm;
