let total_time=60;//second
let user_seleted_time=0;
let curr_word="";
let next_word="";
let word_key_count=0;
let space_key_count=0;
let  pre_para_array_len=0;
let paragraph=[];
let para_array=[];
let dyn_para_array=[];
let right_word=[];
let worng_word=[];
let worng_key=[];
let store_worng_key_stroke=[];
let uncurrected=0;
let first_key_stroke=false;
let ctrl=false;
let total_key_count=0;
let worng_key_count=0;
let total_worng_key_count=0;
let setTime=60;
let typeBox=document.getElementById('typeBox');
let paragraphBox=document.getElementById('paragraph');
let dynamicWPM=document.getElementById('wpmSpn');
let dynamicTime=document.getElementById('timeSpn')
let accuracyResult=document.getElementById('accuracyResult');
let wpmResult=document.getElementById('wpmResult')
let timeResult=document.getElementById('timeResult');
let keyResult=document.getElementById('keyResult')
let wordResult=document.getElementById('wordResult')
let resultDiv=document.getElementById('resultDiv');
let worngKey=document.getElementById('worngKey');
let worngWord=document.getElementById('worngWord');

//difine paragraph
paragraph[0]="Paragraphs are the building blocks of papers."
paragraph[1]="This may seem surprising: at first sight it might be thought that knowledge might be defined as belief which is in agreement with the facts. The trouble is that no one knows what a belief is, no one knows what a fact is, and no one knows what sort of agreement between them would make a belief true. Let us begin with belief."
paragraph[2]="It discusses a complete thought or idea or point. It tells readers in an organized way about the thing that it discusses, describes or defines. For students, a paragraph is a first step to composition before writing a complete essay."
paragraph[3]="A paragraph is the smallest writing piece that can exist on its own.";
paragraph[4]="The question how knowledge should be defined is perhaps the most important and difficult of the three with which we shall deal."
paragraph[5]="The previous owner papered EVERY wall and CEILING! Removing it is brutal, but oddly satisfying. The best feeling is getting a long peel, similar to your skin when you're peeling from a sunburn."
paragraph[6]="He awoke to the huge, insect like creatures looming over his bed and screamed his lungs out. They hastily left the room and he stayed up all night, shaking and wondering if it had been a dream."
paragraph[7]="Everyone loves the first day of school, right? New year, new classes, new friends. It's a day full of potential and hope, before all the dreary depressions of reality show up to ruin all the fun.I like the first day of school for a different reason, though."
paragraph[8]="On Monday, I came up with the perfect plan. No one even knew we were friends.On Tuesday, he stole the gun from his dad.On Wednesday, we decided to make our move during the following day's pep rally.On Thursday, while the entire school was in the gym, we waited just outside the doors."
paragraph[9]="'If God exists, why is there so much evil in the world?' It's a common question, but it is misplaced.All things must have balance. Light and dark. Good and evil. Sound and silence. Without one, the other cannot exist."

function startTyping() {

  var startDiv=document.getElementsByClassName('startTyping');
   setTime=document.getElementById('setTime').value;
   startDiv[0].style.display="none";
   total_time=setTime;
   user_seleted_time=total_time;
   dynamicTime.innerHTML="time "+user_seleted_time/60 +" min";

}

window.onload=function() {
  var max=paragraph.length;
  var min=0;
  var rand_index=Math.random()*(max-min) + min;
    rand_index=Math.floor(rand_index);
  var rand_index_1=Math.random()*(max-min) + min;
    rand_index_1=Math.floor(rand_index_1);

  paragraphBox.innerHTML=paragraph[rand_index];
  para_array=paragraph[rand_index].split(" ");
  dyn_para_array=paragraph[rand_index_1].split(" ");
  curr_word=para_array[0];
  next_word=para_array[0];


}

typeBox.addEventListener('keypress',function(e){

  var keyCode = event.which || event.keyCode;
   if(keyCode==32){
   if (typeBox.value.trim()==curr_word.trim()) {
      right_word.push(space_key_count)
      }
   else {

        worng_word.push(space_key_count)
        total_worng_key_count+=curr_word.length;
     }
     //load new paragraph
         if(para_array.length==space_key_count+1){
               pre_para_array_len=para_array.length;
               for(let j=0;j<dyn_para_array.length;j++)
               {
                 para_array.push(dyn_para_array[j]);
               }
               dyn_para_array=[];
               var max=paragraph.length;
               var min=0;
               var rand_index=Math.random()*(max-min) + min;
                 rand_index=Math.floor(rand_index);
                 dyn_para_array=paragraph[rand_index].split(" ");

         }
   space_key_count++;
   currentText(space_key_count);
   curr_word=para_array[space_key_count];
   next_word=para_array[space_key_count+1];
   typeBox.value=null;
   word_key_count=0;
   typeBox.style.background="white";
   uncurrected=uncurrected+worng_key.length;
    worng_key=[];
    total_key_count++;


 }
else{
     var typeChar = String.fromCharCode(keyCode);
     if(typeChar==curr_word[word_key_count])
      {
         //console.log("right k stroke");
         if(worng_key.length==0)typeBox.style.background="rgba(0,255,0,.3)";
      }
    else {
        //console.log("worng key stroke")
        if(worng_key.length==0)typeBox.style.background="rgba(255,0,0,.3)";
        worng_key.push(word_key_count);
        if(curr_word[word_key_count]!=null){
        store_worng_key_stroke.push(curr_word[word_key_count])}
        worng_key_count++;
        total_worng_key_count++;

      }
   word_key_count++;
   ctrl=false;

}
if(total_key_count==0){
  var timer=setInterval(function(){
  total_time--;
  var dateObj=new Date(total_time*1000);
  var m =dateObj.getUTCMinutes();
  var s=dateObj.getSeconds();
  var timeString= m.toString().padStart(2,'0')+":"+  s.toString().padStart(2,'0')
  dynamicTime.innerHTML="time "+timeString;
  if(total_time==0){
    typeBox.disabled = true;
    clearInterval(timer)
    findWPM()
    accuracy()
    setResult()
    worngData();
    resultDiv.style.display="block"
  }

   }, 1000);
}
total_key_count++;
dynamicWpm();
});

//second addEventListener for finding backspace
typeBox.addEventListener('keydown',function(e){

if(ctrl && e.code=="Backspace")
{
  word_key_count=0;
  worng_key=[];
}
else if(e.code=="Backspace")
{
  if(worng_key.includes(word_key_count-1)){
    worng_key.pop();
  }
  if(word_key_count>0) word_key_count--;

}
if(e.code=="ControlLeft" || e.code=="ControlRight"){
  ctrl=true;
}

if(worng_key.length>0){
  typeBox.style.background="rgba(255,0,0,.3)";
}
else {
        typeBox.style.background="rgba(0,255,0,.3)";
}
})

function currentText(index){
var paraLength= para_array.length;
var paraText="";
for(let i=0+pre_para_array_len;i<paraLength;i++){

     if(worng_word.includes(i))
     {

       paraText+="<span class='worngSpan'>"+para_array[i]+" </span>";
     }
     else if(i==index){
     paraText+="<span id='currentSpan'>"+para_array[i]+" </span>";
    }
    else {
      paraText+=para_array[i]+" ";
    }


}
    paragraphBox.innerHTML=paraText;
    var currentSpan =document.getElementById('currentSpan');
    currentSpan.style.background="yellow";
    currentSpan.style.color="black";
    currentSpan.style.border="1px black solid";
     if(worng_word.length>0){
     var worngSpan =document.getElementsByClassName('worngSpan');
   for(let i=0;i<worngSpan.length;i++){
   worngSpan[i].style.background="rgba(225,0,0,.4)";
   worngSpan[i].style.border="1px black solid";}

 }
}

//set interval


function findWPM(){
var time = user_seleted_time/60;
var netwpm=((total_key_count/5)-uncurrected)/time;
//var netwpm=right_word.length/time;
wpmResult.innerHTML="Typing Speed :"+netwpm+" wpm";
}

function accuracy() {
var accurate=((total_key_count-total_worng_key_count)/total_key_count)*100;
accuracyResult.innerHTML="Accuracy :"+Math.floor(accurate);
}
function setResult(){
wordResult.innerHTML="wrong word stroke :"+worng_word.length;
keyResult.innerHTML="wrong key stroke :"+worng_key_count;
timeResult.innerHTML="time :"+setTime/60+" min";

}
function dynamicWpm(){
var speed=((total_key_count/5)-uncurrected)/((user_seleted_time-total_time+1)/60);
//var netwpm=right_word.length/time;
dynamicWPM.innerHTML="Typing Speed "+Math.floor(speed)+" wpm";
}

function setFont(){
  var a=document.getElementById('vol').value;
  alert(a)
  paragraphBox.style.fontSize=a+"px";

}

function reloadPara() {
  para_array=[];
  var max=paragraph.length;
  var min=0;
  var rand_index=Math.random()*(max-min) + min;
    rand_index=Math.floor(rand_index);
  paragraphBox.innerHTML=paragraph[rand_index];
  para_array=paragraph[rand_index].split(" ");
  curr_word=para_array[0];
  next_word=para_array[0];
}

function worngData() {
  var htmlText="";
  var htmlText1="";
  for (var i = 0; i < store_worng_key_stroke.length; i++) {
  htmlText += store_worng_key_stroke[i]+", ";
  }
  for (var i = 0; i < worng_word.length; i++) {
  htmlText1 += para_array[worng_word[i]]+", ";
  }
  worngKey.innerHTML="Wrong Key Strokes <br>"+htmlText;
  worngWord.innerHTML="Wrong Words <br>"+htmlText1;

}
function restart(){
location.reload();
}
