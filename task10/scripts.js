

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
    description: 'azazazaza',
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


getSize() {
	return this._posts.length;
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
  		if(post.photoLink != undefined) {
  			result.photoLink = post.photoLink;
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
  		if(this._getById(id)) {
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


class ViewContent {
	
	constructor(postCollectionToView) {
		this._collection = postCollectionToView;
	}
	refreshPost(post) {
		let ind = post.id;
		let element = document.querySelector("#post-"+ind.toString());
		element.querySelector(".postHead").textContent = post.author.toString() + " " + post.createdAt.toString();
		element.querySelector(".text").textContent = post.description.toString();
		element.querySelector(".post-photo-img").setAttribute("src" , post.photoLink.toString());
	}
	addElementToPage(post) {
		if(post == undefined) return false;
		let newElement = document.importNode(document.getElementById('post-blackpaper'), true).content;
		//newElement.querySelector(".postHead").textContent = post.author.toString() + " " + post.createdAt.toString();
		//newElement.querySelector(".text").textContent = post.description.toString();
		newElement.querySelector(".post").id = "post-"+post.id.toString();
		let element = document.getElementById('allPosts').appendChild(newElement);
		this.refreshPost(post);
	}
	_removePostByIndex(ind) {
		let temp = document.getElementById("post-"+ind.toString());
		if(temp == undefined) return false;
		document.querySelector("#allPosts").removeChild(temp);
		return true;
	}
	viewPosts(filterConfig = '' , skip=0 , top=5 ) {
		this._collection.getPosts(filterConfig , skip , top).forEach(elem => this._collection.validatePost(elem) ? this.addElementToPage(elem):undefined);
	}
	removeAll() {
		this._collection._posts.forEach(elem => this._removePostByIndex(elem.id));
	}
	removePost(ind) {
		this._removePostByIndex(ind);
	}
	setUser(username) {
		document.querySelector(".username-text").textContent = username.toString() + " напишите новость";
    this.username = username;
	}
}

var p = new PostCollection();
var v = new ViewContent(p);
var howMuchPostsButtonWillAdd = 3;
var numberOfPostsOnPage = 0;
var searchName = '';

function viewFooter () {
  document.querySelector(".footer")[0].hidden = false;
}
function addPost(post) {
	if(p.addPost(post)) {
		//v.addElementToPage(post);
		return true;
	}
	return false;
}
function hideAllPosts() {
  v.removeAll();
  numberOfPostsOnPage = 0;
}
function viewMore() {
	if(numberOfPostsOnPage <= p.getSize()) {
		v.viewPosts(searchName.toString() , numberOfPostsOnPage , numberOfPostsOnPage + howMuchPostsButtonWillAdd);
		numberOfPostsOnPage += howMuchPostsButtonWillAdd;
		return true;
	}
  document.getElementById('loadmoreButton').hidden = true;
	return false;
}
function refreshPosts() {
  hideAllPosts();
  document.getElementById('loadmoreButton').hidden = false;
  viewMore();
}
function applySearch() {
  let name = document.getElementById("selectFilter").value;

  //if(name == "по имени") {
  //  searchName = "name";
 // }
  if(name == "по дате") {
    searchName = "date";
  }
  if(name == "по индексу") {
    searchName = "index";
  }
  refreshPosts();
  hideSearchBox();
}
function viewSearchBox () {
  document.getElementById("search").hidden = false;
  document.getElementById("applySearchBtn").addEventListener('click' , applySearch);
}
function hideSearchBox () {
document.getElementById("search").hidden = true;
}
function postButtonActivity () {
  let post =new Object();
  post.description = document.getElementById('textareaPost').value.toString();
  post.author = v.username.toString();
  post.createdAt = new Date();
  post.id = (p.getSize()+1).toString();
  post.photoLink = document.getElementById('addPost-photoLink').value.toString();
  console.log(addPost(post));
  refreshPosts();
  hideAddPostBox();
  saveAllThisStuff();
}
function showAddPostBox () {
  document.querySelector('#addPost').hidden = false;
  document.getElementById("postButton").addEventListener('click' , postButtonActivity);
}
function hideAddPostBox () {
   document.querySelector('#addPost').hidden = true;
}
function viewStartPage() {
  let newElement = document.importNode(document.getElementById('tempLoadMoreBtn'), true).content;
  document.getElementById('loadmoreBtnInsert').appendChild(newElement);
	viewMore();
  document.getElementById('loadmoreButton').addEventListener('click' , viewMore);
  document.getElementById("searchButton").addEventListener('click' , viewSearchBox);
  document.getElementById("nameButton").addEventListener('click' , showAddPostBox);
}
function removePost(index) {
	if(p.removePost(index.toString())) {
		v.removePost(index.toString());
		return true;
    }
    return false;
}
function editPost(ind , post) {
	if(p.editPost(ind.toString() , post)) {
		v.refreshPost(p.getPost(ind.toString()));
		return true;
	}
	return false;
} 
function setUser(username) {
	v.setUser(username);
}

function loginButton() {
  setUser(document.querySelector(".loginForm-text").value.toString());
  hideLoginPage();
  viewStartPage();
  saveAllThisStuff();
}
function hideLoginPage() {
  document.getElementById("loginForm").hidden = true;
}
function viewLoginPage() {
  document.getElementById("loginForm").hidden = false;
  document.querySelector(".loginForm-button").addEventListener('click'  , loginButton);
}
function saveAllThisStuff () {
  let posts = JSON.stringify( p._posts);
  localStorage.setItem("posts" , posts);
  let usename = JSON.stringify( v.username);
  localStorage.setItem("username" , usename);
}
function loadAllThisStuff () {
  //let posts = JSON.parse(localStorage.getItem("posts"));
   let nam = JSON.parse(localStorage.getItem("username"));
 // if(posts) {
 //   p._posts = posts;
 //   p = new PostCollection(posts);
 //   v = new ViewContent(p);
 //   console.log("lol");
//  }
  if(nam) {
    v.username = nam;
    setUser(nam);
    viewStartPage();
  } else {
    viewLoginPage();
  }
}

loadAllThisStuff();
//viewLoginPage();

//viewStartPage();
//setUser("superDead");