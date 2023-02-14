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
  
  // function showPosition(position) {
  //   var x = document.getElementById('p');
  //   var y = document.getElementById("BTN");
  //   x.innerHTML = "Latitude: " + position.coords.latitude 
  //   + "longtitide: " + position.coords. longitude;
    
  //   $(document).ready(function(){
  //     $(".geoLocation").click(function () {
  //         $('#dynamicChange').val("position").trigger('change');
  //     });
  //   });
  // }
  

function showPosition(position) {
  var x = document.getElementById('p');
  var y = document.getElementById("BTN");
  console.log(position.coords. longitude);
  if(position.coords. longitude > 34 && position.coords.latitude > 31 &&
    position.coords. longitude < 35 && position.coords.latitude < 32){
      const yesBtn = document.getElementById('Beer-Sheva');
      yesBtn.checked = true;
    }
  else if(position.coords. longitude < 35 && position.coords.latitude > 31){
      const yesBtn = document.getElementById('Jerusalem');
      yesBtn.checked = true;
    }
    else if(position.coords. longitude > 34.8 && position.coords.latitude > 32.79 &&
    position.coords. longitude < 34.99){
      const yesBtn = document.getElementById('Haifa');
      yesBtn.checked = true;
    }
  else{
      const yesBtn = document.getElementById('Beer-Sheva');
      yesBtn.checked = true;
    }
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
          if (validatePassword(password)){
            return true;
          }
          else{
            alert("SORRY....The password must include: at least one LOWERCASE and one UPPERCASE letter, at least one DIGIT,at least one SPECIAL character and at least 6 characters long ");
          return false;
          }
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

  function ValidationFunction1() {
    let password = document.forms["my-form1"]["password"].value;
    let repassword = document.forms["my-form1"]["repassword"].value;
    if(password.localeCompare(repassword)==0){
      if (validatePassword(password)){
        return true;
      }
      else{
        alert("SORRY....The password must include: at least one LOWERCASE and one UPPERCASE letter, at least one DIGIT,at least one SPECIAL character and at least 6 characters long ");
      return false;
      }
    }else{
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
    
    function makeSure(){
      if(confirm('Are you sure you want to delete your account?')){
        alert('It was nice to meet you...');
        return true;
      }else{
        alert('See you soon!');
        return false;
      }
      
    }

    //function that validate the password - 1 small letter, 1 big, 1 special sign, at least 8 charecters.
    function validatePassword(password) {
      var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return pattern.test(password);
    }