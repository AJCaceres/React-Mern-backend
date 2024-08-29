const {Schema, model} = require('mongoose'); 

const EventSchema = Schema({

    title:{
        type:String,
        required: true,
        unique:false,
    },
    start:{
        type:Date,
        required: true,
        unique:false,
    },
    end:{
        type:Date,
        required: true,
        unique:false,
    },
    notes:{
        type:String,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:false,
    }
});

EventSchema.method('toJSON', function(){
   const{ _v,_id, ...object} = this.toObject();
   object.id = _id;
   return object
})

module.exports = model('Event', EventSchema);