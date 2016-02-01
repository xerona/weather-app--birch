import View from '../views/view';
//import _ from 'underscore';

const fs = require('fs');
const dayTemplate = fs.readFileSync(__dirname + '/../templates/day_statistics.html', 'utf8');
const hourTemplate = fs.readFileSync(__dirname + '/../templates/hour_statistics.html', 'utf8');

class StatisticsView extends View {

    initialize(options) {
        options = options || {};
        this.appState = options.appState;
        this.hours = options.hours;
        this.days = options.days;
        this.listenTo(this.appState, 'dataReady', this.render);
        this.listenTo(this.appState, 'change:day', this.showDay);
        this.listenTo(this.appState, 'change:hour', this.showHour);
        this.listenTo(this.appState, 'change:scale', this.render);
        if (this.appState.get('hour')) {
            this.showHour(this.appState, this.appState.get('hour'));
        } else if (this.appState.get('day')) {
            this.showDay(this.appState, this.appState.get('day'));
        }
    }

    showDay(model, day) {
        this.model = this.days.findWhere({day: +day});
        this.template = Handlebars.compile(dayTemplate);
        this.render();
    }

    showHour(model, hour) {
        this.model = this.hours.findWhere({day: +this.appState.get('day'), hour: +hour});
        this.template = Handlebars.compile(hourTemplate);
        this.render();
    }

    getTemplateData() {
        return _.extend({}, this.model.attributes, this.appState.attributes);
    }

}

export default StatisticsView;
