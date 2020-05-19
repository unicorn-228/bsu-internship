var data = (function() {

  var posts = [
  {
  	id: '1',
  	description: 'sfdbgjhvhjcsvkjbdjcilvjdlkvjdflkvj',
  	createdAt: new Date('2020-03-17T23:00:00'),
  	author: 'Paziloi chelovek',
  	photoLink: 'https://i.pinimg.com/originals/d2/f6/39/d2f63991e4c40eb5b886f6f1982e91e8.png'
  },
  {
  	id: '2',
  	description: 'sdfbgfnhgmhmnbfvdcvfdbgfnhgmjmygfdsaxdcfbgfnhjmgyftbdvcdas',
  	createdAt: new Date('2020-03-17T23:00:03'),
  	author: 'Paziloi chelovek',
  	photoLink: 'https://i.pinimg.com/originals/d2/f6/39/d2f63991e4c40eb5b886f6f1982e91e8.png'
  },
  {
  	id: '3',
  	description: 'b56vy5c6t45t45y65y56y',
  	createdAt: new Date('2020-03-17T23:00:02'),
  	author: 'Paziloi chelovek',
  	photoLink: 'https://i.pinimg.com/originals/d2/f6/39/d2f63991e4c40eb5b886f6f1982e91e8.png'
  },
  {
  	id: '4',
  	description: '5v4n89cm49x3fmfc3po5pog54pomgcmpo',
  	createdAt: new Date('2020-03-17T23:00:05'),
  	author: 'Paziloi chelovek',
  	photoLink: 'https://i.pinimg.com/originals/d2/f6/39/d2f63991e4c40eb5b886f6f1982e91e8.png'
  },
  {
  	id: '5',
  	createdAt: new Date('2020-03-17T23:00:05'),
  	author: 'Paziloi chelovek',
  	photoLink: 'https://i.pinimg.com/originals/d2/f6/39/d2f63991e4c40eb5b886f6f1982e91e8.png'
  }
  ]

  function sortArrByName(array) {
  	array.sort((a,b)=> a.author > b.author ? 1 : -1);
  }
  function sortArrByDate(array) {
  	array.sort((a,b)=> a.createdAt > b.createdAt ? 1 : -1);
  }
  function sortArrByIndex(array) {
  	array.sort((a,b)=> a.id > b.id ? 1 : -1);
  }
  function validate(post) {
  	if(typeof(post)== 'object') {
  			if(typeof(post.description)== 'string' && typeof(post.id)== 'string' && typeof(post.author) == 'string' && typeof(post.createdAt) == 'object' && typeof(post.photoLink) == 'string') {
  				return true;
  			}
  		}
  		return false;
  }
  function getById(id) {
  	var result = posts.find(item => item.id == id);
  		return result;
  }
  // функция для вывода этой переменной
  return {
  	getPosts : function (filterConfig = '', skip = 0 , top = 10 )  {
  		var result = posts;
  		if(filterConfig.includes("name")) {
  			sortArrByName(result);
  		}
  		if(filterConfig.includes("date")) {
  			sortArrByDate(result);
  		}
  		if(filterConfig.includes("index") ){
  			sortArrByIndex(result);
  		}
  		var realResult = new Array();
  		if(skip < result.length) {
  			for(var i = skip ; i < skip+top && i < result.length; i+=1) {
  				console.log(result[i]);
  				realResult.push(result[i]);
  			}
  		}
  		return realResult;
  	},
  	getPost : function (id) {
  		return getById(id);
  	},
  	validatePost : function(post) {
  		return validate(post);
  	},
  	addPost : function(post) {
  		if(validate(post)) {
  			posts.push(post);
  			return true;
  		}
  		return false;
  	},
  	editPost : function(id , post) {
  		var result = getById(id);
  		if(post.description != undefined) {
  			result.description = post.description;
  		}
  		if(post.description != undefined) {
  			result.description = post.description;
  		}
  		if(validate(result)) {
  			if(posts.findIndex(item => item.id == id) != -1) {
  			 posts.splice(posts.findIndex(item => item.id == id), 1, result);
  			}
  			return true;
  		}
  		return false;
  	},
  	removePost : function (id) {
  		if(getById(id) != 1) {
  			posts.splice(posts.findIndex(item => item.id == id), 1);
  			return true;
  		}
  		return false;
  	}
  	}



})();

