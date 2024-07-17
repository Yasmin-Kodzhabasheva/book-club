import { auth } from "../firebase/firebase";
import LandingComponent from "../components/LandingComponent";
import HomeComponent from "../components/HomeComponent";

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
    static insertMainContent(element: string, content: string) {
        const rootElement = document.querySelector(element)!;

        rootElement.innerHTML = content;
    }

    static insertContent(params: {
        insertEl: string;
        content: string;
        createEl: string;
    }) {
        const rootElement = document.querySelector(params.insertEl)!;
        const createdEl = document.createElement(params.createEl);

        createdEl.innerHTML = params.content;
        rootElement.appendChild(createdEl);
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
