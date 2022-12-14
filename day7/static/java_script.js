// navigator function
var activPage = window.location.pathname;
console.log(activPage);

const activeNav = document.querySelectorAll('nav a').forEach(link =>{
    if(link.href.includes(`${activPage}`)){
        link.classList.add("active");
    }
}
);
console.log(activeNav);

function LocationNavig() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("p").innerHTML = "Geo location is not supported";
    }
  }
  
  function showPosition(position) {
    var x = document.getElementById('p');
    var y = document.getElementById("BTN");
    x.innerHTML = "Latitude: " + position.coords.latitude 
    + "longtitide: " + position.coords. longitude;
    
    $(document).ready(function(){
      $(".geoLocation").click(function () {
          $('#dynamicChange').val("position").trigger('change');
      });
    });
  }
  
  // will work when a form is activated
  function ValidationFunction() {
    let password = document.forms["my-form"]["password"].value;
    let repassword = document.forms["my-form"]["repassword"].value;
    let first_name = document.forms["my-form"]["fname"].value;
    let last_name = document.forms["my-form"]["lname"].value;
    let age = document.forms["my-form"]["age"].value;
    

    // Conditions of first and last name, passwords and age filling
    if(password.localeCompare(repassword)==0){
      if(first_name.length > 1 && last_name.length > 1){
        if (age > 17){
          return true     
        } else {
          alert("The web is only for 18+");
          return false;
        }
      } else{
        alert("Please write your full name");
        return false;
      }
    } else{
      alert("There is no match in this password. Try again");
      return false;
    }
  }

  //Shows the doctors information after clicking search
  function ShowTable() {   
      var x = document.getElementById("my-table");     
        x.style.display = "block";    
          var resetBtn = document.getElementById("find-doctor");
          resetBtn.style.display = "none";
          var div = document.getElementById("whatYouWantToHide");
          div.style.display = "block";
         
      }
      //Reset function
      function Reset(){
        window.location.reload();
      }

    //Massage after clicking on the register botton
    function MessagePop(){
      alert('Welcome To My Clinic!');
    }
    //Massage after clicking on the send botton
    function thanks(){
      alert('Thank you for contacting us :)');
    }