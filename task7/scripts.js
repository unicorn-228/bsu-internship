

class PostCollection {

  constructor(array  = undefined) {
    if(toString.call(array).includes('Array')) {
      this._posts = array;
    } else {

  	this._posts = [
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
}
}


  _sortArrByName(array) {
  	array.sort((a,b)=> a.author > b.author ? 1 : -1);
  }
  _sortArrByDate(array) {
  	array.sort((a,b)=> a.createdAt > b.createdAt ? 1 : -1);
  }
  _sortArrByIndex(array) {
  	array.sort((a,b)=> a.id > b.id ? 1 : -1);
  }
  _validate(post) {
  	if(typeof(post)== 'object') {
  			if(typeof(post.description)== 'string' && typeof(post.id)== 'string' && typeof(post.author) == 'string' && typeof(post.createdAt) == 'object' && typeof(post.photoLink) == 'string') {
  				return true;
  			}
  		}
  		return false;
  }
  _getById(id) {
  	let result = this._posts.find(item => item.id == id);
  		return result;
  }



  	getPosts (filterConfig = '', skip = 0 , top = 10 )  {
  		let result = this._posts;
  		if(filterConfig.includes("name")) {
  			this._sortArrByName(result);
  		}
  		if(filterConfig.includes("date")) {
  			this._sortArrByDate(result);
  		}
  		if(filterConfig.includes("index") ){
  			this._sortArrByIndex(result);
  		}
  		let realResult = new Array();
  		if(skip < result.length) {
  			for(let i = skip ; i < skip+top && i < result.length; i+=1) {
  				console.log(result[i]);
  				realResult.push(result[i]);
  			}
  		}
  		return realResult;
  	}
  	getPost  (id) {
  		return this._getById(id);
  	}
  	validatePost (post) {
  		return this._validate(post);
  	}
  	addPost (post) {
  		if(this._validate(post)) {
  			this._posts.push(post);
  			return true;
  		}
  		return false;
  	}
  	editPost (id , post) {
  		let result = this._getById(id);
  		if(post.description != undefined) {
  			result.description = post.description;
  		}
  		if(post.description != undefined) {
  			result.description = post.description;
  		}
  		if(this._validate(result)) {
  			if(this._posts.findIndex(item => item.id == id) != -1) {
  			 this._posts.splice(this._posts.findIndex(item => item.id == id), 1, result);
  			}
  			return true;
  		}
  		return false;
  	}
  	removePost  (id) {
  		if(this._getById(id) != 1) {
  			this._posts.splice(this._posts.findIndex(item => item.id == id), 1);
  			return true;
  		}
  		return false;
  	}
    addAll(array) {
      let returnArray = new Array();
      for(let item in array) {
          if(this.addPost(item) == false) {
            returnArray.push(item);
          }
      }
      return returnArray;
    }
    clear() {
      this._posts = new Array();
    }
}
