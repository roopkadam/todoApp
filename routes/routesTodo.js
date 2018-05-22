const router = require('express').Router();
const cntrl = require('./../controller/controllerTodo');

/**
* @route '/'
* @description:this routr will send
*/
 router.get('/', cntrl.getTodo);
 router.post('/taskadd', cntrl.addTodo)
 router.delete('/taskdelete/:id',cntrl.deleteTodo)


module.exports = router;