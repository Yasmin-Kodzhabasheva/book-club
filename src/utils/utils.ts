import { auth } from "../firebase/firebase";
import LandingComponent from "../components/LandingComponent";
import HomeComponent from "../components/HomeComponent";

type HTMLStructure = {
    rootEl: string;
    createEl: string;
    elContent: string;
    elClass: string;
};

class UI {
    static render(verification: string) {
        if (Auth.isAuth() || verification) {
            new HomeComponent();
        } else {
            new LandingComponent();
        }
    }
}

class HTMLTemplate {
    static createStructure(params: HTMLStructure) {
        const { rootEl, createEl, elContent, elClass } = params;

        const rootElement = document.querySelector(rootEl)!;
        const createdElement = document.createElement(createEl);

        createdElement.className = elClass;

        createdElement.innerHTML = elContent;

        rootElement.appendChild(createdElement);
    }

    static replaceContent(rootEl: string, elContent: string) {
        const rootElement = document.querySelector(rootEl)!;

        rootElement.innerHTML = elContent;
    }
}

class Auth {
    static isAuth() {
        const cookies = document.cookie;

        if (cookies.includes("userAuth=true")) return true;

        return false;
    }

    static createUser(email: string, password: string) {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                document.cookie = "userAuth=true";
                UI.render("auth");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    static authUser(email: string, password: string) {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                document.cookie = "userAuth=true";
                UI.render("auth");
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
}

export { HTMLTemplate, Auth, UI };
