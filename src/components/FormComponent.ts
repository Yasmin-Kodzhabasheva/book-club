import { HTMLTemplate } from "../utils/utils.ts";
import { auth } from "../firebase/firebase.ts";

class FormComponent {
    private formElement: HTMLFormElement;

    constructor() {
        HTMLTemplate.insertContent(
            "#app",
            `<form>
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
      </form>`
        );
        this.formElement = document.querySelector("form")!;

        this.formElement.addEventListener("submit", this.submitForm.bind(this));
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
        const input = this.validateInput();

        if (!input) return;

        auth.createUserWithEmailAndPassword(input.email, input.password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
}

export default FormComponent;
