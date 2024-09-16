const Base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDownSelect=document.querySelectorAll(".dropdown select");
const btn=document.querySelector(".form button");
const fromcur=document.querySelector(".from select");
const tocur=document.querySelector(".to select");
const msg =document.querySelector(".msg");
const finalamount=document.querySelector(".finalamount input")
const reset= document.querySelector(".reset");
let amount=document.querySelector(".amount input");

for(let select of dropDownSelect){
for (curcode in countryList){
    let newOptin=document.createElement("option");
    newOptin.innerText=curcode;
    
    newOptin.value=curcode;
    if(select.name==="from"&&curcode==="USD"){
        newOptin.selected="selected";
    }else if(select.name==="to"&&curcode==="INR"){
        newOptin.selected="selected"

    }
    select.append(newOptin);
  
}

select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
});
//element me select pass hua h
const updateflag=(element)=>{
    let curcode=element.value;
    console.log(curcode);
    let countrycode=countryList[curcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
    // msg.innerText=`${1}${fromcur.value}=${rate}${tocur.value}`;
    // exchange(amtval);
}
const reset=()=>{
    let amount=document.querySelector(".amount input");
    amount.value="1";
    finalamount.value="83.56331095";
   
}
};
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
//let amount=document.querySelector(".amount input");
    //input value
    let amtval=amount.value;
    
   console.log(amtval);
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    console.log(fromcur.value.toLowerCase(),tocur.value.toLowerCase());
    const url=`${Base_url}/${fromcur.value.toLowerCase()}.json`
    exchange(amtval);
});

 const exchange=async(value,currency)=>{
    
    const url=`${Base_url}/${fromcur.value.toLowerCase()}.json`;
    let response=await fetch(url); 
    let curval=await response.json();
  
    let basecur=curval[`${fromcur.value.toLowerCase()}`];
    let rate=basecur[`${tocur.value.toLowerCase()}`]
    finalamt=value*rate;
    
    msg.innerText=`${1}${fromcur.value} = ${rate} ${tocur.value}`;
    finalamount.value=`${finalamt}`
}
//reset button
reset.addEventListener("click",()=>{
    let amount=document.querySelector(".amount input");
    amount.value="";
    finalamount.value="";
    for(let select of dropDownSelect){
        for (curcode in countryList){
            let newOptin=document.createElement("option");
            newOptin.innerText=curcode;
            
            newOptin.value=curcode;
            if(select.name==="from"&&curcode==="USD"){
                newOptin.selected="selected";
                
            }else if(select.name==="to"&&curcode==="INR"){
                newOptin.selected="selected"
       
            }
            select.append(newOptin);
          
        }
        let resimgfrom=document.querySelector(".from img");
        resimgfrom.src=`https://flagsapi.com/US/flat/64.png`;
         let resimgto=document.querySelector(".to img");
        resimgto.src=`https://flagsapi.com/IN/flat/64.png`
    }
    });

   /* //let amount=document.querySelector(".amount input");
      amount.value="1";
      finalamount.value="83.56331095";
     console.log(curcode);*/