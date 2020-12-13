function defineReactive(data, key, val) {
    observe(val);//遍历选出可枚举的数据值
    var dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
                //dep添加订阅
                dep.addSub(Dep.target);
            }
            return val;
        },
        set: function (newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
            //数据变化则通知订阅者
            dep.notify();
        }
    })
};
Dep.target = null;
function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function (key) {
        //key方法选出可枚举对象
        defineReactive(data, key, data[key]);
    })
};

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
};
// var library = {
//     book1: {
//         name: ''
//     },
//     book2: ''
// };
// observe(library);
// library.book1.name = '我是第一本书';//属性name已经被监听了，现在值为：“我是第一本书”
// library.book2 = '我是第二本书';  //属性book2已经被监听了，现在值为：“我是第二本书”
