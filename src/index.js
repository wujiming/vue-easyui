import {warn} from './util'
import textbox from './Textbox'
import panel from './Panel'

function plugin(Vue,options){
    if(plugin.installed){
        warn('aready installed.');
        return
    }
    console.log('installing...');


    Vue.directive('ve-textbox',textbox)
    Vue.directive('ve-panel',panel)
    
}

plugin.version='0.1.0'


export default plugin

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}