const exports={}
export default exports

export function warn(msg){
    if (typeof console !== 'undefined') {
        console.error('[vue-easyui] ' + msg)
    }
}