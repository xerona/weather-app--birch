import View from '../views/view';

const fs = require('fs');
const template = fs.readFileSync(__dirname + '/../templates/scale.html', 'utf8');

class ScaleView extends View {

    get events() {
        return {
            'change .js-scale': 'changeScale'
        };
    }

    initialize(options) {
        options = options || {};
        this.model = options.appState;
        this.render();
    }

    changeScale() {
        var scale = this.model.get('scale') === 'english' ? 'metric' : 'english';
        this.model.set('scale', scale);
    }

}

export default ScaleView;
