const {response} = require('express');
const Event = require('../models/Event')


const getEvents = async(req, res = response)=>{
    
    const events = await Event.find()
                              .populate('user', 'name')
    res.json({
        ok:true,
        events
    })
}


const createEvent = async(req, res = response)=>{
    const event = new Event(req.body)

    try {
        event.user = req.uid
        const savedEvent = await event.save()
        res.json({
            ok:true,
            event: savedEvent
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Por favor hable con el administrador"
        })
    }
}


const updateEvent = async(req, res = response)=>{

    const eventId = req.params.id;
    const uid = req.uid
    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok:false,
                msg:"Evento no existe por ese id"
            })
        }
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:"Evento no puede ser modificado por alguien distinto"
            })
        }
        const newEvent= {
            ...req.body,
            user:uid
        }
        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent,{new:true});
        res.json({
            ok:true,
            evento:eventUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
    res.json({
        ok:true,
        msg:'editar evento updateEvent'
    })
}


const deleteEvent = async(req, res = response)=>{
    const eventId = req.params.id;
    const uid = req.uid
    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok:false,
                msg:"Evento no existe por ese id"
            })
        }
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:"Evento no puede ser eliminado por alguien distinto"
            })
        }
        await Event.findByIdAndDelete(eventId);

        res.json({
            ok:true,
            msg:"Evento eliminado éxitosamente"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}

