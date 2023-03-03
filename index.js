const dob5 = document.getElementById("db");
dob5.addEventListener("change", () => validateDOB(dob5));
function validateDOB(dob5){
let k=dob5.value.split("-");
let year=k[0];
let month=k[1];
let date=k[2];
let birthdate = new Date(year, month, date);
let today = new Date();
let present_year= today.getFullYear();
let birth_Year=birthdate.getFullYear()
let ag = present_year - birth_Year;
let month_Diff = today.getMonth() - birthdate.getMonth();
if ((today.getDate() < birthdate.getDate())||month_Diff<0) 
{
ag--;
}
if (ag<18 || ag>55) 
{
dob5.setCustomValidity("Your age is not between 18 , 55");
dob5.reportValidity();
}
else
{
dob5.setCustomValidity("");
}
}
let email=document.getElementById("email");
email.addEventListener('input',() => validate(email));
function validate(element){
if(element.validity.typeMismatch){
    element.setCustomValidity("Invalid email");
    element.reportValidity();
    }
    else{
    element.setCustomValidity('');
    }
}           
let userform=document.getElementById('F_dt');
const retriveEntries=()=>{
    let entries=localStorage.getItem("en");
    if(entries){
        entries=JSON.parse(entries);
    }
    else{
        entries=[];
    }
    return entries;
}
let userEntries=retriveEntries();

const display=()=>{
    let entries=retriveEntries();
    const tableEntries=entries.map((entry)=>{
    const nm=`<td>${entry.nm}</td>`;
    const email=`<td>${entry.email}</td>`;
    const pwd=`<td>${entry.pwd}</td>`;
    const db=`<td >${entry.db}</td>`;
    const accept=`<td>${entry.acceptedTermsAndCondition}</td>`;
    const row=`<tr>${nm} ${email} ${pwd} ${db} ${accept}</tr>`;
    return row;
    }).join("\n");
    const table=`<table border="20">
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th >Password </th>
    <th>Dob</th>
    <th>Accepted terms?</th>
    </tr>
    ${tableEntries}</table>`;
    let details=document.getElementById("en");
    details.innerHTML=table;
}

const saveForm=(event)=>{
     event.preventDefault();
     const nm=document.getElementById("nm").value;
     const email=document.getElementById("email").value;
     const pwd=document.getElementById("pwd").value;
     const db=document.getElementById("db").value;

     const acceptedTermsAndCondition=document.getElementById("aptTrm").checked;
     const entry={
        nm,
        email,
        pwd,
        db,
        acceptedTermsAndCondition
     };
     userEntries.push(entry);
     localStorage.setItem("en",JSON.stringify(userEntries));
     display();
}
userform.addEventListener("submit",saveForm);
display();