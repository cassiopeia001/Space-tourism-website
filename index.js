const menuButton= document.getElementById('menu-button');
const closeButton= document.getElementById('close-button');
const menu= document.getElementById('menu');
const destinationsContainer= document.getElementById('destinations-container');
const crewContainer= document.getElementById('crew-container');
const technologyContainer= document.getElementById('technology-container');

menuButton.addEventListener('click', ()=>{
    menu.classList.toggle('hidden');
    menu.classList.add('flex');
    menuButton.classList.toggle('hidden');
});
closeButton.addEventListener('click', ()=>{
    menu.classList.toggle('hidden');
    menu.classList.remove('flex');
    menuButton.classList.toggle('hidden');
});

let jsonData;
let destinationData;
let crewData;
let techData;

async function fetchData(){
    try {
        const response= await fetch("https://cassiopeia001.github.io/Space-tourism-website/data.json");
        jsonData= await response.json();
        destinationData= jsonData.destinations;
        crewData= jsonData.crew;
        technologyData= jsonData.technology;
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}
fetchData();

if(destinationsContainer){
    
    const destinationsList= destinationsContainer.querySelectorAll('button');
    const destinationTitle= document.getElementById('destination-title');
    const destinationImage= document.getElementById('destination-image');
    const description= document.getElementById('description');
    const distance= document.getElementById('distance');
    const travelTime= document.getElementById('travel-time');
    
    destinationsList.forEach(destination=>{
        destination.addEventListener('click', ()=>{
            destinationsList.forEach(destination=>{
                destination.classList.add('border-b-transparent');
                destination.classList.remove('border-b-white');
            });
            const destinationName= destination.id;
            assignDestination(destinationName);
            destination.classList.add('border-b-white');
            destination.classList.remove('border-b-transparent');
        });
    });
    
    function assignDestination(destname){
        const desiredDestination= destinationData.find(destination=> destination.name===destname);
        destinationTitle.innerHTML= desiredDestination.name;
        destinationImage.src= desiredDestination.images.png;
        description.innerHTML= desiredDestination.description;
        distance.innerHTML= desiredDestination.distance;
        travelTime.innerHTML= desiredDestination.travel;
    }
}

if(crewContainer){

    const crewList= crewContainer.querySelectorAll('button');
    const crewIdentifier= document.getElementById('crew-name');
    const bio= document.getElementById('bio');
    const role= document.getElementById('role');
    const crewImage= document.getElementById('crew-image');

    crewList.forEach(crewMember=>{
        crewMember.addEventListener('click', ()=>{
            crewList.forEach(crewMember=>{
                crewMember.classList.add('bg-white/18');
                crewMember.classList.remove('bg-white');
            });
            const crewNum=parseInt(crewMember.dataset.id);
            assignCrew(crewNum);
            crewMember.classList.add('bg-white');
            crewMember.classList.remove('bg-white/18');
        });
    });
    
    function assignCrew(crewNum){
        crewIdentifier.innerHTML= crewData[crewNum].name;
        role.innerHTML= crewData[crewNum].role;
        bio.innerHTML= crewData[crewNum].bio;
        crewImage.src= crewData[crewNum].images.png;
    }
}
if(technologyContainer){

    const technologyList= technologyContainer.querySelectorAll('button');
    const techName= document.getElementById('tech-name');
    const techDesc= document.getElementById('tech-desc');
    const landscapeImage= document.getElementById('landscape-image');
    const portraitImage= document.getElementById('portrait-image');
    const defaultImage= document.getElementById('default-image');

    technologyList.forEach(techItem=>{
        techItem.addEventListener('click', ()=>{
            technologyList.forEach(techItem=>{
                techItem.classList.add('bg-transparent', 'text-white');
                techItem.classList.remove('bg-white', 'text-[var(--dark-blue)]');
            });
            const techNum=parseInt(techItem.dataset.id);
            assignTech(techNum);
            techItem.classList.add('bg-white','text-[var(--dark-blue)]');
            techItem.classList.remove('bg-transparent','text-white');
        });
    });

    function assignTech(technum){
        techName.innerHTML= technologyData[technum].name;
        techDesc.innerHTML= technologyData[technum].description;
        landscapeImage.srcset= technologyData[technum].images.landscape;
        portraitImage.srcset= technologyData[technum].images.portrait;
        defaultImage.srcset= technologyData[technum].images.portrait;
    }
}



