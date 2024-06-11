window.addEventListener("DOMContentLoaded", () => {
    scrollHeader()
    mobileNav()
    initCoverSlider()
    initProductsSlider()
});

function scrollHeader() {
    const header = document.querySelector('#header')
    let scrollPosition = window.scrollY
    const scrollChange = 1

    checkScrollPosition()
    window.addEventListener('scroll', checkScrollPosition)

    function checkScrollPosition() {
        scrollPosition = window.scrollY;
        if (scrollPosition >= scrollChange) {
            header.classList.add("scrolling")
        } else {
            header.classList.remove("scrolling")
        }
    }
}

function mobileNav() {
    const burgers = document.querySelectorAll('.burger')
    const mobNav = document.querySelector('.header__mob')
    burgers.forEach(b => {
        b.addEventListener('click', () => {
            mobNav.classList.toggle('active')
        })
    })
    mobNav.addEventListener('click', () => {
        mobNav.classList.remove('active')
    })
}

function initCoverSlider() {
    $(document).ready(function(){
        $('.slider').slick({
            infinite: true,
            autoplay: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            vertical: true,
            verticalSwiping: true,
        });
    });
}

function initProductsSlider() {
    $(document).ready(function(){
        $('.popular-products__slider').slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1,
            speed: 6000,
            slidesToScroll: 3,
            arrows: true,
            dots: false,
            variableWidth: true,
            prevArrow:"<div class='arr-l arr'><img src='../images/popular-products/arr-l.svg'/></div>",
            nextArrow:"<div class='arr-r arr'><img src='../images/popular-products/arr-r.svg'/></div>"
        });
    });


    //faq

    (function () {
		$('.question__title').click(function (e) {
			e.preventDefault();
			var $this = $(this);
			if ($this.next().hasClass('show')) {
				$this.next().removeClass('show');
				$this.next().slideUp(350);
				$this.removeClass('open');
			} else {
				$this.parent().parent().find('li .question__answer').removeClass('show');
				$this.parent().parent().find('li a').removeClass('open');
				$this.parent().parent().find('li .question__answer').slideUp(350);
				$this.next().toggleClass('show');
				$this.next().slideToggle(350);
				$this.toggleClass('open');
			}
		});
	})()


    // $(document).ready(function(){
    //     $('.main-slider').slick({
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //         arrows: true,
    //         fade: true,
    //         asNavFor: '.thumbnail-slider',
    //         settings: "unslick",
    //     });
    //     $('.thumbnail-slider').slick({
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //         asNavFor: '.main-slider',
    //         dots: false,
    //         centerMode: true,
    //         focusOnSelect: true,
    //         // variableWidth: true,
    //         // settings: "unslick"
    //     });
    // });


}
