import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderPost } from '../templates/post.template'
export class FavoriteComponent extends Component{
    constructor(id, {loader}){
        super(id)
        this.loader=loader
    }
    init(){
        this.$el.addEventListener('click', linkClickHandler.bind(this))
    }
    onShow(){
        const favorites=JSON.parse(localStorage.getItem('favorites'))
        const html = renderList(favorites)
        this.$el.innerHTML = ''
        this.$el.insertAdjacentHTML('afterbegin', html)
    }
}

async function linkClickHandler(event){
    event.preventDefault()
    if(event.target.classList.contains('js-link')){
        const postId = event.target.textContent
        this.$el.innerHTML=''
        this.loader.show()
        const post = await apiService.fetchPostsByID(postId)
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton:false}))   
        this.$el.insertAdjacentHTML('afterbegin',`<button class="btn-back">&#129044; Назад</button>`)  
        this.$el.addEventListener('click', btnBack.bind(this))  
        this.loader.hide()       
    }
}
function renderList(list = []) {
    if(list.length){
        return `
            <ul>
                ${list.map(i=> `<li><a href="#" class="js-link">${i}</a></li>  `).join(' ')}
            </ul>
        ` 
    }  

    return `<p class="center">Вы пока ничего не добавили</p>`    
}
function btnBack(event){
    event.preventDefault()
    if(event.target.classList.contains('btn-back')){
        const favorites=JSON.parse(localStorage.getItem('favorites'))
        const html = renderList(favorites)
        this.$el.innerHTML = ''
        this.$el.insertAdjacentHTML('afterbegin', html)
    }    
}