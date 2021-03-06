/*

This is a feeble attempt at slightly obfuscating some html using comments and data-attributes:)
(Just for fun)

*/

(function() {
    const all = document.body.getElementsByTagName('*');
    const id = () => {
        return '_' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
    };

    for (const e of all) {
        try {
            e.insertAdjacentHTML('beforeend', '<!-- <>' + id() + id() + '<> -->');
            e.insertAdjacentHTML('afterend', '<!----><!--' + id() + '--><!---->');
            e.insertAdjacentHTML('beforebegin', '<!--' + id() + '-->');
            e.insertAdjacentHTML('afterbegin', '<!--' + id() + '-->');

            for (let x = 0; x < 5; x++) {
                e.dataset[id().substr(0, 3)] = id();
            }
        } catch (err) {
            console.error('unable to insert', e);
        }

    }

})();
