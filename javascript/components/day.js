import View from '../views/view';
//import $ from 'jquery';
//import _ from 'underscore';

const fs = require('fs');
const template = fs.readFileSync(__dirname + '/../templates/day.html', 'utf8');

class DayView extends View {

    get events() {
        return {
            'click .day': 'loadDay'
        }
    }

    initialize(options) {
        this.model = options.model;
        this.appState = options.appState;
    }

    deleteViewAndModel() {
        this.model.destroy();
        this.deleteView();
    }

    deleteView() {
        this.remove();
        this.unbind();
    }

    loadDay(ev) {
        $('.day.is-active').removeClass('is-active');
        $(ev.currentTarget).addClass('is-active');
        this.appState.attributes.hour = void 0;
        this.appState.set('day', this.model.get('day'));
    }

    getTemplateData() {
        return _.extend({
            scale: this.appState.get('scale'),
            isActive: this.appState.get('day') === this.model.get('day')
        }, this.model.attributes);
    }

}

export default DayView;
