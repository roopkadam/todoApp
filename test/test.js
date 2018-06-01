const route = require('../routes/routesTodo');
var request = require('supertest');
var expect = require('expect');
var {app} = require('../serverTodo.js');


// describe('ADD TASKS',() => {
// 	//if input is right
// 	it('With valid input',(done) => {
// 		var data ="demo";
//     request(app)
// 	    .post('/taskadd')
// 	    .send({data})
// 	    .expect(200)
// 	    .expect((res) => {
// 	    expect(res.body.todoapp).toBe(data);
// 	    })
// 	    .end(done);
//   });
//   //if input is empty
// 	it('With empty input',(done) => {
// 		var data ="";
//     request(app)
// 	    .post('/taskadd')
// 	    .send({data})
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	console.log("HUHJH",res.body)
// 	    	var tmp=res.body.todoapp
// 	    	console.log("rrrrrrrrrrrrrrr",tmp)
// 	    expect(res.body.todoapp).toBe();
// 	    })
// 	    .end(done);
//   });
// });



// describe('DELETE TASKS',() => {
// 	//if input is right
// 	it('With valid input',(done) => {
// 		var id =1527746601510;
// 		request(app)
// 		.delete('/taskdelete/' + id)	
// 		.expect(200)
// 		.expect((res) => {
// 			var deleteTemp =id;
// 			var deleteTemp2;
// 			deleteTemp2 = deleteTemp;
// 			expect(deleteTemp).toBe(id)
// 		})
// 		.end(done);
// 	});
// });



// describe('UPDATE TASKS',() => {
// 	it('With valid input',(done) => {
// 		var id =1527829697222;
//     request(app)
// 	    .put('/updateStatus/' + id)
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	var tmp = res.body;
// 				var tmp2;
// 				for(i=0; i<tmp.length; i++) {
// 					tmp2 = tmp[i].status;
// 				}
// 				console.log("fffffffffffff",tmp2)
// 			  expect(tmp2).toBe(false);
// 	    })
// 	    .end(done);
//   });
// });


// describe('MARKALL TASKS',() => {
// 	//if input is right
// 	it('With valid input',(done) => {
// 		var data ="demo";
//     request(app)
// 	    .put('/markAllClick')
// 	    .send({data})
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	var tmp = res.body;
// 	    	var tmp2;
// 	    	for(i=0; i<tmp.length; i++) {
// 					tmp2 = tmp[i].status;
// 				}
// 				console.log(tmp2)
// 	    	 expect(tmp2).toBe(true);
// 	    	})
// 	    .end(done);
//   });
// });


// describe('UNMARKALL TASKS',() => {
// 	//if input is right
// 	it('With valid input',(done) => {
// 		var data ="demo";
//     request(app)
// 	    .put('/unmarkAllClick')
// 	    .send({data})
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	var tmp = res.body;
// 	    	var tmp2;
// 	    	for(i=0; i<tmp.length; i++) {
// 					tmp2 = tmp[i].status;
// 				}
// 				console.log(tmp2)
// 	    	 expect(tmp2).toBe(false);
// 	    	})
// 	    .end(done);
//   });
// });


// describe('ACTIVE TASKS',() => {
// 	it('With valid input',(done) => {
//     request(app)
// 	    .put('/activeButnClick')
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	var temp = res.body;
// 	    	 expect(res.body).toBe(temp);
// 	    	})
// 	    .end(done);
//   });
// });


// describe('COMPLETED TASKS',() => {
// 	it('With valid input',(done) => {
//     request(app)
// 	    .put('/completedButnClick')
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	var temp = res.body;
// 	    	 expect(res.body).toBe(temp);
// 	    	})
// 	    .end(done);
//   });
// });


// describe('CLEAR COMPLETED TASKS',() => {
// 	it('With valid input',(done) => {
// 		request(app)
// 		.put('/completedButnClick')
// 		.expect(200)
// 		.expect((res) => {
// 			var temp = res.body;
// 			expect(res.body).toBe(temp);
// 		})
// 		.end(done);
// 	});
// });


// describe('UPDATE TASKS ON ENTER CLICK',() => {
// 	it('With valid input',(done) => {
// 		var data="demoooooo";
// 		var id=1527829697222;

// 		request(app)
// 		.put('/updateTextInput/' + id)
// 		.send({data})
// 		.expect(200)
// 		.expect((res) => {
// 			var temp = data;
// 			expect(temp).toBe(data);
// 		})
// 		.end(done);
// 	});
// });
