const router = require('express').Router();
const cntrl = require('./../controller/controllerTodo');

/**
* @route '/'
* @description:this routr will send
*/
 router.get('/', cntrl.getTodo);
 router.post('/taskadd', cntrl.addTodo);
 router.delete('/taskdelete/:id',cntrl.deleteTodo);
 router.put('/updateStatus/:id', cntrl.updateStatusTodo);
 router.put('/markAllClick', cntrl.markAllTodo);
 router.put('/unmarkAllClick', cntrl.unmarkAllTodo);
 router.put('/activeButnClick',cntrl.activeTodo);
 router.put('/completedButnClick',cntrl.completeTodo);
 router.delete('/clearCompleteButnClick',cntrl.clearCompTodo);
 router.put('/updateTextInput/:id', cntrl.updateInputTodo);


module.exports = router;