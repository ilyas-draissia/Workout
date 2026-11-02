const typesBtn = document.querySelectorAll('.exercise__type');
const typesBtnCardio = document.querySelector('.exercise__type--cardio');
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
const themeBtn = document.querySelector('.button__circle--theme')
const bodyDark = document.querySelector('body');
const muscles = document.querySelectorAll('.muscle');
const exerciseHeads = document.querySelector('.exercise__heads');
const nmbr = document.querySelector('.number--head');
const exerciseName = document.querySelector('.exercise__muscle');
const exercisesContainer = document.querySelector('.exercise__list');
const exercisesNumber = document.querySelector('.exercises__number');
const BASE_URL = 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0';
const endpoint = `${BASE_URL}/api/en/exercises.json`; 
const savedExercises = document.querySelector('.dropdown');
const chosenExercise = document.querySelector('.choice__exercise');
const chosenExerciseName = document.querySelector('.exercise__choice--name');
const chosenExerciseWeight = document.querySelector('.choice__weight--number');
const chosenExerciseSets = document.querySelector('.exercise__info--sets');
const chosenExerciseReps = document.querySelector('.exercise__info--reps');
const searchBar = document.querySelector('.search');
const searchBarContainer = document.querySelector('.search__bar');
const searchFilter = document.querySelector('.search__filter');
const addBtn = document.querySelector('.edit__add');
const visualTable = document.querySelector('.visual__table');
const programStatus = document.querySelector('.finish__text');
const finishDownloadBtn = document.querySelector('.finish__download');
const nameProgram = document.querySelector('.edit__name');
const tableLogo = document.querySelector('.table__logo');
const dialog = document.querySelector('.dialog__pop');
const dialogClose = document.querySelector('.dialog__close');
const typeName = document.querySelector('.type--name');
const programBtnPlay = document.querySelector('.edit__play');

let muscleName = null; 
let muscleHead = null;
let exerciseType = null;
let exerciseList = [];
let savedExerciseList = [];
let visualExercises = [];
let n = 0;

//data fetching from api
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
    if(typesBtnCardio.classList.contains('selected')){
        front.classList.toggle('selected');
        back.classList.toggle('selected');
    }else{
        console.log('object');
        front.classList.toggle('selected');
        back.classList.toggle('selected');
        muscleHead = null;
        muscleName = null;
        exerciseType = null;
        exerciseName.innerText ='Muscle';
        exerciseHeads.innerHTML = '';
        nmbr.textContent = '';
        typeName.textContent = 'Ex: S = Stretch';
        typeName.classList.add('selected');
        muscles.forEach(m => m.classList.remove('selected'));
        typesBtn.forEach(b =>b.classList.remove('selected'));
        typesBtn.forEach(b =>b.classList.remove('active'));
        exerciseHeads.classList.remove('selected');
    }
    renderExercises();
});

//select bookmark elements 
function bookmarkElementsSelect (){
    savedExercises.addEventListener('click',(e)=>{
        const element = e.target.closest('.dropdown__element');
        if(!element) return;
        const txt = element.textContent; 
        chosenExerciseName.textContent = txt.split('-')[1];
        bookmarkBtn.classList.remove('selected');
        chosenExercise.classList.add('selected');
        addBtn.classList.add('selected');
        programBtnPlay.classList.add('selected');
    })
};

//select search bar result elements 
function searchBarValuesSelect (){
    searchFilter.addEventListener('click',(e)=>{
        const item = e.target.closest('.filter__item');
        if(!item) return;
        chosenExerciseName.textContent = item.textContent;
        chosenExerciseName.dataset.image = item.dataset.image;
        chosenExerciseName.dataset.inst = item.dataset.inst;
        searchBtn.classList.remove('selected');
        searchBarContainer.classList.remove('selected');
        searchBar.value = '';
        searchFilter.innerHTML = '';
        searchBar.classList.remove('focused');
        chosenExercise.classList.add('selected'); 
        addBtn.classList.add('selected');
        programBtnPlay.classList.add('selected');    
    })  
};

//search bar filter elements 
function searchBarValues (){
    searchBar.addEventListener('input',()=>{
        if(!searchBar.value){
            searchBar.classList.remove('focused');
            searchFilter.innerHTML = '';
        }else{
            searchBar.classList.add('focused');
            const match = exerciseList.filter(ex => ex.name.toLowerCase().includes(searchBar.value.toLowerCase()));
            searchFilter.innerHTML = match.map(ex =>`<li class="filter__item" data-image="${ex.gifUrl}" data-inst="${ex.instructions}">${ex.name}</li>`)
            .join('');
        }
    })
};

// search button on the program section
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const icon = e.target.closest('.icon');
    if(icon){
        searchBtn.classList.toggle('selected');
        searchBarContainer.classList.toggle('selected');
        bookmarkBtn.classList.remove('selected');
        searchBar.value = '';
        searchFilter.innerHTML = '';
    }
});

//program type of reps and sets bar
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
            document.querySelector('.input__number--sets').classList.remove('err');
            document.querySelector('.input__number--reps').classList.remove('err');
        }
        if(type.classList.contains('program__type--str')){
            reps.value = 3;
            sets.value = 2;
            chosenExerciseReps.textContent = 3;
            chosenExerciseSets.textContent = 2;
            (sets,reps).dispatchEvent(new Event('input', {bubbles: true}));
            document.querySelector('.input__number--sets').classList.remove('err');
            document.querySelector('.input__number--reps').classList.remove('err');
        }
        if(type.classList.contains('program__type--end')){
            reps.value = 20;
            sets.value = 6;
            chosenExerciseReps.textContent = 20;
            chosenExerciseSets.textContent = 6;
            (sets,reps).dispatchEvent(new Event('input', {bubbles: true}));
            document.querySelector('.input__number--sets').classList.remove('err');
            document.querySelector('.input__number--reps').classList.remove('err');
        }
        types.forEach((t)=>{
            t.classList.remove('mute');
        })
        document.querySelector('.minus--rep').classList.remove('selected');
        document.querySelector('.minus--set').classList.remove('selected');
        document.querySelector('.plus--rep').classList.remove('selected');
        document.querySelector('.plus--set').classList.remove('selected');
    })
});

//enetering the exercise values regarding reps, sets and weight
function exerciseInfo (){
    weight.addEventListener('input',()=>{
        if(weight.value === "0" || weight.value === ""){
            chosenExerciseWeight.textContent = '-';
            weight.value = "0";
        }else{
            chosenExerciseWeight.textContent = weight.value;
        }
    });
    sets.addEventListener('input',()=>{
        if(sets.value === "0" || sets.value === "" ){
            chosenExerciseSets.textContent = '-';
        }else{
            chosenExerciseSets.textContent = sets.value;
            document.querySelector('.input__number--sets').classList.remove('err');
        }
    });
    reps.addEventListener('input',()=>{
        if(reps.value === "0" || reps.value === "" ){
            chosenExerciseReps.textContent = '-';
        }else{
            chosenExerciseReps.textContent = reps.value;
            document.querySelector('.input__number--reps').classList.remove('err');
        }
    });
};

//program weight units bar
units.forEach((unit)=>{
    unit.addEventListener('click',(e)=>{
        e.preventDefault();
        units.forEach((u)=>{
            u.classList.remove('selected');
        })
        unit.classList.toggle('selected');
        weight.value = 0;
        chosenExerciseWeight.innerHTML = '-';
    })
});

//plus button for the input
plus.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        e.preventDefault();
        const itemClass = item.classList; 
        if(itemClass.contains('plus--rep') && Number(reps.value) < 100){
            reps.value = Number(reps.value) + 1;
            reps.dispatchEvent(new Event('input', {bubbles: true}));
            reps.focus();
            document.querySelector('.input__number--reps').classList.remove('err');
            types.forEach(t => t.classList.add('mute'));
        }
        if(itemClass.contains('plus--set') && Number(sets.value) < 100){
            sets.value = Number(sets.value) + 1;
            sets.dispatchEvent(new Event('input', {bubbles: true}));
            sets.focus();
            document.querySelector('.input__number--sets').classList.remove('err');
            types.forEach(t => t.classList.add('mute'));
        }
        if(itemClass.contains('plus--weight') && Number(weight.value) < 1000){
            if(document.querySelector('.program__unit--kg').classList.contains('selected')){
                weight.value = Number(weight.value) + 2.5;
            }else{
                weight.value = Number(weight.value) + 1.5;
            }
            weight.dispatchEvent(new Event('input', {bubbles: true}));
            weight.focus();
        }
    })
});

//minus button for the input
minus.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        e.preventDefault();
        const itemClass = item.classList; 
        if(itemClass.contains('minus--rep') && Number(reps.value) > 1){
            if(reps.value == 1){return;}
            reps.value = Number(reps.value) - 1;
            reps.dispatchEvent(new Event('input', {bubbles: true}));
            reps.focus();
            document.querySelector('.input__number--sets').classList.remove('err');
            types.forEach(t => t.classList.add('mute'));
        }
        if(itemClass.contains('minus--set') && Number(sets.value) > 1){
            if(sets.value == 1){return;}
            sets.value = Number(sets.value) - 1;
            sets.dispatchEvent(new Event('input', {bubbles: true}));
            sets.focus();
            document.querySelector('.input__number--sets').classList.remove('err');
            types.forEach(t => t.classList.add('mute'));
        }
        if(itemClass.contains('minus--weight') && Number(weight.value) > 1){
            if(document.querySelector('.program__unit--kg').classList.contains('selected')){
                weight.value = Number(weight.value) - 2.5;
            }else{
                weight.value = Number(weight.value) - 1.5;
            }
            weight.dispatchEvent(new Event('input', {bubbles: true}));
            weight.focus();
        }
    })
});

//type of exercise
typesBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isAlreadySelected = btn.classList.contains('selected');
        typesBtn.forEach(b =>{b.classList.remove('selected')});
        if (exerciseName.textContent == 'Muscle'){
            return;
        }else{
            if (!isAlreadySelected){
                btn.classList.add('selected');
                exerciseType = btn.classList[1].slice(16);
                typeName.innerText = btn.classList[2];
                typeName.classList.remove('selected');
            }else{
                exerciseType = '';
                typeName.innerText = 'Ex: S = Stretch';
                typeName.classList.add('selected');
            }
            renderExercises ();
        }
    });
});

//cardio type button 
typesBtnCardio.addEventListener('click',(e)=>{
    e.preventDefault();
    const isAlreadySelected = typesBtnCardio.classList.contains('selected');
        muscles.forEach(m => m.classList.remove('selected'));
    if(!isAlreadySelected){
        muscleHead = null;
        typesBtnCardio.classList.add('selected');
        muscleHead = 'cardio';
        muscleName = 'cardio';
        typeName.classList.remove('selected');
        typeName.innerText = 'Cardio';
        exerciseName.textContent = 'Cardio';
        nmbr.innerText = '';
        exerciseHeads.innerHTML = '';
        exerciseHeads.classList.remove('selected');
        typesBtn.forEach(e =>{e.classList.remove('active')});
        muscles.forEach(e =>{e.classList.add('selected')});
    }else{
        typesBtnCardio.classList.remove('selected');
        typeName.classList.add('selected');
        typeName.innerText = 'Ex: S = Stretch';
        exerciseName.textContent = 'Muscle';
        muscleName = null;
        muscleHead = null;
        exercisesContainer.innerHTML = "";
        exercisesNumber.innerHTML = "";
    }
    renderExercises();
});
//input focus
function focusFunction (){
    weight.addEventListener('focus',function(e){
        e.preventDefault();
        this.classList.toggle('selected');
        document.querySelector('.minus--weight').classList.toggle('selected');
        document.querySelector('.plus--weight').classList.toggle('selected');
        
    })
    reps.addEventListener('focus',function(e){
        e.preventDefault();
        this.classList.add('selected');
        document.querySelector('.minus--rep').classList.add('selected');
        document.querySelector('.plus--rep').classList.add('selected');
        
    })
    sets.addEventListener('focus',function(e){
        e.preventDefault();
        this.classList.add('selected');
        document.querySelector('.minus--set').classList.add('selected');
        document.querySelector('.plus--set').classList.add('selected');
        
    })
};

//input blur
function blurFunction (){
    weight.addEventListener('blur',function(e){
        e.preventDefault();
        this.classList.remove('selected');
        document.querySelector('.minus--weight').classList.remove('selected');
        document.querySelector('.plus--weight').classList.remove('selected');
        
    })
    reps.addEventListener('blur',function(e){
        e.preventDefault();
        this.classList.remove('selected');
        document.querySelector('.minus--rep').classList.remove('selected');
        document.querySelector('.plus--rep').classList.remove('selected');
        
    })
    sets.addEventListener('blur',function(e){
        e.preventDefault();
        this.classList.add('selected');
        document.querySelector('.minus--set').classList.remove('selected');
        document.querySelector('.plus--set').classList.remove('selected');
        
    })
};

//preview display on the program maker
function popupShowProgram (){
    programBtnPlay.addEventListener('click',(e)=>{
        if(chosenExerciseName.textContent == '------'){        
            return ;
        }else{
            e.preventDefault();
            const exName = dialog.querySelector('.exercise__name--play');
            const exInst = dialog.querySelector('.exercise__instructions--play');
            if(!chosenExerciseName.innerText === '------'){
                return ;
            }
            else{
                dialog.showModal();
                const img = dialog.querySelector('.image__play');
                img.setAttribute('src',chosenExerciseName.dataset.image);
                exName.innerText = chosenExerciseName.textContent;
                const ggg = chosenExerciseName.dataset.inst.split(/,(?=[A-Z\b])/);
                exInst.innerText = ggg.map((item, index) => `${index + 1}- ${item.trim()}`).join('\n');
                if(dialog.hasAttribute("open")){
                    dialog.addEventListener('click',(e)=>{
                        if(e.target === dialog){
                            dialog.close();
                        }
                    })
                    dialogClose.addEventListener('click',(e)=>{
                        e.preventDefault();
                        dialog.close();
                    })
                }
            }
        }
    })
};

//preview display 
function popupShow (){
    exercisesContainer.addEventListener('click',(e)=>{
        e.preventDefault();
        const play =  e.target.closest('.card__button--play');
        if(!play){
            return;
        }
        const selected = play.classList.contains('selected');
        const exName = dialog.querySelector('.exercise__name--play');
        const exInst = dialog.querySelector('.exercise__instructions--play');
        if(!selected){
            play.classList.add('selected');
            dialog.showModal();
            const img = dialog.querySelector('.image__play');
            img.setAttribute('src',play.dataset.image);
            exName.innerText = play.dataset.name;
            exInst.innerText = play.dataset.inst;
            if(dialog.hasAttribute("open")){
                dialog.addEventListener('click',(e)=>{
                if(e.target === dialog){
                    dialog.close();
                    play.classList.remove('selected');
                }
                })
                dialogClose.addEventListener('click',(e)=>{
                e.preventDefault();
                dialog.close();
                play.classList.remove('selected')})
        }}
    })
};

//muscle heads
muscles.forEach(muscle =>{
    muscle.addEventListener('click',(e)=>{
        e.preventDefault();
        let n = 0;
        const isAlreadySelected = muscle.classList.contains('selected');
        muscles.forEach(m => m.classList.remove('selected'));
        if(!isAlreadySelected || (isAlreadySelected && typeName.innerText == 'Cardio')){
            typesBtnCardio.classList.remove('selected');
            typeName.classList.add('selected');
            typeName.innerText = 'Ex: S = Stretch';
            exerciseName.textContent = 'Muscle';
            muscleName = null;
            muscleHead = null;
            exercisesContainer.innerHTML = "";
            exercisesNumber.innerHTML = "";
            muscle.classList.add('selected');
            exerciseHeads.classList.add('selected');
            typesBtn.forEach(b =>{b.classList.add('active')});
            if(muscle.classList.contains("forearm--back")){           
            exerciseName.innerText ='Forearm';
            exerciseHeads.innerHTML = 
            `<button class="head head-${n+=1} brach">brachioradialis</button><button class="head head-${n+=1} flexor">flexors</button><button class="head head-${n+=1} extensor">extensors</button><button class="head head-${n+=1} pronator">pronator</button>`;
            nmbr.textContent = ` (${n})`;
            muscleName ='forearms' ;
            }
            if(muscle.classList.contains("muscle__legs--back")){
                exerciseName.innerText ='Legs';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} medius">medius</button><button class="head head-${n+=1} maximus">maximus</button>
                <button class="head head-${n+=1} hams">hams</button><button class="head head-${n+=1} quads">quads</button>
                <button class="head head-${n+=1} adductor">adductors</button><button class="head head-${n+=1} abductor">abductors</button>
                <button class="head head-${n+=1} gastro">gastrocnemius</button><button class="head head-${n+=1} soleus">soleus</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='legs';
            }
            if(muscle.classList.contains("triceps--back")){
                exerciseName.innerText ='Triceps';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} longh">long head</button><button class="head head-${n+=1} lateralh">lateral head</button><button class="head head-${n+=1} medial">medial head</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='triceps'; ; 
            }
            if(muscle.classList.contains("shoulder--back")){           
                exerciseName.innerText ='Shoulder';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} front">front</button><button class="head head-${n+=1} lateral">lateral</button><button class="head head-${n+=1} rear">rear</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='Shoulders' ;  
            }
            if(muscle.classList.contains("muscle__back")){           
                exerciseName.innerText ='Back';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} traps">traps</button><button class="head head-${n+=1} terres">terres major</button><button class="head head-${n+=1} lats">lats</button>
                <button class="head head-${n+=1} erector">erector</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='back';
            }

            if(muscle.classList.contains("chest")){
                exerciseName.innerText ='Chest';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} serratus-anterior">serratus-anterior</button><button class="head head-${n+=1} upper">upper</button><button class="head head-${n+=1} middle">middle</button><button class="head head-${n+=1} lower">lower</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='chest';
            }
            if(muscle.classList.contains("muscle__neck")){           
                exerciseName.innerText ='Neck';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} neck">neck</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='neck';
            }
            if(muscle.classList.contains("shoulder--front")){
                exerciseName.innerText ='shoulder';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} front">front</button><button class="head head-${n+=1} lateral">lateral</button><button class="head head-${n+=1} rear">rear</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='shoulders';
            }
            if(muscle.classList.contains("core")){
                exerciseName.innerText ='Core';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} rectus">rectus abs</button><button class="head head-${n+=1} external">external obliques</button><button class="head head-${n+=1} internal">internal obliques</button><button class="head head-${n+=1} trans">transverse abs</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='core';
            }
            if(muscle.classList.contains("forearm--front")){           
                exerciseName.innerText ='Forearms';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} brac">brachioradialis</button><button class="head head-${n+=1} flexor">flexors</button><button class="head head-${n+=1} extensor">extensors</button><button class="head head-${n+=1} pronator">pronator</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='forearms';
            }
            if(muscle.classList.contains("muscle__legs--front")){
                exerciseName.innerText ='Legs';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} medius">medius</button><button class="head head-${n+=1} maximus">maximus</button>
                <button class="head head-${n+=1} hams">hams</button><button class="head head-${n+=1} quads">quads</button>
                <button class="head head-${n+=1} adductor">adductors</button><button class="head head-${n+=1} abductor">abductors</button>
                <button class="head head-${n+=1} gastro">gastrocnemius</button><button class="head head-${n+=1} soleus">soleus</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='legs';
            }
            if(muscle.classList.contains("triceps--front")){
                exerciseName.innerText ='Triceps';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} long">long head</button><button class="head head-${n+=1} lateral">lateral head</button><button class="head head-${n+=1} medial">medial head</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName ='triceps'; 
            }
            if(muscle.classList.contains("biceps")){
                exerciseName.innerText ='Biceps';
                exerciseHeads.innerHTML = 
                `<button class="head head-${n+=1} long">long head</button><button class="head head-${n+=1} short">short head</button>`;
                nmbr.textContent = ` (${n})`;
                muscleName = 'biceps';
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
            typesBtn.forEach(b =>{b.classList.remove('active')});
            typesBtn.forEach(b =>{b.classList.remove('selected')});
            exerciseHeads.classList.remove('selected');
            renderExercises ();
        }
})
})

//select a muscle 
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
});

//bookmark button list 
bookmarkBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const icon = e.target.closest('.icon');
    if(icon && savedExerciseList.length > 0){
        bookmarkBtn.classList.toggle('selected');
        searchBtn.classList.remove('selected');
        searchBarContainer.classList.remove('selected');
        searchBar.value = '';
        searchFilter.innerHTML = '';
    }
});

//bookmark counter icon 
function bookmarkIconStack (){
    const secondIcon = document.querySelector('.icon--more');
    const firstIcon = document.querySelector('.icon--empty');
    if(savedExerciseList.length > 0){
        secondIcon.style.display = 'block';
        firstIcon.style.transform = 'translateX(-1px) translateY(1px)';
        firstIcon.style.filter = 'drop-shadow(1.5px -1px 0px var(--bg))';
    }else{
        secondIcon.style.display = 'none';
        firstIcon.style.transform = 'translateX(0) translateY(0)';
        firstIcon.style.filter = 'none';
        bookmarkBtn.classList.remove('selected');
    }
}

//customize the chosen exercise 
function customiseDropdownElement (){
    savedExercises.addEventListener("click",(e)=>{
        e.preventDefault();
        const item = e.target.closest('.dropdown__element');
        if (!item) return;
        const id = item.dataset.id;
        const exercise = savedExerciseList.find(ex => ex.id === id);
        chosenExerciseName.textContent = exercise.name;
        chosenExerciseName.dataset.image = exercise.gif;
        chosenExerciseName.dataset.inst = exercise.inst;
    })
};

//add the element to the dropdown menu 
function renderDropdown(){
    savedExercises.innerHTML = savedExerciseList
        .map((item, index) => 
            `<p class="dropdown__element" data-id="${item.id}" data-image="${item.gif} data-inst="${item.inst}">${index + 1} - ${item.name}</p>`
        ).join('');
};

//add the element to the array of bookmarked element 
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
        const gif = card.querySelector('.card__button--play').dataset.image;
        const inst = card.querySelector('.card__button--play').dataset.inst;
        if(!isAlreadySelected){
            const id = crypto.randomUUID();
            bookmark.classList.add('selected');
            bookmark.dataset.savedId = id;
            savedExerciseList.push({id,name,gif,inst});
            savedExercises.insertAdjacentHTML('beforeend',`<p class="dropdown__element" data-id="${id}">${name}</p>`);
        }else{
            const id = bookmark.dataset.savedId;
            bookmark.classList.remove('selected');
            savedExerciseList = savedExerciseList.filter(item => item.id !== id);
            savedExercises.querySelector(`[data-id="${id}"]`)?.remove();
        }
        bookmarkIconStack();
        renderDropdown();
    })
};

//dispaly exercise based on the conditions (muscles, type, head)
function renderExercises (){
    exercisesContainer.innerHTML = '';
    let filtered ;
        filtered = exerciseList.filter(e=>{
            if(muscleName == 'biceps'){
                return e.muscle == 'biceps';
            }if(muscleName == 'triceps'){
                return e.muscle == 'triceps';
            }if (muscleName == 'forearms') {
                return e.muscle == 'forearms' ||
                    (e.muscle == 'biceps' && (
                            e.name.toLowerCase().includes('hammer') ||
                            e.name.toLowerCase().includes('reverse') ||
                            e.name.toLowerCase().includes('zottman') ||
                            e.name.toLowerCase().includes('neutral wrist curl') ||
                            e.name.toLowerCase().includes('cross body')
                        )
                    );
            }if(muscleName == 'neck'){
                return e.muscle == 'levator-scapulae';
            }if(muscleName == 'cardio'){
                return e.muscle == 'cardio';
            }else{
                return e.bodyPart == muscleName;
            }
        }
        );
    if(muscleHead){
        filtered = filtered.filter((e) =>{
            const name = e.name.toLowerCase();
            //chest
            if (muscleHead == 'serratus-anterior') {
                return e.muscle == 'serratus-anterior';
            }
            if (muscleHead == 'upper') {
                return e.muscle == 'pectorals' && (
                    name.includes('incline') ||
                    name.includes('low fly') ||
                    name.includes('upper chest') ||
                    name.includes('reverse grip')
                );
            }

            if (muscleHead == 'middle') {
                return e.muscle === 'pectorals' && e.secondaryMuscles.includes('pectorals') &&(
                    name.includes('flat') ||
                    name.includes('bench press') ||
                    name.includes('push up') ||
                    (!name.includes('incline') && 
                        !name.includes('decline') && 
                        !name.includes('dip') && 
                        !name.includes('pullover') && 
                        !name.includes('low fly'))
                );
            }
            if (muscleHead == 'lower') {
                return e.muscle == 'pectorals' && (
                    name.includes('decline') ||
                    name.includes('dip') ||
                    name.includes('pullover')
                );
            }
            //legs
            if (muscleHead == 'quads'){
                return e.muscle == 'quads';
            }
            if (muscleHead == 'hams'){
                return e.muscle == 'hamstrings';
            }
            if (muscleHead == 'adductor'){
                return e.muscle == 'adductors';
            }
            if (muscleHead == 'abductor'){
                return e.muscle == 'abductors';
            }
            if (muscleHead == 'soleus'){
                return e.muscle == 'calves' &&
                    name.includes('seated') &&
                        (
                            name.includes('calf raise') ||
                            name.includes('calf press')
                        );
            }
            if (muscleHead == 'gastro'){
                return e.muscle == 'calves' &&
                    !name.includes('seated') &&
                    !name.includes('reverse calf raise') &&
                    !name.includes('toe raise') &&
                    !name.includes('ankle circles');
            }
            if (muscleHead == 'maximus') {
                return e.muscle == 'glutes' && (    
                    name.includes('squat') ||
                    name.includes('deadlift') ||
                    name.includes('bridge') ||
                    name.includes('thrust') ||
                    name.includes('lunge') ||
                    name.includes('step up') ||
                    name.includes('extension') ||
                    name.includes('kickback') ||
                    name.includes('pull through') ||
                    name.includes('press') ||
                    name.includes('swing')
                );
            }   
            if (muscleHead == 'medius') {
                return e.muscle == 'glutes' && (
                    name.includes('rotation') ||
                    name.includes('lateral') ||
                    name.includes('side') ||
                    name.includes('monster walk') ||
                    name.includes('abduction') ||
                    name.includes('curtsy') ||
                    name.includes('outside leg') ||
                    name.includes('inside leg')
                );
            }
            //core
            if (muscleHead == 'external') {
                return e.muscle == 'abs' && (
                    name.includes('twist') ||
                    name.includes('twisting') ||
                    name.includes('side bend') ||
                    name.includes('side plank') ||
                    name.includes('pallof') ||
                    name.includes('windmill') ||
                    name.includes('wood chop') ||
                    name.includes('woodchopper') ||
                    name.includes('lateral') ||
                    name.includes('oblique crunch')||
                    name.includes('plank') ||
                    name.includes('l-sit') ||
                    name.includes('dead bug')
                );
            }
            if (muscleHead == 'internal') {
                return e.muscle == 'abs' && (
                    name.includes('twist') ||
                    name.includes('twisting') ||
                    name.includes('side bend') ||
                    name.includes('bicycle') ||
                    name.includes('air bike') ||
                    name.includes('pallof') ||
                    name.includes('russian') ||
                    name.includes('cross body') ||
                    name.includes('elbow to knee') ||
                    name.includes('wiper')||
                    name.includes('plank') ||
                    name.includes('l-sit') ||
                    name.includes('dead bug') 
                );
            }
            if (muscleHead == 'rectus') {
                return e.muscle == 'abs' && (
                    name.includes('crunch') ||
                    name.includes('sit up') ||
                    name.includes('leg raise') ||
                    name.includes('knee raise') ||
                    name.includes('v up') ||
                    name.includes('jackknife') ||
                    name.includes('toe touch') ||
                    name.includes('heel touch')||
                    name.includes('plank') ||
                    name.includes('l-sit') ||
                    name.includes('dead bug')
                );
            }
            if (muscleHead == 'trans') {
                return e.muscle == 'abs' && (
                    name.includes('plank') ||
                    name.includes('rollerout') ||
                    name.includes('rollout') ||
                    name.includes('dead bug') ||
                    name.includes('hollow') ||
                    name.includes('vacuum') ||
                    name.includes('flutter kick') ||
                    name.includes('bird dog')||
                    name.includes('leg raise') ||
                    name.includes('knee raise') ||
                    name.includes('reverse crunch')||
                    name.includes('plank') ||
                    name.includes('l-sit') ||
                    name.includes('dead bug')  
                );
            }
            //forearms
            if (muscleHead == 'brac') {
                return (e.muscle == 'biceps' || e.muscle == 'forearms') && (
                    name.includes('hammer') ||
                    name.includes('reverse') ||
                    name.includes('zottman') ||
                    name.includes('neutral') ||
                    name.includes('cross body')
                );
            }
            if (muscleHead == 'extensor') {
                return (e.muscle == 'forearms' || e.muscle == 'biceps') && (
                    name.includes('reverse wrist curl') ||
                    name.includes('palms down') ||
                    name.includes('wrist extension')
                );
            }
            if (muscleHead == 'flexor') {
                return (e.muscle == 'forearms' || e.muscle == 'biceps') && (
                    (name.includes('wrist curl') && 
                    !name.includes('reverse')) ||
                    name.includes('palms up') ||
                    name.includes('finger curl') ||
                    name.includes('wrist flexion')
                );
            }
            if (muscleHead == 'pronator') {
                return (e.muscle == 'forearms' || e.muscle == 'biceps') && (
                    name.includes('pronation') ||
                    name.includes('neutral wrist curl') ||
                    name.includes('rotate') ||
                    name.includes('pronated')
                );
            }
            //biceps
            if (muscleHead == 'long') {
                if(muscleName == 'biceps'){
                    return e.muscle == 'biceps' && (
                        name.includes('incline') ||
                        name.includes('close grip') ||
                        name.includes('narrow') ||
                        name.includes('drag') ||
                        name.includes('overhead') ||
                        name.includes('cross body')
                    );
                }else{
                    return e.muscle == 'triceps' && (
                        name.includes('overhead') ||
                        name.includes('behind head') ||
                        name.includes('french press') ||
                        name.includes('kickback')||
                        name.includes('skull crusher') ||
                        name.includes('lying')
                    );
                }
            }
            if (muscleHead == 'short') {
                return e.muscle == 'biceps' && (
                    name.includes('preacher') ||
                    name.includes('spider') ||
                    name.includes('concentration') ||
                    name.includes('wide grip') ||
                    name.includes('inner') ||
                    name.includes('high curl')
                );
            }
            if (muscleHead == 'medial') {
                return e.muscle == 'triceps' && (
                    name.includes('reverse grip') ||
                    name.includes('reverse') ||
                    name.includes('supinated') ||
                    name.includes('palms in') ||
                    name.includes('neutral grip')||
                    name.includes('close grip') 
                );
            }
            if (muscleHead == 'lateral' && muscleName == 'triceps') {
                return e.muscle == 'triceps' && (
                    name.includes('pushdown') ||
                    name.includes('skullcrusher') ||
                    name.includes('skull crusher') ||
                    name.includes('close grip') ||
                    name.includes('dip') ||
                    name.includes('tate press') ||
                    name.includes('diamond')||
                    name.includes('pressdown') ||
                    name.includes('kickback')
                );
            }
            //shoulders
            if (muscleHead == 'front') {
                return e.muscle == 'delts' && (
                    name.includes('front') ||
                    name.includes('shoulder') ||
                    name.includes('military') ||
                    name.includes('arnold') ||
                    name.includes('overhead') ||
                    name.includes('push') ||
                    name.includes('cuban')
                );
            }
            if (muscleHead == 'lateral' && muscleName == 'shoulders') {
                return e.muscle == 'delts' && (
                    name.includes('lateral raise') ||
                    name.includes('side raise') ||
                    name.includes('upright row') ||
                    name.includes('y raise') ||
                    name.includes('iron cross')
                );
            }
            if (muscleHead == 'rear') {
                return e.muscle == 'delts' && (
                    name.includes('rear') ||
                    name.includes('reverse') ||
                    name.includes('face pull') ||
                    name.includes('t raise') ||
                    name.includes('skier')
                );
            }
            //back
            if (muscleHead == 'traps') {
                return (e.muscle == 'traps' || e.muscle == 'upper-back') && (
                    name.includes('shrug') ||
                    name.includes('upright row') ||
                    name.includes('face pull') ||
                    name.includes('y raise') ||
                    name.includes('scapular')
                );
            }
            if (muscleHead == 'terres') {
                return (e.muscle == 'lats' || e.muscle == 'upper-back') && (
                    name.includes('teres') ||
                    name.includes('straight arm pulldown') ||
                    name.includes('kayak') ||
                    name.includes('wide grip pulldown') ||
                    name.includes('close grip pulldown')
                );
            }
            if (muscleHead == 'lats') {
                return e.muscle == 'lats' && (
                    name.includes('pulldown') ||
                    name.includes('pull up') ||
                    name.includes('chin up') ||
                    name.includes('row') ||
                    name.includes('pullover') ||
                    name.includes('lat')
                );
            }
            if (muscleHead == 'erector') {
                return (e.muscle == 'spine' || e.bodyPart == 'back') && (
                    name.includes('hyperextension') ||
                    name.includes('back extension') ||
                    name.includes('good morning') ||
                    name.includes('superman') ||
                    name.includes('deadlift') ||
                    name.includes('reverse hyper')
                );
            }
            //cardio
            if (muscleHead == 'cardio') {
                return e.muscle == 'cardio' || e.bodyPart == 'cardio' || e.category == 'cardio';
            }
        })
    }


    if(exerciseType){
        filtered = filtered.filter((e) =>{
            if (exerciseType == 'body'){
                return e.equipment == 'bodyweight' || e.equipment == 'other';
            }
            if (exerciseType == 'free'){
                return e.equipment == 'dumbbell' || e.equipment == 'barbell' || e.equipment == 'ez-bar' || e.equipment == 'kettlebell' || e.equipment == 'sled' ;
            }
            if (exerciseType == 'machine'){
                return e.equipment == 'machine' || e.equipment == 'cable' || e.equipment == 'lever' || e.equipment == 'smith';
            }
            if (exerciseType == 'resistance'){
                return e.equipment == 'resistance' || e.equipment == 'band' ;
            }
            if (exerciseType == 'stretch'){
                return e.category == 'stretching' || e.name == 'stretch';
            }
        })     
    }
    if(!filtered.length == 0){    
        exercisesNumber.innerText = ` (${filtered.length})`;
        exercisesContainer.classList.add('selected');
    }else{
        exercisesNumber.innerText = '';
        exercisesContainer.classList.remove('selected');
    }
    filtered.forEach((ce, index) =>{
        let g = index + 1;
        const element = document.createElement('div');
        element.className = `list__card list__card--n${g}`;
        const firstChild = document.createElement('div');
        firstChild.className = 'card__text';

        const ht = document.createElement('h2');
        ht.className = 'exercise__name';
        ht.innerHTML = `${ce.name}`;

        const pf = document.createElement('p');
        pf.className = 'exercise__number';
        pf.innerHTML = `${ce.equipment.charAt(0).toUpperCase() + ce.equipment.slice(1)}`;

        const ps = document.createElement('p');
        ps.className = 'exercise__detail';
        ps.innerHTML = `(${g}/${filtered.length})`;
        firstChild.append(ht,pf,ps);

        const secondChild = document.createElement('div');
        secondChild.className = 'card__buttons';

        const buttonFirst = document.createElement('button');
        buttonFirst.className = 'card__button card__button--bookmark';
        buttonFirst.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 640 640"><path d="M192 64C156.7 64 128 92.7 128 128L128 544C128 555.5 134.2 566.2 144.2 571.8C154.2 577.4 166.5 577.3 176.4 571.4L320 485.3L463.5 571.4C473.4 577.3 485.7 577.5 495.7 571.8C505.7 566.1 512 555.5 512 544L512 128C512 92.7 483.3 64 448 64L192 64z"/></svg>';
        const buttonSecond = document.createElement('button');
        buttonSecond.className = 'card__button--play';
        buttonSecond.dataset.image = ce.gifUrl;
        buttonSecond.dataset.name = ce.name;
        const ggg = ce.instructions;
        const zzz = ggg.map(i => i.endsWith(',')?i.slice(0,-1):i);
        const rrr = zzz.map((i,index) => `${index+1}- ${i}`);
        buttonSecond.dataset.inst = rrr.join('\n');
        buttonSecond.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon " viewBox="0 0 640 640"><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>`;

        secondChild.append(buttonFirst,buttonSecond);

        element.append(firstChild,secondChild);
        exercisesContainer.insertAdjacentElement('afterbegin',element);
    })

};

//add the exercise to the display table 
function renderVisualTable (){
    visualTable.querySelectorAll(".table__choice").forEach(row => row.remove());
    visualExercises.forEach((el,index) =>{
        const exercise = document.createElement('div');
        exercise.className = "table__choice ";
        const idThis = crypto.randomUUID();
        exercise.dataset.savedId = idThis ;

        const choiceNumber = document.createElement('p');
        choiceNumber.className = 'choice__number';
        choiceNumber.textContent = index + 1;

        const choiceContent = document.createElement('div');
        choiceContent.className = 'choice__content';

        const contentName = document.createElement('p');
        contentName.className = 'content__name';
        contentName.textContent = el.name;

        const contentWeight = document.createElement('div');
        contentWeight.className = 'content__weight';

        const contentWeightN = document.createElement('p');
        contentWeightN.className = 'content__weight--number';

        const contentWeightT = document.createElement('p');    
        contentWeightT.className = 'content__weight--type';
        if(el.weights === '-'){
            contentWeightN.textContent = el.weights;
            contentWeightT.textContent = ''; 
            contentWeight.append(contentWeightN);
        }else{
            contentWeightN.textContent = el.weights;
            contentWeightT.textContent = el.unit; 
            contentWeight.append(contentWeightN,contentWeightT);
        }


        const contentSets = document.createElement('p');
        contentSets.className = 'content__sets';
        contentSets.textContent = el.set;

        const contentReps = document.createElement('p');
        contentReps.className = 'content__reps';
        contentReps.textContent = el.rep;

        const contentDelete = document.createElement('button');
        contentDelete.className = 'content__delete';
        contentDelete.dataset.savedId = idThis;
        contentDelete.dataset.index = index;

        const svg = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/>
                    </svg>`;

        exercise.append(choiceNumber,choiceContent);
        choiceContent.append(contentName,contentWeight,contentSets,contentReps,contentDelete);
        contentDelete.innerHTML = svg;

        visualTable.appendChild(exercise);
                
        if(visualExercises.length > 0){
            programStatus.innerText = 'Program developing ';
            visualTable.classList.add('selected');
            const items = visualExercises.length;
            const itemNumbers = Math.max(0,items);
            const phrase = 'max-content '.repeat(itemNumbers);
            console.log(items,itemNumbers,phrase);
            visualTable.style.gridTemplateRows = `1rem 1.5rem 2rem ${phrase}auto`;
        }else{
            visualTable.classList.remove('selected');
            visualTable.style.gridTemplateRows = `1rem 1.5rem 2rem auto`;
        }
    }
    )
};

function sepearatorWidth(){
    if(visualExercises.length > 0){
        visualTable.querySelector('.table__headline').style.setProperty('--after-width','calc(100% - 1.5rem)');
        finishDownloadBtn.classList.add('selected');
    }else{
        visualTable.querySelector('.table__headline').style.setProperty('--after-width','calc(100% - 3rem)');
        finishDownloadBtn.classList.remove('selected');
    }
};

//the button which adds the selcted and customized exercise to the display table
addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(addBtn.classList.contains('selected')){
        const name = chosenExerciseName.textContent;
        const weights = chosenExerciseWeight.textContent;
        const set = chosenExerciseSets.textContent;
        const rep = chosenExerciseReps.textContent;
        let unit ; 
        if(document.querySelector('.program__unit--kg').classList.contains('selected')){
            unit = 'Kg';
        }else{
            unit = 'Lb';
        }
        const emptyE = name == "------";
        const emptyS = set == "-";
        const emptyR = rep == "-";
        if(emptyS){
            document.querySelector('.input__number--sets').classList.add('err');
        }
        if(emptyR){
            document.querySelector('.input__number--reps').classList.add('err');
        }
        if(!emptyE && !emptyR && !emptyS){
            visualExercises.push({name,weights,unit,rep,set});
            renderVisualTable();
            chosenExerciseName.textContent = "------";
            chosenExerciseWeight.textContent = "-";
            chosenExerciseSets.textContent = "-";
            chosenExerciseReps.textContent = "-";
            weight.value = 0;
            reps.value = 12;
            sets.value = 4;
            chosenExercise.classList.remove('.selected');
            addBtn.classList.remove('selected');
            programBtnPlay.classList.remove('selected');
            finishDownloadBtn.classList.add('selected');
        }else{
            return;
        }
        types.forEach((t)=>{
            t.classList.remove('selected');
        })
        document.querySelector('.program__type--hyp').classList.add('selected');
        units.forEach((u)=>{
            u.classList.remove('selected');
        })
        document.querySelector('.program__unit--kg').classList.add('selected');
        chosenExercise.classList.remove('selected');
        sepearatorWidth();
    }
});

//the delete button from the table
visualTable.addEventListener('click',(e)=>{
    const deleteBtn = e.target.closest('.content__delete');
    if(!deleteBtn){
        return;
    }
    const index = Number(deleteBtn.dataset.index);
    visualExercises.splice(index,1);
    renderVisualTable();
    sepearatorWidth();
    if(visualExercises.length > 0){
            programStatus.innerText = 'Program developing ';
            visualTable.classList.add('selected');
            const items = visualExercises.length;
            const itemNumbers = Math.max(0,items);
            const phrase = 'max-content '.repeat(itemNumbers);
            console.log(items,itemNumbers,phrase);
            visualTable.style.gridTemplateRows = `1rem 1.5rem 2rem ${phrase}auto`;
        }else{
            visualTable.classList.remove('selected');
            visualTable.style.gridTemplateRows = `1rem 1.5rem 2rem auto`;
        }
});

//the download button which generates program canvas
finishDownloadBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    setTimeout(()=>{
        if(visualExercises.length >= 2){
        html2canvas(visualTable,{
            Width : 768,
            windowWidth: visualTable.clientWidth,
            windowHeight: visualTable.scrollHeight,
            onclone:(con)=>{
                const workoutName = con.querySelector('.table__name');
                const logo = con.querySelector('.table__logo');
                if(!nameProgram.value == ''){
                    workoutName.style.zIndex = '1';
                    workoutName.innerText = nameProgram.value ;
                }else{
                    workoutName.style.zIndex = '1';
                    workoutName.innerText = "Workout Program" ;
                }
                const deleteBtns = con.querySelectorAll('.content__delete');
                deleteBtns.forEach(d =>d.remove());
                const workoutTable = con.querySelector('.visual__table');
                workoutTable.style.gridTemplateColumns = '1.5rem 2fr 1.2fr 0.6fr 0.6fr';
                workoutTable.style.borderRadius = '0';
                logo.style.zIndex = '1';
                const table = con.querySelector('.visual__table');
                table.style.overflowY = 'visible';
            }
        }).then(canvas =>{
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `workout-plan-${nameProgram.value.replace(/\s/g, '-')}.png`;
        link.href = imageUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        visualExercises = [];
        visualTable.querySelectorAll(".table__choice").forEach(row => row.remove());
        nameProgram.value = '';
        programStatus.innerText = 'Program downloaded ✔';
        visualTable.classList.remove('selected');
        visualTable.style.gridTemplateRows = `1rem 1.5rem 2rem auto`;
    })
    }
    },1000)
    sepearatorWidth();
});
searchBarValuesSelect();
searchBarValues ();
dropdownExercises();
customiseDropdownElement();
exerciseInfo();
bookmarkElementsSelect ();
popupShow ();
popupShowProgram ();
bookmarkIconStack ();
focusFunction ();
blurFunction ();