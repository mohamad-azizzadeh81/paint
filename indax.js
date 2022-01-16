$(function () {
  var color = $(".controls .colorSelectContainer .selected").css(
    "background-color"
  );

  $(".controls .colorSelectContainer").on("click", "li", function () {

    color = $(this).css("background-color");

    $(this).addClass("selected").siblings().removeClass("selected");
  });

  $(window).on("click", function (event) {
    var $target = $(event.target);

    if (
      !$target.is("#colorSelect") &&
      !$target.is("#revealColorSelect") &&
      !$target.parents("#colorSelect").length
    ) {
      $("#colorSelect").slideUp();
    }
  });

  $("#revealColorSelect").on("click", function () {
    $("#colorSelect").slideToggle();
  });

  var r = 0;
  var g = 0;
  var b = 0;

  // color = 'rgb(0, 0, 0)'

  $("#colorSelect .sliders input").on("change input", function () {
    if ($(this).is("#red")) {
      r = $(this).val();
    }

    if ($(this).is("#blue")) {
      b = $(this).val();
    }

    if ($(this).is("#green")) {
      g = $(this).val();
    }

    $("#newColor").css(
      "background-color",
      "rgb( " + r + " , " + g + " , " + b + " )"
    );
  });

  $("#addNewColor").on("click", function () {
    var newColor = $("#newColor").css("background-color");

    var newColorElement = $("<li>", {
      style: "background-color: " + newColor,
    });

    $(".controls .colorSelectContainer li").removeClass("selected");

    newColorElement.addClass("selected");

    $(".colorSelectContainer").append(newColorElement);

    color = newColor;
  });

  var canvas = $("canvas");

  var ctx = canvas[0].getContext("2d");

  var isMouseDown = false;

  $("canvas")
    .on("mousedown", function (e) {
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
      isMouseDown = true;
    })
    .on("mousemove", function (e) {
      if (isMouseDown) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    })
    .on("mouseup", function () {
      isMouseDown = false;
    });
});
