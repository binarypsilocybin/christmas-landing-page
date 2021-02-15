//hover state animation
document.querySelectorAll(".card").forEach(item => {
  if (item.children[2].style.display = "flex") {
    item.addEventListener("mouseover", event =>{
      item.children[2].style.opacity = "15";
      
    })
    item.addEventListener("mouseout", event => {
      item.children[2].style.opacity = "0";
    })
  }
 
})

//counter clicks and lock card

let card = document.querySelectorAll(".card"),
    count = 0;

function myFunction() {
  card.forEach((item, index) =>{
    item.addEventListener('click', ()=>{ 
        if (count==0) { 
            let searchParams = new URLSearchParams(window.location.search)
            let id = searchParams.get('id')

            fetch( "https://natal2020api.wrightia.com/api/v2/xmas2020/_func/accept_response?p_key_id="+id+"&p_response="+(index+1)+"&api_key=a3a46a737560d535839e87e477eedfba79f082cdd32fc3fd6a7aac43a47cb38d")
            .then((response) => {
                return response.text();
            }).then((value) => {
                status= 1;
                UpdateView(status);
                }
            ); // read response body as text
        
        }
        count += 1;
        if (count >= 1 ) {          
          document.querySelectorAll(".card-hover").forEach(cardHover => {
            cardHover.style.display = "none";
          })
        }
        if (count >= 1) {
          document.querySelectorAll(".card-hover-message").forEach(cardHoverMessage => {
            cardHoverMessage.style.display = "flex";
            cardHoverMessage.style.opacity = "15";
          })
        }       
    });
  });
}

var id="";
var status=-1;

function LoadId() {
        let searchParams = new URLSearchParams(window.location.search)
        let id = searchParams.get('id')
        if (! searchParams.has('id')) {
            status = -2;
        }
        else {
        fetch('https://natal2020api.wrightia.com/api/v2/xmas2020/_func/get_status?p_key_id='+id+'&api_key=a3a46a737560d535839e87e477eedfba79f082cdd32fc3fd6a7aac43a47cb38d')
        .then((response) => {
            return response.text();
        }).then((value) => {
            UpdateView(value);
            }
        ); // read response body as text


        }
}

function OnLoad() {
    //myFunction(); 
    LoadId();
    UpdateView(status);
    
}

function UpdateView(value ){
    status = value;
    var cardsection = document.getElementById("cardsection");
    var noidsection = document.getElementById("loading_or_no_id");
    if (status < 0) {
        cardsection.style.display="none";
        loading_or_no_id.style.display="block";
    }
    else {
        cardsection.style.display="block";
        loading_or_no_id.style.display="none";
        if (status >= 1) {
            count = 1;
            if (count >= 1 ) {          
              document.querySelectorAll(".card-hover").forEach(cardHover => {
                cardHover.style.display = "none";
              })
            }
            if (count >= 1) {
              document.querySelectorAll(".card-hover-message").forEach(cardHoverMessage => {
                cardHoverMessage.style.display = "flex";
                cardHoverMessage.style.opacity = "15";
              })
            }       
            
        }
    }
    
}
let snackOk = document.getElementById("snackbar-ok");
let snackNok = document.getElementById("snackbar-error");


function addComment() {
        let searchParams = new URLSearchParams(window.location.search)
        let id = searchParams.get('id')
        fetch('https://natal2020api.wrightia.com/api/v2/xmas2020/_func/add_comment?p_key_id='+id+'&api_key=a3a46a737560d535839e87e477eedfba79f082cdd32fc3fd6a7aac43a47cb38d&p_comment=' + document.getElementById("wiaComment").value )
        .then((response) => {
            return response.text();
        }).then((value) => {
            UpdateView(value);
            document.getElementById("wiaComment").value = "";
           if (value == 1) {
            snackOk.classList.add("show");
           }
           else {
            snackNok.classList.add("show");
            }
            
            }
        ); // read response body as textß
}


function unvote() {
        console.log("Unvoting");
        let searchParams = new URLSearchParams(window.location.search)
        let id = searchParams.get('id')
        fetch('https://natal2020api.wrightia.com/api/v2/xmas2020/_func/cancel_response?p_key_id='+id+'&api_key=a3a46a737560d535839e87e477eedfba79f082cdd32fc3fd6a7aac43a47cb38d' )
        .then((response) => {
            return response.text();
        }).then((value) => {
                count=0;
                status=-1;
                myFunction();
                LoadId();
                UpdateView(status);

            }
        ); // read response body as text


}