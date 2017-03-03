import Ember from 'ember';

const {
    computed,
    inject
} = Ember;

export default Ember.Controller.extend({
    i18n : inject.service(),

    reason: computed('errors', function(){
        const dictionary = this.get('i18n');
        const locale = this.get('i18n.locale');
        // the node 'request-errors' in the locale files contains nodes corresponding to the error code.
        const errors = this.get('errors').errors;
        const data = this.get('errors').data;

        let res = '';
        errors.map((obj) => {
         if(obj.code){
            const header = dictionary.t('request-errors.' + obj.code + '.header');
            let msg = dictionary.t('request-errors.' + obj.code + '.message');
            res += `<h2>${header}</h2>
                    <p>${msg}</p>`;
         }
         else {
             res = 'No error code supplied...'
         }
        });
        return res;
    })
});

