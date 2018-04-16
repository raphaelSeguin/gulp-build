/*
autogrow.js - Copyright (C) 2014, Jason Edelman <edelman.jason@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is furnished to
do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/
;(function(e){e.fn.autogrow=function(t){function s(n){var r=e(this),i=r.innerHeight(),s=this.scrollHeight,o=r.data("autogrow-start-height")||0,u;if(i<s){this.scrollTop=0;t.animate?r.stop().animate({height:s},t.speed):r.innerHeight(s)}else if(!n||n.which==8||n.which==46||n.ctrlKey&&n.which==88){if(i>o){u=r.clone().addClass(t.cloneClass).css({position:"absolute",zIndex:-10,height:""}).val(r.val());r.after(u);do{s=u[0].scrollHeight-1;u.innerHeight(s)}while(s===u[0].scrollHeight);s++;u.remove();r.focus();s<o&&(s=o);i>s&&t.animate?r.stop().animate({height:s},t.speed):r.innerHeight(s)}else{r.innerHeight(o)}}}var n=e(this).css({overflow:"hidden",resize:"none"}),r=n.selector,i={context:e(document),animate:true,speed:200,fixMinHeight:true,cloneClass:"autogrowclone",onInitialize:false};t=e.isPlainObject(t)?t:{context:t?t:e(document)};t=e.extend({},i,t);n.each(function(n,r){var i,o;r=e(r);if(r.is(":visible")||parseInt(r.css("height"),10)>0){i=parseInt(r.css("height"),10)||r.innerHeight()}else{o=r.clone().addClass(t.cloneClass).val(r.val()).css({position:"absolute",visibility:"hidden",display:"block"});e("body").append(o);i=o.innerHeight();o.remove()}if(t.fixMinHeight){r.data("autogrow-start-height",i)}r.css("height",i);if(t.onInitialize&&r.length){s.call(r[0])}});t.context.on("keyup paste",r,s);return n}})(jQuery);
$( document ).ready(function() {

  $('textarea').autogrow({onInitialize: true});


  //Cloner for infinite input lists
  $(".circle--clone--list").on("click", ".circle--clone--add", function(){
    var parent = $(this).parent("li");
    var copy = parent.clone();
    parent.after(copy);
    copy.find("input, textarea, select").val("");
    copy.find("*:first-child").focus();
  });

  $(".circle--clone--list").on("click", "li:not(:only-child) .circle--clone--remove", function(){
    var parent = $(this).parent("li");
    parent.remove();
  });

  // Adds class to selected item
  $(".circle--pill--list a").click(function() {
    $(".circle--pill--list a").removeClass("selected");
    $(this).addClass("selected");
  });

  // Adds class to parent div of select menu
  $(".circle--select select").focus(function(){
   $(this).parent().addClass("focus");
   }).blur(function(){
     $(this).parent().removeClass("focus");
   });

  // Clickable table row
  $(".clickable-row").click(function() {
      var link = $(this).data("href");
      var target = $(this).data("target");

      if ($(this).attr("data-target")) {
        window.open(link, target);
      }
      else {
        window.open(link, "_self");
      }
  });

  // Custom File Inputs
  var input = $(".circle--input--file");
  var text = input.data("text");
  var state = input.data("state");
  input.wrap(function() {
    return "<a class='button " + state + "'>" + text + "</div>";
  });




});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dG9ncm93LmpzIiwiY2lyY2xlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbmF1dG9ncm93LmpzIC0gQ29weXJpZ2h0IChDKSAyMDE0LCBKYXNvbiBFZGVsbWFuIDxlZGVsbWFuLmphc29uQGdtYWlsLmNvbT5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZFxuYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG53aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvXG5kbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UXG5MSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTExcblRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0ZcbkNPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSXG5ERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuOyhmdW5jdGlvbihlKXtlLmZuLmF1dG9ncm93PWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIHMobil7dmFyIHI9ZSh0aGlzKSxpPXIuaW5uZXJIZWlnaHQoKSxzPXRoaXMuc2Nyb2xsSGVpZ2h0LG89ci5kYXRhKFwiYXV0b2dyb3ctc3RhcnQtaGVpZ2h0XCIpfHwwLHU7aWYoaTxzKXt0aGlzLnNjcm9sbFRvcD0wO3QuYW5pbWF0ZT9yLnN0b3AoKS5hbmltYXRlKHtoZWlnaHQ6c30sdC5zcGVlZCk6ci5pbm5lckhlaWdodChzKX1lbHNlIGlmKCFufHxuLndoaWNoPT04fHxuLndoaWNoPT00Nnx8bi5jdHJsS2V5JiZuLndoaWNoPT04OCl7aWYoaT5vKXt1PXIuY2xvbmUoKS5hZGRDbGFzcyh0LmNsb25lQ2xhc3MpLmNzcyh7cG9zaXRpb246XCJhYnNvbHV0ZVwiLHpJbmRleDotMTAsaGVpZ2h0OlwiXCJ9KS52YWwoci52YWwoKSk7ci5hZnRlcih1KTtkb3tzPXVbMF0uc2Nyb2xsSGVpZ2h0LTE7dS5pbm5lckhlaWdodChzKX13aGlsZShzPT09dVswXS5zY3JvbGxIZWlnaHQpO3MrKzt1LnJlbW92ZSgpO3IuZm9jdXMoKTtzPG8mJihzPW8pO2k+cyYmdC5hbmltYXRlP3Iuc3RvcCgpLmFuaW1hdGUoe2hlaWdodDpzfSx0LnNwZWVkKTpyLmlubmVySGVpZ2h0KHMpfWVsc2V7ci5pbm5lckhlaWdodChvKX19fXZhciBuPWUodGhpcykuY3NzKHtvdmVyZmxvdzpcImhpZGRlblwiLHJlc2l6ZTpcIm5vbmVcIn0pLHI9bi5zZWxlY3RvcixpPXtjb250ZXh0OmUoZG9jdW1lbnQpLGFuaW1hdGU6dHJ1ZSxzcGVlZDoyMDAsZml4TWluSGVpZ2h0OnRydWUsY2xvbmVDbGFzczpcImF1dG9ncm93Y2xvbmVcIixvbkluaXRpYWxpemU6ZmFsc2V9O3Q9ZS5pc1BsYWluT2JqZWN0KHQpP3Q6e2NvbnRleHQ6dD90OmUoZG9jdW1lbnQpfTt0PWUuZXh0ZW5kKHt9LGksdCk7bi5lYWNoKGZ1bmN0aW9uKG4scil7dmFyIGksbztyPWUocik7aWYoci5pcyhcIjp2aXNpYmxlXCIpfHxwYXJzZUludChyLmNzcyhcImhlaWdodFwiKSwxMCk+MCl7aT1wYXJzZUludChyLmNzcyhcImhlaWdodFwiKSwxMCl8fHIuaW5uZXJIZWlnaHQoKX1lbHNle289ci5jbG9uZSgpLmFkZENsYXNzKHQuY2xvbmVDbGFzcykudmFsKHIudmFsKCkpLmNzcyh7cG9zaXRpb246XCJhYnNvbHV0ZVwiLHZpc2liaWxpdHk6XCJoaWRkZW5cIixkaXNwbGF5OlwiYmxvY2tcIn0pO2UoXCJib2R5XCIpLmFwcGVuZChvKTtpPW8uaW5uZXJIZWlnaHQoKTtvLnJlbW92ZSgpfWlmKHQuZml4TWluSGVpZ2h0KXtyLmRhdGEoXCJhdXRvZ3Jvdy1zdGFydC1oZWlnaHRcIixpKX1yLmNzcyhcImhlaWdodFwiLGkpO2lmKHQub25Jbml0aWFsaXplJiZyLmxlbmd0aCl7cy5jYWxsKHJbMF0pfX0pO3QuY29udGV4dC5vbihcImtleXVwIHBhc3RlXCIscixzKTtyZXR1cm4gbn19KShqUXVlcnkpOyIsIiQoIGRvY3VtZW50ICkucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgJCgndGV4dGFyZWEnKS5hdXRvZ3Jvdyh7b25Jbml0aWFsaXplOiB0cnVlfSk7XG5cblxuICAvL0Nsb25lciBmb3IgaW5maW5pdGUgaW5wdXQgbGlzdHNcbiAgJChcIi5jaXJjbGUtLWNsb25lLS1saXN0XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2lyY2xlLS1jbG9uZS0tYWRkXCIsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHBhcmVudCA9ICQodGhpcykucGFyZW50KFwibGlcIik7XG4gICAgdmFyIGNvcHkgPSBwYXJlbnQuY2xvbmUoKTtcbiAgICBwYXJlbnQuYWZ0ZXIoY29weSk7XG4gICAgY29weS5maW5kKFwiaW5wdXQsIHRleHRhcmVhLCBzZWxlY3RcIikudmFsKFwiXCIpO1xuICAgIGNvcHkuZmluZChcIio6Zmlyc3QtY2hpbGRcIikuZm9jdXMoKTtcbiAgfSk7XG5cbiAgJChcIi5jaXJjbGUtLWNsb25lLS1saXN0XCIpLm9uKFwiY2xpY2tcIiwgXCJsaTpub3QoOm9ubHktY2hpbGQpIC5jaXJjbGUtLWNsb25lLS1yZW1vdmVcIiwgZnVuY3Rpb24oKXtcbiAgICB2YXIgcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoXCJsaVwiKTtcbiAgICBwYXJlbnQucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIC8vIEFkZHMgY2xhc3MgdG8gc2VsZWN0ZWQgaXRlbVxuICAkKFwiLmNpcmNsZS0tcGlsbC0tbGlzdCBhXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoXCIuY2lyY2xlLS1waWxsLS1saXN0IGFcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gIH0pO1xuXG4gIC8vIEFkZHMgY2xhc3MgdG8gcGFyZW50IGRpdiBvZiBzZWxlY3QgbWVudVxuICAkKFwiLmNpcmNsZS0tc2VsZWN0IHNlbGVjdFwiKS5mb2N1cyhmdW5jdGlvbigpe1xuICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcyhcImZvY3VzXCIpO1xuICAgfSkuYmx1cihmdW5jdGlvbigpe1xuICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKFwiZm9jdXNcIik7XG4gICB9KTtcblxuICAvLyBDbGlja2FibGUgdGFibGUgcm93XG4gICQoXCIuY2xpY2thYmxlLXJvd1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsaW5rID0gJCh0aGlzKS5kYXRhKFwiaHJlZlwiKTtcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoXCJ0YXJnZXRcIik7XG5cbiAgICAgIGlmICgkKHRoaXMpLmF0dHIoXCJkYXRhLXRhcmdldFwiKSkge1xuICAgICAgICB3aW5kb3cub3BlbihsaW5rLCB0YXJnZXQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5vcGVuKGxpbmssIFwiX3NlbGZcIik7XG4gICAgICB9XG4gIH0pO1xuXG4gIC8vIEN1c3RvbSBGaWxlIElucHV0c1xuICB2YXIgaW5wdXQgPSAkKFwiLmNpcmNsZS0taW5wdXQtLWZpbGVcIik7XG4gIHZhciB0ZXh0ID0gaW5wdXQuZGF0YShcInRleHRcIik7XG4gIHZhciBzdGF0ZSA9IGlucHV0LmRhdGEoXCJzdGF0ZVwiKTtcbiAgaW5wdXQud3JhcChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCI8YSBjbGFzcz0nYnV0dG9uIFwiICsgc3RhdGUgKyBcIic+XCIgKyB0ZXh0ICsgXCI8L2Rpdj5cIjtcbiAgfSk7XG5cblxuXG5cbn0pOyJdfQ==
