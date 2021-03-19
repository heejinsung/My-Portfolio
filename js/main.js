$(function(){

   //--------header fix--------
	$(window).scroll(function(){
      let scrollTop = $(this).scrollTop();
      if( scrollTop > 700 ){
         $('header').addClass("isFixed")
      }else{
          $('header').removeClass("isFixed")
      }
      return false;
   });


   //--------스크롤이미지 버튼 클릭 시 해당영역으로 이동--------
	$('#main_content .scroll').click(function(){
      let offset = $('#about').offset(); 
      $('html').animate({scrollTop : offset.top}, 700);
    return false;
   });


   // $('.scroll_top').click(function(){
   //    $('html').animate({scrollTop : 0}, 800);
   // });

   //-------메뉴클릭시 스크롤 이동
   let menu = $("#Header nav li");
   let contents =  $("#contents > section");

   menu.click(function(e){
      e.preventDefault();
      // $(this).addClass('on').siblings().removeClass('on');
      let idx = $(this).index();
      let section = contents.eq(idx)
      let sectionDistance = section.offset().top;
      console.log(sectionDistance);

      $('html').stop().animate({scrollTop:sectionDistance});
   });

   $(window).scroll(function(){
      contents.each(function(){
         if($(this).offset().top-10 <= $(window).scrollTop()){
            let idx = $(this).index();
            menu.removeClass('on');
            menu.eq(idx).addClass('on');

         }
      })
   })



   //mobile menu click and show and hide menu
   $(".menu_icon").click(function(){
      $(".menu_overlay").toggleClass("active");
         if($(".menu_overlay").hasClass("active")){
            $(".menu_icon").find("i").attr("class", "fa fa-times");
            $(".menu_overlay").prev(".nav_menu").slideDown("slow");
         } else {
            $(".menu_icon").find("i").attr("class", "fa fa-bars");
            $(".menu_overlay").prev(".nav_menu").slideUp("slow");
         }
   });

   $(".nav_menu ul li a").click(function(e){
      $(".menu_overlay").removeClass("active");
		$(".menu_overlay").fadeOut(800);
      $(".nav_menu").animate(800);
      $(".menu_icon").find("i").attr("class", "fa fa-bars");
      
   });
   
});



let typingBool = false; 
let typingIdx=0; 
let liIndex = 0;
let liLength = $(".typing-txt>ul>li").length;

// 타이핑될 텍스트를 가져온다 
let typingTxt = $(".typing-txt>ul>li").eq(liIndex).text(); 
typingTxt=typingTxt.split(""); // 한글자씩 자른다. 
if(typingBool==false){ // 타이핑이 진행되지 않았다면 
    typingBool=true; 
    var tyInt = setInterval(typing,100); // 반복동작 
} 
     
function typing(){ 
  if(typingIdx<typingTxt.length){ // 타이핑될 텍스트 길이만큼 반복 
     $(".typing").append(typingTxt[typingIdx]); // 한글자씩 이어준다. 
     typingIdx++; 
   } else{ //한문장이끝나면
     //다음문장으로.. 마지막문장이면 다시 첫번째 문장으로 
     if(liIndex>=liLength-1){
       liIndex=0;
     }else{
       liIndex++; 
     }
     
     //다음문장을 타이핑하기위한 셋팅
        typingIdx=0;
        typingBool = false; 
        typingTxt = $(".typing-txt>ul>li").eq(liIndex).text(); 
       
     //다음문장 타이핑전 1초 쉰다
         clearInterval(tyInt);
         setTimeout(function(){
            $(".typing").html('');
           tyInt = setInterval(typing,100);
         },1000);
    } 
}  
