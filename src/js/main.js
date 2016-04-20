(function($) {

    var wH,wW,
        loading = $('#loading');

  	function init () {
          setLayout();
          
    }

    function setLayout () {
      wH = $(window).height();
      wW = $(window).width();

      hideLoading();
      initHeadroom();
    }


    function menuToggle () {
        $('body').toggleClass('menu-on');
    }

    /* 
     * ============================================
     * HeadRoom
     * ============================================
     */
    function initHeadroom() {
        var myElement = document.getElementById("header");
        var headroom  = new Headroom(myElement,{"offset":20});
        headroom.init(); 
    }

    /* 
     * ============================================
     * Hide Loading
     * ============================================
     */
    function hideLoading() {
      loading.addClass('off');
    }


    /* 
     * ============================================
     * Init handlebars templates
     * ============================================
     */
    function initHandlebars() {
      // var source   = $("#item-template").html();
      // var template = Handlebars.compile(source);
    }
    /* 
     * ============================================
     * Init isotope on non ajax loaded pages
     * ============================================
     */
    function initIsotope() {

        // $grid.isotope({
        //   // set itemSelector so .grid-sizer is not used in layout
        //   itemSelector: '.grid-item',
        //   percentPosition: true,
        //   masonry: {
        //     columnWidth: '.grid-sizer'
        //   },
        //   // filter: hashFilter,
        //   hiddenStyle: {
        //     transform: 'translate3d(0,100px,0) scale(0.001)',
        //     opacity: 0
        //   },
        //   visibleStyle: {
        //     transform: 'translate3d(0,0,0) scale(1)',
        //     opacity: 1
        //   }
        // });

    }




    /* 
     * ============================================
     * Load events, places, stories
     * ============================================
     */
    // function loadEvents() {
    //     var postType = $('input#post-type').val();
    //     var source   = $("#event-template").html();
    //     var template = Handlebars.compile(source);
    //     $.ajax({
    //       dataType: "json",
    //       url: siteUrl+"/api/ficelle/get_all/?type="+postType,
    //       success: function(data) {
              

    //           $.each(data.posts, function (i, elem) {
    //             var context = {
    //                 title: elem.title, 
    //                 body: elem.excerpt,
    //                 permalink: elem.url,
    //                 days: elem.days,
    //                 hours: elem.hours,
    //                 place: elem.place,
    //                 place_url: elem.place_url,
    //                 img: elem.img,
    //                 categories: elem.categories,
    //             };
                
    //             html = template(context);
                 
    //             $( ".isotope-grid" ).append( html );
    //           });
    //           hideLoading();
    //           initIsotope();
    //       },
    //       error: function() {
    //           console.log('error');
    //           hideLoading();
    //       }
    //     });
     
    // }

 
  


    // $(window).on('load scroll', scroll);
    // $(window).on( 'hashchange', onHashchange );

    init();

    // Register listeners
    $('.menu-toggle').click(menuToggle);
    

})(jQuery);
