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
const calenderBtn = document.querySelectorAll(".calender__btn");
const typesBtnDayWeek = document.querySelectorAll('.type__btn');
const muscles = document.querySelectorAll('.muscle');
const exerciseHeads = document.querySelector('.exercise__heads');
const nmbr = document.querySelector('.number--head');
const exerciseName = document.querySelector('.exercise__muscle');
const exercisesContainer = document.querySelector('.exercise__list');
const exercisesNumber = document.querySelector('.exercises__number');
const BASE_URL = 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0';
const endpoint = `${BASE_URL}/api/en/exercises.json`; 
const savedExercises = document.querySelector('.dropdown');
const chosenExercise = document.querySelector('.exercise__choice--name');
const chosenExerciseWeight = document.querySelector('.choice__weight--number');
const chosenExerciseSets = document.querySelector('.exercise__info--sets');
const chosenExerciseReps = document.querySelector('.exercise__info--reps');
const searchBar = document.querySelector('.search');
const searchBarContainer = document.querySelector('.search__bar');
const searchFilter = document.querySelector('.search__filter');
let muscleName = null; 
let muscleHead = null;
let exerciseType = null;
let exerciseList = [];
let savedExerciseList = [];
let n = 0;

async function fetchGymExercises() {
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const exercises = await response.json();
    exerciseList = exercises.exercises;
  } catch (error) {
    console.error('Failed to load database resource:', error);
  }
    
}

fetchGymExercises();
//dark theme  
themeBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    bodyDark.classList.toggle('dark');
    themeBtn.children[0].classList.toggle('selected');
    themeBtn.children[1].classList.toggle('selected');
})

// reverse figure button
reverseBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const front = document.querySelector('.figure.front');
    const back = document.querySelector('.figure.back');
    front.classList.toggle('selected');
    back.classList.toggle('selected');
    muscleHead = null;
    muscleName = null;
    exerciseType = null;
    exerciseName.innerText ='Muscle';
    exerciseHeads.innerHTML = '';
    nmbr.textContent = '';
    renderExercises();
});
function bookmarkElementsSelect (){
    savedExercises.addEventListener('click',(e)=>{
        const element = e.target.closest('.dropdown__element');
        if(!element) return;
        const txt = element.textContent; 
        chosenExercise.textContent = txt.split('-')[1];
        bookmarkBtn.classList.remove('selected');
    })
}
function searchBarValuesSelect (){
    searchFilter.addEventListener('click',(e)=>{
        const item = e.target.closest('.filter__item');
        if(!item) return;
        chosenExercise.textContent = item.textContent;
        searchBtn.classList.remove('selected');
        searchBarContainer.classList.remove('selected');
        searchBar.value = '';
        searchFilter.innerHTML = '';
        searchBar.classList.remove('focused');
    })  
}
function searchBarValues (){
    searchBar.addEventListener('input',()=>{
        if(!searchBar.value){
            searchBar.classList.remove('focused');
            searchFilter.innerHTML = '';
        }else{
            searchBar.classList.add('focused');
            const match = exerciseList.filter(ex => ex.name.toLowerCase().includes(searchBar.value.toLowerCase()));
            searchFilter.innerHTML = match.map(ex =>`<li class="filter__item">${ex.name}</li>`)
            .join('');
        }
    })
}
// search button on the program section
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const icon = e.target.closest('.icon');
    if(icon){
    searchBtn.classList.toggle('selected');
    searchBarContainer.classList.toggle('selected');
    bookmarkBtn.classList.remove('selected');
    }
});

//program type bar
types.forEach((type)=>{
    type.addEventListener('click',(e)=>{
        e.preventDefault();
        types.forEach((t)=>{
            t.classList.remove('selected');
        })
        type.classList.toggle('selected');
        if(type.classList.contains('program__type--hyp')){
            reps.value = 12;
            sets.value = 4;
            chosenExerciseReps.textContent = 12;
            chosenExerciseSets.textContent = 4;
            (sets,reps).dispatchEvent(new Event('input', {bubbles: true}));
        }
        if(type.classList.contains('program__type--str')){
            reps.value = 3;
            sets.value = 2;
            chosenExerciseReps.textContent = 3;
            chosenExerciseSets.textContent = 2;
            (sets,reps).dispatchEvent(new Event('input', {bubbles: true}));
        }
        if(type.classList.contains('program__type--end')){
            reps.value = 20;
            sets.value = 6;
            chosenExerciseReps.textContent = 20;
            chosenExerciseSets.textContent = 6;
            (sets,reps).dispatchEvent(new Event('input', {bubbles: true}));
        }
    })
})
function exerciseInfo (){
    weight.addEventListener('input',e=>{
        chosenExerciseWeight.textContent = e.target.value;
    });
    sets.addEventListener('input',e=>{
        chosenExerciseSets.textContent = e.target.value;
    });
    reps.addEventListener('input',e=>{
        chosenExerciseReps.textContent = e.target.value;
    });
}
//program weight unit
units.forEach((unit)=>{
    unit.addEventListener('click',(e)=>{
        e.preventDefault();
        units.forEach((u)=>{
            u.classList.remove('selected');
        })
        unit.classList.toggle('selected');
        weight.value = 0;
    })
})

plus.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        e.preventDefault();
        if(item.classList.contains('plus--rep') && Number(reps.value) < 100){
            reps.value = Number(reps.value) + 1;
        reps.dispatchEvent(new Event('input', {bubbles: true}));
        }
        if(item.classList.contains('plus--set') && Number(sets.value) < 100){
            sets.value = Number(sets.value) + 1;
        sets.dispatchEvent(new Event('input', {bubbles: true}));
        }
        if(item.classList.contains('plus--weight') && Number(weight.value) < 1000){
            if(document.querySelector('.program__unit--kg').classList.contains('selected')){
                weight.value = Number(weight.value) + 2.5;
            }else{
                weight.value = Number(weight.value) + 1.5;
            }
            weight.dispatchEvent(new Event('input', {bubbles: true}));
        }
    })
})
minus.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        e.preventDefault();
        if(item.classList.contains('minus--rep') && Number(reps.value) > 1){
            reps.value = Number(reps.value) - 1;
        reps.dispatchEvent(new Event('input', {bubbles: true}));
        }
        if(item.classList.contains('minus--set') && Number(sets.value) > 1){
            sets.value = Number(sets.value) - 1;
        sets.dispatchEvent(new Event('input', {bubbles: true}));
        }
        if(item.classList.contains('minus--weight') && Number(weight.value) > 1){
            if(document.querySelector('.program__unit--kg').classList.contains('selected')){
                weight.value = Number(weight.value) - 2.5;
            }else{
                weight.value = Number(weight.value) - 1.5;
            }
            weight.dispatchEvent(new Event('input', {bubbles: true}));
        }
    })
})

typesBtnDayWeek.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
    e.preventDefault();
    typesBtnDayWeek.forEach(b=>{
        b.classList.remove('selected');
    });
    btn.classList.toggle('selected');})
})



typesBtn.forEach((child) => {
    child.addEventListener('click', (e) => {
        e.preventDefault();
        const isAlreadySelected = child.classList.contains('selected');
        typesBtn.forEach(btn => btn.classList.remove('selected'));
        if (!isAlreadySelected) {
            child.classList.add('selected');
            exerciseType = child.classList[1].slice(16);
        }else{
        exerciseType = '';
        }
        renderExercises ();
    });
});

const buttonsSelected = (parent)=>{
    parent.forEach((child)=>{
        child.classList.remove('selected');
        child.addEventListener('click',(e)=>{
            e.preventDefault();
            child.classList.toggle('selected');
        })
    })
};

buttonsSelected(calenderBtn);


muscles.forEach(muscle =>{
    muscle.addEventListener('click',(e)=>{
        e.preventDefault();
        let n = 0;
        const isAlreadySelected = muscle.classList.contains('selected');
        muscles.forEach(m => m.classList.remove('selected'));
        if(!isAlreadySelected){
            muscle.classList.add('selected');
            if(muscle.classList.contains("forearm--back")){           
            exerciseName.innerText ='Forearm';
            exerciseHeads.innerHTML = 
            `<button class="head head-${n+=1} brach">brachioradialis</button><button class="head head-${n+=1} flexor">flexors</button><button class="head head-${n+=1} extensor">extensors</button><button class="head head-${n+=1} pronator">pronator</button>`;
            nmbr.textContent = `(${n})`;
            muscleName ='forearms' ;
            }
            if(muscle.classList.contains("muscle__legs--back")){
                exerciseName.innerText ='Legs';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} medius">medius</button><button class="head head-${n+=1} maximus">maximus</button>
                <button class="head head-${n+=1} hams">hams</button><button class="head head-${n+=1} quads">quads</button>
                <button class="head head-${n+=1} adductor">adductors</button><button class="head head-${n+=1} abductor">abductors</button>
                <button class="head head-${n+=1} gastro">gastrocnemius</button><button class="head head-${n+=1} soleus">soleus</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='legs';
            }
            if(muscle.classList.contains("triceps--back")){
                exerciseName.innerText ='Triceps';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} longh">long head</button><button class="head head-${n+=1} lateralh">lateral head</button><button class="head head-${n+=1} medial">medial head</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='triceps'; ; 
            }
            if(muscle.classList.contains("shoulder--back")){           
                exerciseName.innerText ='Shoulder';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} front">front</button><button class="head head-${n+=1} lateral">lateral</button><button class="head head-${n+=1} rear">rear</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='Shoulders' ;  
            }
            if(muscle.classList.contains("muscle__back")){           
                exerciseName.innerText ='Back';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} traps">traps</button><button class="head head-${n+=1} terres">terres major</button><button class="head head-${n+=1} lats">lats</button>
                <button class="head head-${n+=1} erector">erector</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='back';
            }

            if(muscle.classList.contains("chest")){
                exerciseName.innerText ='Chest';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} upper">upper</button><button class="head head-${n+=1} middle">middle</button><button class="head head-${n+=1} lower">lower</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='chest';
            }
            if(muscle.classList.contains("neck")){           
                exerciseName.innerText ='Neck';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} neck">neck</button><button class="head head-${n+=1} stern">stern</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='neck';
            }
            if(muscle.classList.contains("traps--front")){
                exerciseName.innerText ='Traps';
                nmbr.textContent = `(1)`;
                muscleName ='traps';
            }
            if(muscle.classList.contains("shoulder--front")){
                exerciseName.innerText ='shoulder';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} front">front</button><button class="head head-${n+=1} lateral">lateral</button><button class="head head-${n+=1} rear">rear</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='shoulders';
            }
            if(muscle.classList.contains("core")){
                exerciseName.innerText ='Core';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} rectusabs">rectus abs</button><button class="head head-${n+=1} external">external obliques</button><button class="head head-${n+=1} internal">internal obliques</button><button class="head head-${n+=1} transabs">transverse abs</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='core';
            }
            if(muscle.classList.contains("forearm--front")){           
                exerciseName.innerText ='Forearms';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} brac">brachioradialis</button><button class="head head-${n+=1} flexor">flexors</button><button class="head head-${n+=1} extensor">extensors</button><button class="head head-${n+=1} pronator">pronator</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='forearms';
            }
            if(muscle.classList.contains("muscle__legs--front")){
                exerciseName.innerText ='Legs';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} medius">medius</button><button class="head head-${n+=1} maximus">maximus</button>
                <button class="head head-${n+=1} hams">hams</button><button class="head head-${n+=1} quads">quads</button>
                <button class="head head-${n+=1} adductor">adductors</button><button class="head head-${n+=1} abductor">abductors</button>
                <button class="head head-${n+=1} gastro">gastrocnemius</button><button class="head head-${n+=1} soleus">soleus</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='legs';
            }
            if(muscle.classList.contains("triceps--front")){
                exerciseName.innerText ='Triceps';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} longh">long head</button><button class="head head-${n+=1} lateralh">lateral head</button><button class="head head-${n+=1} medial">medial head</button>`;
                nmbr.textContent = `(${n})`;
                muscleName ='triceps'; 
            }
            if(muscle.classList.contains("biceps")){
                exerciseName.innerText ='Biceps';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} longh">long head</button><button class="head head-${n+=1} shorth">short head</button>`;
                nmbr.textContent = `(${n})`;
                muscleName = exerciseName.innerText.toLowerCase();
            }
            renderExercises ();
        }else{
                exerciseName.innerText = 'Muscle';
                exerciseHeads.innerHTML = '';
                nmbr.textContent = '';
                muscleName = null;
                muscleHead = null;
                exercisesContainer.innerHTML = "";
                exercisesNumber.innerHTML = "";
            }
})
})
exerciseHeads.addEventListener('click',(e)=>{
    e.preventDefault();
    const btn = e.target.closest('.head');
    const isAlreadySelected = btn.classList.contains('selected');
    document.querySelectorAll('.head').forEach(e=>e.classList.remove('selected'));
    if(!isAlreadySelected){
        btn.classList.add('selected');
        muscleHead = btn.classList[2];
    }
    else{
        muscleHead = '';
    }
    renderExercises();
})
bookmarkBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const icon = e.target.closest('.icon');
    if(icon){
    bookmarkBtn.classList.toggle('selected');
    searchBtn.classList.remove('selected');
    searchBarContainer.classList.remove('selected');
    }
})
function customiseDropdownElement (){
    savedExercises.addEventListener("click",(e)=>{
        e.preventDefault();
        const item = e.target.closest('.dropdown__element');
        if (!item) return;
        const id = item.dataset.id;
        const exercise = savedExerciseList.find(ex => ex.id === id);
        chosenExercise.textContent = exercise.name;
    })
}
function renderDropdown(){
    savedExercises.innerHTML = savedExerciseList
        .map((item, index) => 
            `<p class="dropdown__element" data-id="${item.id}">${index + 1} - ${item.name}</p>`
        ).join('');
}
function dropdownExercises (){
    exercisesContainer.addEventListener('click',(e)=>{
        e.preventDefault();
        const bookmark = e.target.closest('.card__button--bookmark');
        if(!bookmark){
            return;
        }
        const isAlreadySelected = bookmark.classList.contains('selected');
        const card = e.target.closest('.list__card');
        const name = card.querySelector('.exercise__name').textContent;
        if(!isAlreadySelected){
            const id = crypto.randomUUID();
            bookmark.classList.add('selected');
            bookmark.dataset.savedId = id;
            savedExerciseList.push({id,name});
            savedExercises.insertAdjacentHTML('beforeend',`<p class="dropdown__element" data-id="${id}">${name}</p>`);
        }else{
            const id = bookmark.dataset.savedId;
            bookmark.classList.remove('selected');
            savedExerciseList = savedExerciseList.filter(item => item.id !== id);
            savedExercises.querySelector(`[data-id="${id}"]`)?.remove();
        }
        renderDropdown();
    })
}
function renderExercises (){
    exercisesContainer.innerHTML = "";
    let filtered ;
        filtered = exerciseList.filter(e=>{
            if(muscleName == 'biceps'){
                return e.muscle == 'biceps';
            }if(muscleName == 'triceps'){
                return e.muscle == 'triceps';
            }if(muscleName == 'forearms'){
                return e.muscle == 'forearms';
            }if(muscleName == 'traps'){
                return e.muscle == 'traps';
            }if(muscleName == 'neck'){
                return e.muscle == 'levator-scapulae';
            }else{
                return e.bodyPart == muscleName;
            }
        }
        );
    if(muscleHead){
        filtered = filtered.filter((e) =>{
            //chest
            if(muscleHead == 'upper'){
                return e.name.toLowerCase().includes('incline');
            }if(muscleHead == 'lower'){
                return e.name.toLowerCase().includes('decline');
            }if(muscleHead == 'middle'){
                return !e.name.toLowerCase().includes('incline') && !e.name.toLowerCase().includes('decline');
            }
            //legs
            if(muscleHead == 'quads'){
                return e.muscle == 'quads';
            }if(muscleHead == 'hams'){
                return e.muscle == 'hamstrings';
            }if(muscleHead == 'adductors'){
                return e.muscle == 'adductors';
            }if(muscleHead == 'abductors'){
                return e.muscle == 'abductors';
            }if(muscleHead == 'soleus'){
                return e.muscle == 'calves' && e.name.toLowerCase().includes('seated');
            }if(muscleHead == 'gastro'){
                return e.muscle == 'calves' && !e.name.toLowerCase().includes('seated');
            }
            if(muscleHead == 'gastro'){
                return e.muscle == 'calves' && !e.name.toLowerCase().includes('seated');
            }
            if (muscleHead == 'maximus') {
                return e.muscle == 'glutes' && (    
                    e.name.toLowerCase().includes('squat') ||
                    e.name.toLowerCase().includes('deadlift') ||
                    e.name.toLowerCase().includes('bridge') ||
                    e.name.toLowerCase().includes('thrust') ||
                    e.name.toLowerCase().includes('lunge') ||
                    e.name.toLowerCase().includes('step up') ||
                    e.name.toLowerCase().includes('extension') ||
                    e.name.toLowerCase().includes('kickback') ||
                    e.name.toLowerCase().includes('pull through') ||
                    e.name.toLowerCase().includes('press') ||
                    e.name.toLowerCase().includes('swing')
                );
            }   
            if (muscleHead == 'medius') {
                return e.muscle == 'glutes' && (
                    e.name.toLowerCase().includes('rotation') ||
                    e.name.toLowerCase().includes('lateral') ||
                    e.name.toLowerCase().includes('side') ||
                    e.name.toLowerCase().includes('monster walk') ||
                    e.name.toLowerCase().includes('abduction') ||
                    e.name.toLowerCase().includes('curtsy') ||
                    e.name.toLowerCase().includes('outside leg') ||
                    e.name.toLowerCase().includes('inside leg')
                );
            }
            //core
            if (muscleHead == 'external') {
                return e.muscle == 'abs' && (
                    e.name.toLowerCase().includes('side bend') ||
                    e.name.toLowerCase().includes('side plank') ||
                    e.name.toLowerCase().includes('pallof') ||
                    e.name.toLowerCase().includes('windmill') ||
                    e.name.toLowerCase().includes('wood chop') ||
                    e.name.toLowerCase().includes('woodchopper') ||
                    e.name.toLowerCase().includes('lateral') ||
                    e.name.toLowerCase().includes('oblique crunch')
                );
            }
            if (muscleHead == 'internal') {
                return e.muscle == 'abs' && (
                    e.name.toLowerCase().includes('twist') ||
                    e.name.toLowerCase().includes('twisting') ||
                    e.name.toLowerCase().includes('bicycle') ||
                    e.name.toLowerCase().includes('air bike') ||
                    e.name.toLowerCase().includes('russian') ||
                    e.name.toLowerCase().includes('cross body') ||
                    e.name.toLowerCase().includes('elbow to knee') ||
                    e.name.toLowerCase().includes('wiper')
                );
            }
            if (muscleHead == 'rectus') {
                return e.muscle == 'abs' && (
                    e.name.toLowerCase().includes('crunch') ||
                    e.name.toLowerCase().includes('sit up') ||
                    e.name.toLowerCase().includes('leg raise') ||
                    e.name.toLowerCase().includes('knee raise') ||
                    e.name.toLowerCase().includes('v up') ||
                    e.name.toLowerCase().includes('jackknife') ||
                    e.name.toLowerCase().includes('toe touch') ||
                    e.name.toLowerCase().includes('heel touch')
                );
            }
            if (muscleHead == 'transverse') {
                return e.muscle == 'abs' && (
                    e.name.toLowerCase().includes('plank') ||
                    e.name.toLowerCase().includes('rollerout') ||
                    e.name.toLowerCase().includes('rollout') ||
                    e.name.toLowerCase().includes('dead bug') ||
                    e.name.toLowerCase().includes('hollow') ||
                    e.name.toLowerCase().includes('vacuum') ||
                    e.name.toLowerCase().includes('flutter kick') ||
                    e.name.toLowerCase().includes('bird dog')
                );
            }
            //forearms
            if (muscleHead == 'brac') {
                return (e.muscle == 'biceps' || e.muscle == 'forearms') && (
                    e.name.toLowerCase().includes('hammer') ||
                    e.name.toLowerCase().includes('reverse') ||
                    e.name.toLowerCase().includes('zottman') ||
                    e.name.toLowerCase().includes('neutral') ||
                    e.name.toLowerCase().includes('cross body')
                );
            }
            if (muscleHead == 'extensor') {
                return (e.muscle == 'forearms' || e.muscle == 'biceps') && (
                    e.name.toLowerCase().includes('reverse wrist curl') ||
                    e.name.toLowerCase().includes('palms down') ||
                    e.name.toLowerCase().includes('wrist extension')
                );
            }
            if (muscleHead == 'flexor') {
                return (e.muscle == 'forearms' || e.muscle == 'biceps') && (
                    (e.name.toLowerCase().includes('wrist curl') && 
                    !e.name.toLowerCase().includes('reverse')) ||
                    e.name.toLowerCase().includes('palms up') ||
                    e.name.toLowerCase().includes('finger curl') ||
                    e.name.toLowerCase().includes('wrist flexion')
                );
            }
            if (muscleHead == 'pronator') {
                return (e.muscle == 'forearms' || e.muscle == 'biceps') && (
                    e.name.toLowerCase().includes('pronation') ||
                    e.name.toLowerCase().includes('neutral wrist curl') ||
                    e.name.toLowerCase().includes('rotate') ||
                    e.name.toLowerCase().includes('pronated')
                );
            }
            //biceps
            if (muscleHead == 'long') {
                return e.muscle == 'biceps' && (
                    e.name.toLowerCase().includes('incline') ||
                    e.name.toLowerCase().includes('close grip') ||
                    e.name.toLowerCase().includes('narrow') ||
                    e.name.toLowerCase().includes('drag') ||
                    e.name.toLowerCase().includes('cross body')
                );
            }
            if (muscleHead == 'short') {
                return e.muscle == 'biceps' && (
                    e.name.toLowerCase().includes('preacher') ||
                    e.name.toLowerCase().includes('spider') ||
                    e.name.toLowerCase().includes('concentration') ||
                    e.name.toLowerCase().includes('wide grip') ||
                    e.name.toLowerCase().includes('inner') ||
                    e.name.toLowerCase().includes('overhead') ||
                    e.name.toLowerCase().includes('high curl')
                );
            }
            //triceps
            if (muscleHead == 'long') {
                return e.muscle == 'triceps' && (
                    e.name.toLowerCase().includes('overhead') ||
                    e.name.toLowerCase().includes('behind head') ||
                    e.name.toLowerCase().includes('french press') ||
                    e.name.toLowerCase().includes('kickback')
                );
            }
            if (muscleHead == 'medial') {
                return e.muscle == 'triceps' && (
                    e.name.toLowerCase().includes('reverse grip') ||
                    e.name.toLowerCase().includes('reverse') ||
                    e.name.toLowerCase().includes('supinated') ||
                    e.name.toLowerCase().includes('palms in') ||
                    e.name.toLowerCase().includes('neutral grip')
                );
            }
            if (muscleHead == 'lateral') {
                return e.muscle == 'triceps' && (
                    e.name.toLowerCase().includes('pushdown') ||
                    e.name.toLowerCase().includes('skullcrusher') ||
                    e.name.toLowerCase().includes('skull crusher') ||
                    e.name.toLowerCase().includes('close grip') ||
                    e.name.toLowerCase().includes('dip') ||
                    e.name.toLowerCase().includes('tate press') ||
                    e.name.toLowerCase().includes('diamond')
                );
            }
            //shoulders
            if (muscleHead == 'front') {
                return e.muscle == 'delts' && (
                    e.name.toLowerCase().includes('front raise') ||
                    e.name.toLowerCase().includes('shoulder press') ||
                    e.name.toLowerCase().includes('military press') ||
                    e.name.toLowerCase().includes('arnold press') ||
                    e.name.toLowerCase().includes('overhead press') ||
                    e.name.toLowerCase().includes('push press') ||
                    e.name.toLowerCase().includes('cuban press')
                );
            }
            if (muscleHead == 'lateral') {
                return e.muscle == 'delts' && (
                    e.name.toLowerCase().includes('lateral raise') ||
                    e.name.toLowerCase().includes('side raise') ||
                    e.name.toLowerCase().includes('upright row') ||
                    e.name.toLowerCase().includes('y raise') ||
                    e.name.toLowerCase().includes('iron cross')
                );
            }
            if (muscleHead == 'rear') {
                return e.muscle == 'delts' && (
                    e.name.toLowerCase().includes('rear delt') ||
                    e.name.toLowerCase().includes('reverse fly') ||
                    e.name.toLowerCase().includes('rear fly') ||
                    e.name.toLowerCase().includes('rear lateral') ||
                    e.name.toLowerCase().includes('t raise') ||
                    e.name.toLowerCase().includes('skier')
                );
            }
            //neck
            if (muscleHead == 'neck') {
                return (e.muscle == 'levator-scapulae' || e.muscle == 'traps') && (
                    e.name.toLowerCase().includes('neck') ||
                    e.name.toLowerCase().includes('head') ||
                    e.name.toLowerCase().includes('nod')
                );
            }
            if (muscleHead == 'stern') {
                return (e.muscle == 'levator-scapulae' || e.muscle == 'traps') && (
                    e.name.toLowerCase().includes('neck side') ||
                    e.name.toLowerCase().includes('side push neck') ||
                    e.name.toLowerCase().includes('neck flex') ||
                    e.name.toLowerCase().includes('neck rotation')
                );
            //back
            }if (muscleHead == 'traps') {
                return (e.muscle == 'traps' || e.muscle == 'upper-back') && (
                    e.name.toLowerCase().includes('shrug') ||
                    e.name.toLowerCase().includes('upright row') ||
                    e.name.toLowerCase().includes('face pull') ||
                    e.name.toLowerCase().includes('y raise') ||
                    e.name.toLowerCase().includes('scapular')
                );
            }
            if (muscleHead == 'terres') {
                return (e.muscle == 'lats' || e.muscle == 'upper-back') && (
                    e.name.toLowerCase().includes('teres') ||
                    e.name.toLowerCase().includes('straight arm pulldown') ||
                    e.name.toLowerCase().includes('kayak') ||
                    e.name.toLowerCase().includes('wide grip pulldown') ||
                    e.name.toLowerCase().includes('close grip pulldown')
                );
            }
            if (muscleHead == 'lats') {
                return e.muscle == 'lats' && (
                    e.name.toLowerCase().includes('pulldown') ||
                    e.name.toLowerCase().includes('pull up') ||
                    e.name.toLowerCase().includes('chin up') ||
                    e.name.toLowerCase().includes('row') ||
                    e.name.toLowerCase().includes('pullover') ||
                    e.name.toLowerCase().includes('lat')
                );
            }
            if (muscleHead == 'erector') {
                return (e.muscle == 'spine' || e.bodyPart == 'back') && (
                    e.name.toLowerCase().includes('hyperextension') ||
                    e.name.toLowerCase().includes('back extension') ||
                    e.name.toLowerCase().includes('good morning') ||
                    e.name.toLowerCase().includes('superman') ||
                    e.name.toLowerCase().includes('deadlift') ||
                    e.name.toLowerCase().includes('reverse hyper')
                );
            }
        })
    }


    if(exerciseType){
        filtered = filtered.filter((e) =>{
            if (exerciseType == 'body'){
                return e.equipment == 'bodyweight' || e.equipment == 'other';
            }
            if (exerciseType == 'free'){
                return e.equipment == 'barbell' || e.equipment == 'ez-bar' || e.equipment == 'kettlebell' || e.equipment == 'sled' || e.equipment == 'band';
            }
            if (exerciseType == 'machine'){
                return e.equipment == 'machine' || e.equipment == 'cable' || e.equipment == 'lever' || e.equipment == 'smith';
            }
        })     
    }

    exercisesNumber.innerText = `(${filtered.length})`;
    filtered.forEach((ce, index) =>{
        let g = index + 1;
        exercisesContainer.innerHTML +=
        `<div class="list__card list__card--n${g}">
            <div class="card__text">
                <h2 class="exercise__name">${ce.name}</h2>
                <p class="exercise__number">${ce.equipment.charAt(0).toUpperCase() + ce.equipment.slice(1)}</p>
                <p class="exercise__number">(${g}/${filtered.length})</p>
            </div>
            <div class="card__buttons">
                <button class="card__button card__button--bookmark"><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 640 640"><path d="M192 64C156.7 64 128 92.7 128 128L128 544C128 555.5 134.2 566.2 144.2 571.8C154.2 577.4 166.5 577.3 176.4 571.4L320 485.3L463.5 571.4C473.4 577.3 485.7 577.5 495.7 571.8C505.7 566.1 512 555.5 512 544L512 128C512 92.7 483.3 64 448 64L192 64z"/></svg></button>
                <button class="card__button--play"><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 640 640"><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg></button>
            </div>
        </div>`;   
    })

}
searchBarValuesSelect();
searchBarValues ();
dropdownExercises();
customiseDropdownElement();
exerciseInfo();
bookmarkElementsSelect ();

