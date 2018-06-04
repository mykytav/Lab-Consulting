$(function(){
	//Burger-menu
	$('.menu-open').click(function(){
		$('.menu-collapse').toggleClass('d-none');
		$('.menu-collapse').toggleClass('opened');
	});

	//Preloader
	$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.overlay-loader');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
	});

	// Smooth scrolling
	 $("#scrollBtn").click(function () {
        var btnClick = $(this).attr("href");
        var destination = $(btnClick).offset().top;
        $('html').animate({ scrollTop: destination }, 700);
	});

	 //Slick slider
	  $('.slider').slick({
    //Settings
    arrows: true,
    nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
    prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
    dots: true
  });

	  //Arctic modal
	  $('.btn').click(function(e){
	  	e.preventDefault();
	  	$('#exampleModal').arcticmodal();
	  });

	  //for service page
	  $('.consult__button').click(function(e){
	  	e.preventDefault();
	  	$('#exampleModal').arcticmodal();
	  });

	  //Sending Form
	   // Form send
        $('[data-submit]').on('click', function(e){
            e.preventDefault();
            $(this).parent('form').submit();
            $(this).parents('#exampleModal').fadeOut(350);
        })
        $.validator.addMethod(
            "regex",
            function(value, element, regexp) {
                var re = new RegExp(regexp);
                return this.optional(element) || re.test(value);
            },
            "Please check your input."
        );
        function valEl(el){

            el.validate({
                rules:{
                    tel:{
                        required:true,
                        regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                    },
                    name:{
                        required:true
                    },
                    email:{
                        required:true,
                        email:true
                    }
                },
                messages:{
                    tel:{
                        required:'Поле обязательно для заполнения',
                        regex:'Телефон может содержать символы + - ()'
                    },
                    name:{
                        required:'Поле обязательно для заполнения',
                    },
                    email:{
                        required:'Поле обязательно для заполнения',
                        email:'Неверный формат E-mail'
                    }
                },
                submitHandler: function (form) {
                    $('#reload').fadeIn();
                    var $form = $(form);
                    var $formId = $(form).attr('id');
                    switch($formId){
                        case'goToNewPage':
                            $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                                .always(function (response) {
                                    //ссылка на страницу "спасибо" - редирект
                                    location.href='https://wayup.in/lm/landing-page-marathon/success';
                                    //отправка целей в Я.Метрику и Google Analytics
                                    ga('send', 'event', 'masterklass7', 'register');
                                    yaCounter27714603.reachGoal('lm17lead');
                                });
                            break;
                        case'popupResult':
                            $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                                .always(function (response) {
                                    setTimeout(function (){
                                        $('#reload').fadeOut();
                                    },800);
                                    setTimeout(function (){
                                        $('#overlay-reload').fadeIn();
                                        $('.arcticmodal-overlay').fadeOut();
                                         $('.arcticmodal-container').fadeOut();
                                         $('body').css('overflow', 'inherit');
                                         $('body').css('margin-right', '0');
                                        $form.trigger('reset');
                                        //строки для остлеживания целей в Я.Метрике и Google Analytics
                                    },1100);
                                    $('#overlay-reload').on('click', function(e) {
                                        $('#overlay-reload').fadeOut();
                                    });


                                });
                            break;
                    }
                    return false;
                }
            })
        }

        $('.js-form').each(function() {
            valEl($(this));
        });
        $('[data-scroll]').on('click', function(){
            $('html').animate({
                scrollTop: $( $.attr(this, 'data-scroll') ).offset().top
            }, 2000);
            event.preventDefault();
        })

});
