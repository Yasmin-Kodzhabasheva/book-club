class HTMLTemplate {
    static insertContent(element: string, content: string) {
        const rootElement = document.querySelector(element)!;

        rootElement.innerHTML = content;
    }
}

export { HTMLTemplate };
