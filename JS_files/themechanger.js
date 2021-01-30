// ! YOINKED: https://medium.com/@haxzie/dark-and-light-theme-switcher-using-css-variables-and-pure-javascript-zocada-dd0059d72fa2

// eslint-disable-next-line no-unused-vars
class ThemeChanger {
    // Made this a class so I can use it in other files this is probably bad  ̅\_🤓_/ ̅
    constructor(themeTrigger = document.querySelector('input[type="checkbox"]')) {
        this.theme = this.getTheme();
        this.themeTrigger = themeTrigger;
    }

    setTheme(theme) {
        localStorage.setItem('theme', theme);
        document.body.dataset.theme = theme;
        this.theme = theme;
    }

    init() {
        console.log(this);
        this.setTheme(this.theme);
        this.themeTrigger.onclick = this.toggleTheme.bind(this);
    }

    toggleTheme() {
        console.log('bam');
        this.setTheme((this.theme === 'light') ? 'dark' : 'light');
    }

    getTheme() {
        const storedTheme = localStorage.getItem('theme');
        const dataTheme = document.body.dataset.theme;
        // localStorage > data-theme > just dark mode
        const possibleTheme = [storedTheme, dataTheme, 'dark'].find(i => i);

        if (possibleTheme != 'dark' && possibleTheme != 'light') {
            return 'dark';
        } else {
            return possibleTheme;
        }
    }
}