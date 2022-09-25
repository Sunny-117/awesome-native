(function (root) {
    function AudioManage() {
        this.audio = new Audio(); //创建一个audio实例
        this.status = 'pause';    //歌曲的状态，默认为暂停
    }
    AudioManage.prototype = {
        //加载音乐
        load: function (src) {
            this.audio.src = src; //设置音乐的路径
            this.audio.load();  //加载音乐
        },

        //播放音乐
        play: function () {
            this.audio.play();
            this.status = 'play';
        },

        //暂停音乐
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },

        //音乐播放完成事件
        end: function (fn) {
            this.audio.onended = fn;
        },

        //跳到音乐的某个时间点
        playTo: function (time) {
            this.audio.currentTime = time;    //单位为秒
        }
    }

    root.music = new AudioManage();   //把实例对象暴露出去
})(window.player || (window.player = {}));