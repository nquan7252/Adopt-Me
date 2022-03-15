document.querySelector('#form').addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(e.target[0].value)
})
console.log('hi')