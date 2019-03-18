function getValueFromPropertyNameRec(obj, listProp)
{
    let res = obj;
    let tmp = obj;
    for (let prop of listProp) {
        res = res[prop];
        if (!res)
            break;
    }
    return res;
}


module.exports = {
    replaceVar : function (str, msg) {
        if (typeof str != "string")
            return str;
        if (str.match(/^\{\{.*\}\}$/g)) { // if the string is in double brackets like {{ foo }}
            let s = str.substring(2, str.length - 2);
            let v =  s.split(".");
            if (v.length < 2)
                return str;
            switch (v[0]) {
                case 'msg' : 
                    return getValueFromPropertyNameRec(msg, v.splice(1, v.length));
                break;
                default:
                    return str;
                break;
            }

        } else {
            return str;
        }
    }
}