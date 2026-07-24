const typesBtn = document.querySelectorAll('.exercise__type');
const headBtn = document.querySelectorAll('.head');
const bookmark = document.querySelectorAll('.card__button');
const units = document.querySelectorAll('.program__unit');
const types = document.querySelectorAll('.program__type');
const reps = document.querySelector('#reps');
const sets = document.querySelector('#sets');
const weight = document.querySelector('#weight');
const reverseBtn = document.querySelector('.button__circle--reverse');
const searchBtn = document.querySelector('.button__circle--search');
const bookmarkBtn = document.querySelector('.button__circle--bookmark');
const minus = document.querySelectorAll('.minus');
const plus = document.querySelectorAll('.plus');
const typeStr = document.querySelector('.program__type--str');
const typeHyp = document.querySelector('.program__type--hyp');
const typeEnd = document.querySelector('.program__type--end');
const programBar = document.querySelector(".program__types");
const themeBtn = document.querySelector('.button__circle--theme')
const bodyDark = document.querySelector('body');
const weightUnit = document.querySelector(".weight__unit");


themeBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    bodyDark.classList.toggle('dark');
    themeBtn.children[0].classList.toggle('selected');
    themeBtn.children[1].classList.toggle('selected');
})

types.forEach((type)=>{
    type.addEventListener('click',(e)=>{
        e.preventDefault();
        types.forEach((t)=>{
            t.classList.remove('selected');
        })
        type.classList.add('selected');
        if(type.classList.contains('program__type--hyp')){
            reps.value = 12;
            sets.value = 4;
        }
        if(type.classList.contains('program__type--str')){
            reps.value = 3;
            sets.value = 2;
        }
        if(type.classList.contains('program__type--end')){
            reps.value = 20;
            sets.value = 6;
        }
    })
})
units.forEach((unit)=>{
    unit.addEventListener('click',(e)=>{
        e.preventDefault();
        units.forEach((u)=>{
            u.classList.remove('selected');
        })
        unit.classList.toggle('selected');
        weightUnit.innerHTML = unit.classList[1].slice(15,17);
    })
})

plus.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        e.preventDefault();
        if(item.classList.contains('plus--rep') && Number(reps.value) < 100){
            reps.value = Number(reps.value) + 1;
        }
        if(item.classList.contains('plus--set') && Number(sets.value) < 100){
            sets.value = Number(sets.value) + 1;
        }
        if(item.classList.contains('plus--weight') && Number(weight.value) < 1000){
            weight.value = Number(weight.value) + 2.5;
        }
    })
})
minus.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        e.preventDefault();
        if(item.classList.contains('minus--rep') && Number(reps.value) > 1){
            reps.value = Number(reps.value) - 1;
        }
        if(item.classList.contains('minus--set') && Number(sets.value) > 1){
            sets.value = Number(sets.value) - 1;
        }
        if(item.classList.contains('minus--weight') && Number(weight.value) > 1){
            weight.value = Number(weight.value) - 2.5;
        }
    })
})




reverseBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const front = document.querySelector('.figure.front');
    const back = document.querySelector('.figure.back');
    front.classList.toggle('selected');
    back.classList.toggle('selected');
});
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    searchBtn.classList.toggle('selected');
    bookmarkBtn.classList.remove('selected');
});
bookmarkBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    bookmarkBtn.classList.toggle('selected');
    searchBtn.classList.remove('selected');
});

const buttonsSelected = (parent)=>{
    parent.forEach((child)=>{
        child.addEventListener('click',(e)=>{
            e.preventDefault();
            child.classList.toggle('selected');
        })
    })
};

buttonsSelected(typesBtn);
buttonsSelected(headBtn);
buttonsSelected(bookmark);
// circleBtn(searchBtn);
// circleBtn(bookmarkBtn);


