// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        movRaduis: 0,
        xMoveRange: 0,
        yMoveRange: 0,
        base:{
            default: null,
            type: cc.Node
        }
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        this.originPos = this.node.position;
        cc.log("the position x is:", this.originPos.x, ", y is :", this.originPos.y);

        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.setInputControl();
    },

    setInputControl: function(){
        var self = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event){
            switch(event.keyCode)
            {
                case cc.KEY.a:
                    self.moveLeft = true;
                    break;
                case cc.KEY.d:
                    self.moveRight = true;
                    break;
                case cc.KEY.w:
                    self.moveUp = true;
                    break;
                case cc.KEY.s:
                    self.moveDown = true;
                    break;
            }
        })
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function(event){
            switch(event.keyCode)
            {
                case cc.KEY.a:
                    self.moveLeft = false;
                    break;
                case cc.KEY.d:
                    self.moveRight = false;
                    break;
                case cc.KEY.w:
                    self.moveUp = false;
                    break;
                case cc.KEY.s:
                    self.moveDown = false;
                    break;
            }
        })

    },


    start () {
    },

    update (dt) {
        if(null != this.base.pos)
        {
            // cal dist
            var baseWidthOffset = this.base.width * this.base.scaleX / 2;
            var baseHeightOffset = this.base.height * this.base.scaleY / 2;
            var basePos = this.base.pos;
            var pos = new cc.Vec2(basePos.x - baseWidthOffset, basePos.y - baseHeightOffset);

            if(Math.abs(pos.x - this.originPos.x) < this.xMoveRange)
            {
                this.moveLeft = false;
                this.moveRight = false;
            }
            else if(pos.x < this.originPos.x )
            {
                this.moveLeft = true;
                this.moveRight = false;
            }
            else
            {
                this.moveRight = true;
                this.moveLeft = false;
            }

            if(Math.abs(pos.y - this.originPos.y) < this.yMoveRange){
                this.moveDown = false;
                this.moveUp = false;
            }
            else if(pos.y < this.originPos.y )
            {
                this.moveDown = true;
                this.moveUp = false;
            }
            else
            {
                this.moveUp = true;
                this.moveDown = false;
            }
        }else
        {
            this.moveLeft = false;
            this.moveRight = false;
            this.moveUp = false;
            this.moveDown = false;
        }
        if(this.moveLeft)
        {
            this.node.x = this.originPos.x - this.movRaduis ;
        }else if(this.moveRight){
            this.node.x = this.movRaduis + this.originPos.x;
        }else{
            this.node.x = this.originPos.x;
        }

        if(this.moveUp)
        {
            this.node.y = this.originPos.y + this.movRaduis ;
        }else if(this.moveDown)
        {
            this.node.y = this.originPos.y - this.movRaduis ;
        }else{
            this.node.y = this.originPos.y;
        }

    },
});
