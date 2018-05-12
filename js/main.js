'use strict'

var frcCoop = {

  setFaqToggle: function() {
    $('.open-close-faq').click(function(e){
      e.preventDefault();
      var targetQuestion = this.closest('.question');

      var targetIcons = $(targetQuestion).find('.icon');
      var targetAnswer = $(targetQuestion).find('.answer');

      $(targetQuestion).toggleClass('question-open');
      $(targetIcons).toggleClass('hide-icon');
      $(targetAnswer).toggleClass('answer-open');

      $(targetAnswer).slideToggle(300, function () {});
    });
  },

  setMarketToggle: function() {
    $('.market-info > .dot, .market-title-container, .market-close-link, .market-background-image').click(function(e){
      e.preventDefault();

      $('#side-navigation').removeClass('open');
      $('#menu-icon').removeClass('open');

      var targetMarket = $(this.closest('.market')).children('.market-info')

      if (($('.market-info.open-market') !== []) && ($('.market-info.open-market').attr('id') !== targetMarket.attr('id'))) {
        $('.market-info.open-market').find('.market-title-container').hide();
        $('.market-info.open-market').find('.market-title-container').fadeIn(1000);
        $('.market-info.open-market').removeClass('open-market');

        $('.market-info').addClass('closed-market');
      }



      $(targetMarket).find('.market-title-container').hide();
      $(targetMarket).find('.market-title-container').fadeIn(1000);

      $(targetMarket).toggleClass('closed-market');
      $(targetMarket).toggleClass('open-market');
    });
  },

  teamMemberOpen: function(targetEl) {
      var targetMemberBio = $(targetEl.closest('.team-member')).children('.team-member-biography');
      var targetMemberHeader = $(targetEl.closest('.team-member')).children('.team-member-header');
      var targetMember = $(targetEl.closest('.team-member'));
      var targetHash = '#' + targetMember.attr('id');
      $('body,html').css('overflow', 'hidden');
      $('#team-overlay').css('z-index', '1000').css('display', 'block').animate({opacity:1}, 300);


      $('#team-overlay-member').children('.team-member-picture').attr('src', $(targetMember).children('.team-member-picture').attr('src'));

      $('#team-overlay-member-biography').children('.biography-header').html($(targetMemberBio).find('.biography-header').html());
      $('#team-overlay-member-biography').children('.biography-open').html($(targetMemberBio).find('.biography-open').html());
      $('#team-overlay-member-biography').children('.biography-detail').html($(targetMemberBio).find('.biography-detail').html());


      history.pushState(null, null, '#who-we-are');
      history.pushState(null, null, targetHash);
  },

  setTeamMemberOpen: function() {
    $('.team-member-picture, .team-member-header, .team-member-plus').click(function(e){
      e.preventDefault();
      frcCoop.teamMemberOpen(this);
    });
  },

  teamCloseOnBack : function(evt) {
      if (location.hash == '#who-we-are') {
	  frcCoop.teamClose();
      }
  },

  teamClose : function() {
      $('#team-overlay').css('z-index', '0').css('display', 'none').animate({opacity:0}, 300);
      $('body,html').css('overflow','scroll');
      $('#team-overlay-member').children('.team-member-picture').attr('src','');
      $('#team-overlay-member-biography').children('.biography-header').html('');
      $('#team-overlay-member-biography').children('.biography-open').html('');
      $('#team-overlay-member-biography').children('.biography-detail').html('');
      $('#white-coverup').hide();
  },

  setTeamClose: function() {
    $('.team-member-close').click(function(e){
      e.preventDefault();
      history.back();
    });
  },

  watchTeamHash: function() {
    var teamMemberIDHashes = ["#team-anjney-midha", "#team-bruno-faviero", "#team-lauren-reeder", "#team-neal-khosla", "#team-parthi-loganathan"];
    if (teamMemberIDHashes.indexOf(window.location.hash) !== -1) {
      $('#white-coverup').show();
      var targetTeamMember = $(window.location.hash);
      frcCoop.teamMemberOpen(targetTeamMember);
    }
  },

  showMenu: function() {
    $('#menu-icon').click(function(){
      $(this).toggleClass('open');
      $("#side-navigation").toggleClass('open');
      $('.market-info.open-market').removeClass('open-market');
      $('.market-info').addClass('closed-market');


      if(window.pageYOffset > 50) {
        $("#side-navigation").removeClass('pre-scroll');
      }
    });
  },

  setMenuClicks: function() {
    $('.menu-item').click(function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: ($($(this).children('a').attr('href')).offset().top + 2)
        }, 500);
    });

  },

  setScrollActions: function() {
    var currentHash = "#";
    $(window).scroll(function () {
        $('.anchor-tag').each(function () {
            var top = window.pageYOffset;
            var distance = top - $(this).offset().top;
            var hash = '#' + $(this).attr('id');
            // 30 is an arbitrary padding choice,
            // if you want a precise check then use distance===0

            if (distance < 30 && distance > -30 && currentHash != hash) {
                history.replaceState(null, null, hash);
                currentHash = hash;
            }
        });

        if (window.pageYOffset > 50) {
          $("#side-navigation").removeClass('pre-scroll');
        } else {
          $("#side-navigation").addClass('pre-scroll');
        }
    });
  },

  setGifTrigger: function(triggerDiv, targetDiv, gifSrc) {
    $(window).scroll(function() {
      if ($(window).scrollTop() >= $(triggerDiv).offset().top) {
        $(targetDiv).attr("src", gifSrc);
      }
    });
  }
}


$(document).ready(function(){
  frcCoop.watchTeamHash();
  frcCoop.showMenu();
  frcCoop.setFaqToggle();
  frcCoop.setMarketToggle();
  frcCoop.setTeamMemberOpen();
  frcCoop.setTeamClose();
  frcCoop.setMenuClicks();
  frcCoop.setScrollActions();
  window.onhashchange = frcCoop.teamCloseOnBack;
});
