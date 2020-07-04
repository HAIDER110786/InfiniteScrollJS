let currentPage = 1 ;
let currentPosts = 0;
window.onload = getPosts();

function getPosts(){
    axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=5`)
    .then(res=>{
        res.data.forEach(post => {
            const currentPost = document.createElement('div');
            currentPost.className = 'individual_post';
            currentPost.innerHTML = `
            <div id="post_title">${post.title}</div>
            <div id="post_body">${post.body}</div>
            `
            document.querySelector('.posts').appendChild(currentPost);
        });
    })
    currentPosts+=5;
}

document.addEventListener('scroll',()=>{
    if(currentPosts<100){
        if(document.body.clientHeight===Math.floor(window.innerHeight+pageYOffset) || document.body.clientHeight===Math.ceil(window.innerHeight+pageYOffset)){
            currentPage++;
            document.querySelector('.postStatus').innerHTML=`
            <div class="lds-hourglass"></div>
            `
            getPosts();
        }
        else if(document.body.clientHeight - Math.floor(window.innerHeight+pageYOffset) < 50 || document.body.clientHeight - Math.ceil(window.innerHeight+pageYOffset) < 50){
            currentPage++;
            document.querySelector('.postStatus').innerHTML=`
            <div class="lds-hourglass"></div>
            `
            getPosts();
        }
    }
    else{
        document.querySelector('.postStatus').style.padding = '5px';
        document.querySelector('.postStatus').innerHTML=`
        <center>No more Posts</center>
        `
    }
});