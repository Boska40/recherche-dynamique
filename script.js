// selection des elements HTML 
const searchInput=document.querySelector('#search'); //Le input #search
const searchResult=document.querySelector('.table-result'); // tableau de données

let dataArray;


/*fonction d'appel des données depuis l'API
on utilise ASYNC pour attendre la réponse de l'API*/

async function getUsers(){

    /*AWAIT signifie qu'on attend les résultats de la methode FETCH() qui va chercher les données dans l'API
    avec une requete http*/
    const res=await fetch("https://randomuser.me/api/?nat=fr&results=150");

    //analyse de la requête
    const {results}=await res.json();

    //chargement de la variable avec le tableau
    dataArray=orderList(results);
    createUserList(dataArray);
}

getUsers();

//fonction de tri des données envoyé par l'API
function orderList(data){

    //methode SORT permet de trier
    orderData=data.sort((a,b)=>{
        if(a.name.last.toLowerCase()<b.name.last.toLowerCase()){
            return -1;
        }
        if(a.name.last.toLowerCase()>b.name.last.toLowerCase()){
            return 1;
        }
        return 0;
    })
    return orderData;
}

//creation de la liste des éléments et injection dans le DOM
function createUserList(userslist){
    userslist.forEach(user =>{
        // creation du parent
        const listItems=document.createElement("div");
        listItems.setAttribute("class", "table-item"); //on donne la classe "table-item" à la div
        
        // ajout des enfants à la div "table-item"
        listItems.innerHTML=`
        <div class="container-image">
        <img src=${user.picture.medium}>
        <p class="name">${user.name.last} ${user.name.first}</p>
        </div>
        <p class="email">${user.email}</p>
        <p class="phone">${user.phone}</p>
        `

        //rajout du contenu à l'item "table-item" créé
        searchResult.appendChild(listItems);
    })
}


//recherche filtrée de l'élément
searchInput.addEventListener("input", filterData);


//fonction de filtrage
function filterData(e){

    //vidage de la liste
    searchResult.innerHTML="";

    const searchString=e.target.value.toLowerCase().replace(/\s/g, "");//remplacer les espace par rien
    // ------------ "/\s/g" le rejex -----------------

    //recherche
    const filterArray=dataArray.filter(el=> 
    el.name.first.toLowerCase().includes(searchString) || //le nom
    el.name.last.toLowerCase().includes(searchString) || //le prénom
    `${el.name.last + el.name.first}`.toLocaleLowerCase().replace(/\s/g, "").includes(searchString)||
    `${el.name.first + el.name.last}`.toLocaleLowerCase().replace(/\s/g, "").includes(searchString)
    //nom+prenom ou prenom+nom
    )

    //recréer une liste à partir des noms filtrés
    createUserList(filterArray);
}